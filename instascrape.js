const ig = require('instagram-node').instagram()
const settings = require('./settings.js')

ig.use({access_token:settings.apikeys.instagram})

ig.user_media_recent('4101873',[10],(err,medias,pagination,remaining,limit)=>{
  //console.log(medias)
  const elMedia = medias[0]
  console.log(elMedia.images.thumbnail.url)
  console.log(elMedia.caption.text)
  console.log(elMedia.link)

  console.log(remaining)
})
