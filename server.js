const express = require("express")
const fs = require("fs")

const app = express()
const http = require('http').Server(app)

const cheerio = require('cheerio-httpcli')
const FB = require('fb')
const ig = require('instagram-node').instagram()

const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const pgp = require('pg-promise')()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

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
const info = require('./info')

const db = pgp(settings.pgsqlauth)

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

//process.env.PORT for heroku
http.listen(3001, function(){
  console.log("server is up at " + this.address().port)
  console.log("mode:" + process.env.NODE_ENV)
})

app.use('/dist',express.static(__dirname + '/dist'))

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

app.get('/workview/:workid',(req,res)=>{
  res.redirect('/')
})

function XSSsanitize(text){
  return text.replace(/[\[\[\*\$\.(){}!&<>"';=+-]/g,'_')
}

function sendmail(sender,subject,htmlContent){
  return new Promise((resolve,reject)=>{


    const mailOptions = {  
      from: sender,
      to: settings.contactEmail,
      subject: XSSsanitize(subject),
    
      html: XSSsanitize(htmlContent)
    };

    smtpTransport.sendMail(mailOptions,(err,res) =>{
      if (err){
        console.log(err)
        reject(err)
      }
      smtpTransport.close()
      resolve(true)
    })
  })
}

async function asyncmailer(req,res) {
  console.log(req.body)
  let mailres = await sendmail(req.body.name + '<' + req.body.contact + '>', '!!portfolio contact - ' + req.body.name,req.body.business)
  if(mailres === true){
    res.status(200).json({result:true})
    return true
  }
}

app.post('/contact',(req,res)=>{
  console.log('req.body content:', req.body)
  return asyncmailer(req,res)
})

app.get('/jsonindex',(req,res)=>{
  res.json(info.infoMain)
})

app.get('/jsonworkdetail/:workid',(req,res)=>{
  res.json(info.infoWorks[Math.ceil(req.params.workid)])
})
app.get('/jsonworks',(req,res)=>{
  res.json(info.infoWorks)
})

app.get('/jsonarticles',(req,res)=>{
  getPrefetched(res)
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
  //data must be a perfect json
  console.log(`${data.length} posts collected --- ${new Date()}`)
  db.task(tsk => {
    return tsk.none('CREATE TABLE IF NOT EXISTS posts\
    (id INTEGER PRIMARY KEY,\
      fetchedtime TIME WITH TIME ZONE,\
      fetchedobj JSON);')
      .then(()=>{
        return tsk.one('SELECT MAX(id) FROM posts;')
      }).then((maxId)=>{
        return tsk.none('INSERT INTO posts (id, fetchedtime, fetchedobj) VALUES ($1, CURRENT_TIME, $2);', [maxId.max + 1, JSON.stringify(data)])
      })
  })
  .then(()=>{
    console.log(`posts successfully saved --- ${new Date()}`)
    deleteOld()
  })
  .catch(err=>{
    console.log(err)
  })
}

function getPrefetched(res){
  db.task(tsk => {
    return tsk.none('CREATE TABLE IF NOT EXISTS posts\
    (id INTEGER PRIMARY KEY,\
      fetchedtime TIME WITH TIME ZONE,\
      fetchedobj JSON);')
    .then(()=>{
      return tsk.one('SELECT * FROM posts ORDER BY fetchedtime LIMIT 1;')
    })
  })
  .then(sqlData => {
    //console.log('fetch data from sql ---',sqlData)
    res.json(sqlData.fetchedobj)
  })
  .catch(err=>{
    console.log(err)
  })
}

function deleteOld(){
  db.none('DELETE FROM posts WHERE id < (SELECT MAX(id) FROM posts) - $1;', [settings.dbMaxHistory])
  .then(sqlData=>{
    console.log('useless datas are removed')
  })
  .catch(err=>{
    console.log(err)
  })
}

// -------------------- periodically fetch data from X minutes

fetchAll()
let fetchtime = 360
if(settings.fetchIntervalMinute){
  fetchtime = settings.fetchIntervalMinute
}
setInterval(()=>{
  fetchAll()
},1000*60*fetchtime) //every three hours
