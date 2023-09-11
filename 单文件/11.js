const http = require('node:http')
const fs = require('node:fs')
const { sortBy } = require('lodash')

const port = 10010
const file = './'

http.createServer((req, res) => {
  var filepath = file + req.url

  fs.stat(filepath, (err, stat) => {
    if (err) {
      res.writeHead(404)
      res.end('404 Not Found1')
    } else {
      if (stat.isFile()) {
        fs.readFile(filepath, 'utf-8', (err, data) => { // 读取文件内容时指定编码为 utf-8
          if (err) {
            res.writeHead(404)
            res.end('404 Not Found2')
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // 设置正确的 Content-Type 响应头
            res.write(data)
            res.end()
          }
        })
      } else if (stat.isDirectory()) {
        if (!req.url.endsWith('/')) {
          res.writeHead(302, {
            Location: req.url + './'
          })
          res.end()
          return
        }

        fs.readdir(filepath, { withFileTypes: true }, (err, fileEntries) => {
          if (err) {
            res.end('404 Not Found3')
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8'
            })

            fileEntries = sortBy(fileEntries, [it => {
              if (it.isDirectory()) {
                return -1
              } else if (it.isFile()) {
                return 1
              } else {
                return 0
              }
            }])
            res.end(`
              ${fileEntries.map(entry => {
              var slash = entry.isDirectory() ? '/' : ''
              return `<div><a href="${entry.name}${slash}">${entry.name}${slash}></a></div>`
            }).join('\n')}
            `)
          }
        })
      }
    }
  })
}).listen(port, () => {
  console.log('有人在', port, '偷看')
});
