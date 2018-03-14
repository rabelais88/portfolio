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

function preservePosts(data){
  console.log(`${data.length} posts collected`)
  allPosts = data
}


