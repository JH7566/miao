


const http = require('node:http') // 引入 Node.js 内置的 http 模块，用于创建 HTTP 服务器
const fs = require('node:fs') // 引入 Node.js 内置的 fs 模块，用于文件操作
const { sortBy } = require('lodash') // 引入第三方库 lodash 的 sortBy 函数，用于对文件列表进行排序

const port = 10010 // 定义服务器监听的端口号
const file = './' // 定义服务器根目录

// 创建 HTTP 服务器
http.createServer((req, res) => {
  var filepath = file + req.url // 获取请求的文件路径
  // 判断请求的文件是否存在
  fs.stat(filepath, (err, stat) => {
    if (err) {
      res.writeHead(404) // 文件不存在，返回 404 Not Found 错误
      res.end('404 Not Found1')
    } else {
      if (stat.isFile()) {
        // 如果是文件，则读取文件内容并返回给客户端
        fs.readFile(filepath, 'utf-8', (err, data) => { // 读取文件内容时指定编码为 utf-8
          if (err) {
            res.writeHead(404) // 读取文件出错，返回 404 Not Found 错误
            res.end('404 Not Found2')
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }) // 设置响应头的 Content-Type 为纯文本，字符编码为 utf-8
            res.write(data) // 将读取的文件内容写入响应
            res.end() // 结束响应
          }
        })
      } else if (stat.isDirectory()) {
        if (!req.url.endsWith('/')) {
          res.writeHead(302, {
            Location: req.url + './' // 如果请求的是目录但末尾没有斜杠，重定向到带斜杠的目录路径
          })
          res.end()
          return
        }

        // 如果是目录，则列出目录中的文件和子目录，并返回给客户端
        fs.readdir(filepath, { withFileTypes: true }, (err, fileEntries) => {
          if (err) {
            res.end('404 Not Found3') // 读取目录内容出错，返回 404 Not Found 错误
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8' // 设置响应头的 Content-Type 为 HTML，字符编码为 utf-8
            })

            // 对文件列表进行排序，将目录排在前面，文件排在后面
            fileEntries = sortBy(fileEntries, [it => {
              if (it.isDirectory()) {
                return -1
              } else if (it.isFile()) {
                return 1
              } else {
                return 0
              }
            }])

            // 构建目录列表的 HTML，并将其作为响应返回给客户端
            res.end(`
              ${fileEntries.map(entry => {
              var slash = entry.isDirectory() ? '/' : ''
              return `<div><a href="${entry.name}${slash}">${entry.name}${slash}></a></div>` // 构建目录列表的 HTML
            }).join('\n')}
            `)
          }
        })
      }
    }
  })
}).listen(port, () => {
  console.log('有人在', port, '偷看') // 服务器启动后输出监听的端口号
});
