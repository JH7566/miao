const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const mime = require('mime-types')

const fsp = fs.promises
const { sortBy } = require('lodash')
const port = 10088

const 文件夹 = '.'

// static http server?
// 这里的静态一般指的是：同一个地址返回的内容是固定不变的
//    一般就是将一个文件夹作为服务器向外服务的内容
//    文件夹里的文件不会运行
// 与之对应的是动态服务器一般指的是：同一个地址返回的内容可能根据时间，用户等会改变

const server = http.createServer(async (req, res) => {
  // 评出的路径会被自动化简
  var url = new URL(`http://${req.headers.host}${req.url}`)

  console.log(req.method, decodeURIComponent(req.url))

  // 路径的任何一部分以点开头，都直接403
  if (url.pathname.split('/').some(it => it[0] == '.')) {
    res.writeHead(403)
    res.end('403 Forbidden')
    return
  }
  // 所以不用担心这里评出的路径在文件夹以外
  var targetPath = path.join(文件夹, decodeURIComponent(url.pathname))

  try {
    var stat = await fsp.stat(targetPath)

    if (stat.isFile()) {

      var data = await fsp.readFile(targetPath)
      // c:///weofijwoiejfwef/we/fw/ef/we.jpg
      res.writeHead(200, {
        'Content-Type': mime.contentType(targetPath) || 'applcation/octet-stream'
      })
      res.write(data)
      res.end()
      return

    } else if (stat.isDirectory()) { // 说明请求的目标路径是文件夹
      // 如果请求的是文件夹但是请求的路径不以/结尾,让浏览器跳转到以/结尾的地址,否则相对路径的计算会出错
      if (!req.url.endsWith('/')) {
        res.writeHead(302, {
          Location: req.url + '/'
        })
        res.end()
        return
      }

      // 如果文件里有index.html则返回这个文件的内容
      // 如果不存在，则列出文件夹内的文件列表
      var indexPath = path.join(targetPath, 'index.html')
      try {
        var indexFileContent = await fsp.readFile(indexPath)
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(indexFileContent)
        return
      } catch (e) {
        // 列出文件夹内的内容
        var fileEntries = await fsp.readdir(targetPath, { withFileTypes: true })

        fileEntries = fileEntries.filter(it => {
          return it.name[0] !== '.'
        })

        // 每个文件的信息
        var stats = await Promise.all(fileEntries.map(entry => {
          return fsp.stat(path.join(targetPath, entry.name))
        }))

        // 给每个文件条目再附着上它的stat
        fileEntries.forEach((it, i) => {
          it.stat = stats[i]
        })

        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8'
        })

        // 排序,基于该函数的返回值来排序,升序,文件夹返回-1,所以排前面
        // 该函数执行的是稳定的排序算法,所以相同类型的元素顺序是保持不变的
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
          <h1>Index of ${url.pathname}</h1>
          <div>N/A <a href="../">../</a></div>
          ${fileEntries.map(entry => {
          var slash = entry.isDirectory() ? '/' : ''
          return `<div>${entry.stat.atime.toLocaleString()}<a href="${entry.name}${slash}">${entry.name}${slash}</a></div>`
        }).join('\n')}
          <address>Node.js ${process.version}/ my-static-server server running @ ${server.address().address}:${server.address().port}</address>
        `)
        return
      }
    }

  } catch (e) {
    console.error(e)

    if (e.code == 'ENOENT') {
      res.end('404 Not Found')
    } else {
      res.end('Error')
    }
  }


}).listen(port, '127.0.0.1', () => {
  console.log('server listening on port', port)
})
