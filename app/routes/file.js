const fs = require('fs')
const express = require('express')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, res, cb) => {
    cb(null, Date.now().toString().concat(path.extname(res.originalname)))
  }
})

const upload = multer({ storage: storage })

var router = express.Router();

// 上传
router.post('/upload', upload.single('fileUpload'), function (req, res, next) {
  console.log(req.file)
  // next()
  res.status(200).send(`{message: '上传成功'}`)
})
// 下载
router.get('/download', function (req, res, next) {
  const options = {
    // flags: 'r', //指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
    encoding: 'utf8', // 指定打开文件时使用编码格式，默认就是“utf8”,还可以为它指定”ascii”或”base64”
    // fd: null, // fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
    // mode: 0666,
    // autoClose: true //autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
  }
  const readStream = fs.createReadStream('uploads\\1548236969354.txt', options)
  res.attachment('1548236969354.txt')
  //读取文件发生错误事件
  readStream.on('error', (err) => {
    console.log('发生异常:', err);
  });

  readStream.pipe(res);  
})
// 删除
router.delete('/remove', function (req, res, next) {
  fs.unlink('uploads\\1548233363645.png', function (err) {
    if (err && err.code != 'ENOENT') {
      res.status(501).json(`{err, message: '文件删除失败'}`)
    }
    res.status(200).json(`{message: '文件删除成功'}`)
  })
})

module.exports = router