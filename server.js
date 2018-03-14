const express = require("express")
const fs = require("fs")

const app = express()
const http = require('http').Server(app)

const cheerio = require('cheerio-httpcli')
const FB = require('fb')
const settings = require('./settings')

http.listen(process.env.PORT || 3000, function(){
  console.log("server is up at " + this.address().port)
  console.log("mode:" + process.env.NODE_ENV)
})

app.use('/dist',express.static(__dirname + '/dist'))

let allPosts = []

app.get('/',(req,res)=>{
  fs.readFile('index.html','utf8',(err,data)=>{
    res.send(data)
  })
})

app.get('/articles',(req,res)=>{
  res.redirect('/')
})

app.get('/works',(req,res)=>{
  res.redirect('/')
})

app.get('/contact',(req,res)=>{
  res.redirect('/')
})

app.get('/jsonarticles',(req,res)=>{
  res.json(allPosts)
})

const postTemplate = {
  type:'',
  title:'',
  content:'no content',
  photo:'',href:'/'
}


function fetchTwitter(){
  return new Promise((resolve,reject)=>{
    cheerio.fetch(settings.apikeys.twitter,{},(err,$,res)=>{
      if(err) {
        reject(err)
      }
      let allTwitters = []
      $('.tweet-text').each((idx,elTweet)=>{
        allTwitters.push(Object.assign({},postTemplate))
        allTwitters[allTwitters.length - 1].content = $(elTweet).text()
        allTwitters[allTwitters.length - 1].type = 'twitter'
      })
      resolve({type:'twitter',datas:allTwitters})
    })
  })
}

FB.setAccessToken(settings.apikeys.facebook)
function fetchFacebook(){
  return new Promise((resolve,reject)=>{
    FB.api('me/feed','get',{},(feeds)=>{
      if(feeds){
        resolve({type:'facebook',datas:feeds.data})
      }else{
        resolve({type:'facebook',datas:[]})
      }
    })
  })
}

function fetchFBelement(elFeed){
  return new Promise((resolve,reject)=>{
    FB.api(`${elFeed.id}?fields=full_picture`,(photoUrl)=>{
      let newPost = Object.assign({},postTemplate)
      newPost.type = 'facebook'
      if(elFeed.message){
        if(elFeed.message.length > 100){
          newPost.content = elFeed.message.substring(0,settings.maxString) + '...'
        }else{
          newPost.content = elFeed.message
        }
      }
      newPost.href = 'https://facebook.com/' + elFeed.id
      newPost.photo = photoUrl.full_picture
      resolve(newPost)
    })
  })
}

const samplePosts =
[
  {type:'facebook',
  title:'',
  content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus sem, condimentum sit amet rutrum vitae,',
  photo:'',date:'', href:'/'},
  {type:'twitter',
  title:'',
  content:'dfjkdfljkdlfldfkdlfkdfldfkelfkflekflekfle',
  photo:'https://scontent-icn1-1.cdninstagram.com/vp/cd83e638cbe28768080be5ac58ea55b7/5AAC3FDE/t51.2885-15/s320x320/e35/28434248_189586531805588_7004851592578990080_n.jpg',date:'', href:'/'},
  {type:'random',
  title:'가나다라마바사아자차카',
  content:'동해물과 백두산이 마르고 닳도록 하느님이 보우하사',
  photo:'',date:'',href:'/'}
]

if(settings.enableScrape === true){
  Promise.all([
    fetchTwitter(),
    fetchFacebook()
  ]).then((res)=>{
    let secondaryPromise = []
    if(res[1].datas){
      res[1].datas.map((elFeeds)=>{
        secondaryPromise.push(fetchFBelement(elFeeds))
      })
      Promise.all(secondaryPromise).then((FBres)=>{
        preservePosts(FBres.concat(res[0].datas))
      })
    }else{
      //if there is no FB posts...
      preservePosts(res[0].datas)
    }
  })
}else{
  //a sample post for testing
  const maxpost = 20
  let samplers = []
  for(var i = 0;i< maxpost;i++){
    const rnd = Math.round(Math.random(samplePosts.length - 1))
    samplers.push(samplePosts[rnd])
  }
  preservePosts(samplers)
}



function preservePosts(data){
  console.log(`${data.length} posts collected`)
  allPosts = data
}


