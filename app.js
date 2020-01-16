const fs = require('fs')
//console.log(typeof fs)
const axios = require('axios')
const path = require('path')
const  dowloadImage = async()=>{
const url ="https://cosmos-images2.imgix.net/file/spina/photo/20565/191010_nature.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=835"
const imagePath = path.resolve(__dirname,'images','output.png')
//read from another server and write it on another server
//so we use api like createWriteStream
const writer = fs.createWriteStream(imagePath)
await axios({
  url:url,
  method:'GET',
  responseType:'stream'
})
.then(response=>{
   response.data.pipe(writer)
   return new Promise((resolve,reject)=>{
      writer.on('finish',resolve())
      writer.on('error',reject())
   })
})
}

dowloadImage().then(()=>{
  //cannot pass paramter here
  console.log("hello")
})