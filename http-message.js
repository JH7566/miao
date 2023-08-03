

const { log } = require('console')
var http = require('http')
const { type } = require('os')

var server = http.createServer()
var 端口 = 10086
var result = []

server.on('request', (req, res) => {
  console.log(req.method, req.url)

  if (req.method === 'POST' && req.url === '/leave-message') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      var params = new URLSearchParams(body)
      var name = params.get('name')
      var message = params.get('message')
      result.push({ name, message })

      res.writeHead(302, { Location: '/' })
      res.end()
    })
  } else {
    res.writeHead(200, 'ULTRAMAN', {
      'content-type': 'text/html;charset=utf-8',
      'foo': 'biubiubiu',
    })

    res.write(`
      <!doctype html>
      <link rel="png" href="https://github.com/JH7566/miao/blob/master/%E5%BE%AE%E4%BF%A1.png?raw=true">
      <title>微微信</title>
      <form method="POST" action="/leave-message">
        名字:<br>
        <input type="text" name="name"><br>
        消息:<br>
        <input type="text" name="message"><br>
        <br>
        <button>提交</button>
      </form>
      ${result.map(msg => {
      return `<fieldset>
                 <legend>${msg.name}</legend>
                 <div>${msg.message}</div>
               </fieldset>`
    }).join('\n')}
    `)

    res.end()
  }
})

server.listen(端口, () => {
  console.log('服务器在', 端口, '偷听')
})
