const express = require("express")
const fs = require("fs")

const app = express()
const http = require('http').Server(app)

const cheerio = require('cheerio-httpcli')
const FB = require('fb')
const ig = require('instagram-node').instagram()
const nodemailer = require('nodemailer')

let settings = ''
try{
  settings = require('./settings')
}catch(err){
  fs.copyFile('samplesettings.js','settings.js',(err)=>{
    if(err){throw err}
    console.log('setting.js not found, creating a new sample setting' )
    settings = require('./settings')
  })
}

const smtpTransport = nodemailer.createTransport({  
  service: 'Gmail',
  auth: {
      user: settings.gmailauth.user,
      pass: settings.gmailauth.pass
  },
  tls:{
    rejectUnauthorized:false
  }
});

ig.use({access_token:settings.apikeys.instagram})

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

app.get('/jsonindex',(req,res)=>{
  res.json(settings.infoMain)
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

app.get('/jsonworks',(req,res)=>{
  res.json(settings.infoWorks)
})

app.get('/jsonarticles',(req,res)=>{
  res.json(allPosts)
})

app.post('/contact',(req,res)=>{
  async ()=>{
    const mailres = await sendmail('sender<sender@gmail.com>','title','htmlcontent')
    if(mailres === true){
      res.status(200).json({result:true})
    }
  }
})

const postTemplate = {
  type:'',
  title:'',
  content:'no content',
  photo:'',href:'/',
  time:''
}


function fetchTwitter(){
  return new Promise((resolve,reject)=>{
    cheerio.fetch(settings.apikeys.twitter,{},(err,$,res)=>{
      if(err) {
        reject(err)
      }
      let allTwitters = []
      $('.js-stream-item').each((idx,elTweet)=>{
        allTwitters.push(Object.assign({},postTemplate))
        const target = allTwitters.length - 1
        allTwitters[target].content = $(elTweet).find('.tweet-text').text()
        allTwitters[target].type = 'twitter'
        allTwitters[target].time = $(elTweet).find('.time,a').attr('title')
        allTwitters[target].href = settings.apikeys.twitter
      })
      resolve({type:'twitter',datas:allTwitters})
    })
  })
}

function fetchInstagram(){
  return new Promise((resolve,reject)=>{
    let allInstagrams = []
    ig.user_media_recent(settings.apikeys.instagramId,[settings.igMaxRequest],(err,medias,pagination,remaining,limit)=>{
      medias.map((elMedia)=>{
        allInstagrams.push(Object.assign({},postTemplate))
        const target = allInstagrams.length - 1
        allInstagrams[target].type = 'instagram'

        if(elMedia.caption.text){
          if(elMedia.caption.text.length > 100){
            allInstagrams[target].content = elMedia.caption.text.substring(0,settings.maxString) + '...'
          }else{
            allInstagrams[target].content = elMedia.caption.text
          }
        }
        allInstagrams[target].photo = elMedia.images.thumbnail.url
        allInstagrams[target].href = elMedia.link
      })
      console.log('remaining instagram API calls ... ', remaining)
      resolve({type:'instagram',datas:allInstagrams})
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
      }else{
        newPost.content = elFeed.story
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

function fetchAll(){
  if(settings.enableScrape === true){
    console.log('post scrape mode: real posts\n!! warning - this may use out the API call limit !!')
    Promise.all([
      fetchTwitter(), // res 0
      fetchFacebook(), // res 1
      fetchInstagram() // res 2
    ]).then((res)=>{
      let secondaryPromise = []
      if(res[1].datas){

        res[1].datas.map((elFeed,index)=>{
          if(index <= settings.fbMaxRequest){
            secondaryPromise.push(fetchFBelement(elFeed))
          }
        })
        Promise.all(secondaryPromise).then((FBres)=>{
          preservePosts(FBres.concat(res[0].datas,res[2].datas))
        })
      }else{
        //if there is no FB posts...
        preservePosts(res[0].datas.concat(res[2].datas))
      }
    })
  }else{
    //a sample post for testing
    console.log('post scrape mode: sample posts')
    const maxpost = 20
    let samplers = []
    for(var i = 0;i< maxpost;i++){
      const rnd = Math.round(Math.random(samplePosts.length - 1))
      samplers.push(samplePosts[rnd])
    }
    preservePosts(samplers)
  }
}



function preservePosts(data){
  console.log(`${data.length} posts collected`)
  allPosts = data
}

function sendmail(sender,subject,htmlContent){
  new Promise((resolve,reject)=>{
    //const sender = '스텔라마리나 <stellarmarinahotel@gmail.com>'
    //const subject = ' 예약요청(홈페이지)'
    //let htmlContent = 'mail content'
    
    const mailOptions = {  
      from: sender,
      to: 'sungryeolp@gmail.com',
      subject: subject,
    
      html: htmlContent
    };
    
    smtpTransport.sendMail(mailOptions,(err,res) =>{
      if (err){
        console.log(err)
        return reject(err)
      }
      smtpTransport.close()
      return resolve(true)
    })
  })
}

fetchAll()
setInterval(()=>{
  fetchAll()
},1000*60*60*3) //every three hours