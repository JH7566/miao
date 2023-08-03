const http = require('http');
const querystring = require('querystring');

// 用于保存留言的数组
const messages = [];

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 当有请求进入时，打印请求的方法和URL
  console.log(req.method, req.url);

  // 处理POST请求，并保存留言
  if (req.method === 'POST' && req.url === '/leave-message') {
    let body = '';
    // 监听请求的data事件，读取POST请求数据
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // 监听请求的end事件，完成POST数据的读取
    req.on('end', () => {
      // 将POST数据解析为对象
      const postData = querystring.parse(body);
      // 将留言保存到messages数组中
      messages.push(postData);
      console.log('New message:', postData);
      // 返回重定向响应，重定向到显示留言的页面
      res.writeHead(302, { Location: '/show-messages' });
      res.end();
    });
  } else if (req.url === '/show-messages') {
    // 显示留言的页面
    res.writeHead(200, 'DSB', {
      'content-type': 'text/html;charset=utf-8',
      'foo': 'biubiubiu',
    });

    // 构造HTML内容，显示留言列表
    res.write(`
      <!doctype html>
      <h1>留言板</h1>
      <ul>
        ${messages.map(message => `<li>${message.name}: ${message.message}</li>`).join('')}
      </ul>
      <a href="/">返回留言板</a>
    `);
    res.end();
  } else {
    // 处理GET请求，显示留言输入表单
    res.writeHead(200, 'DSB', {
      'content-type': 'text/html;charset=utf-8',
      'foo': 'biubiubiu',
    });

    // 返回HTML表单，用于提交留言
    res.write(`
      <!doctype html>
      <form method="POST" action="/leave-message">
        Name:<br>
        <input type="text" name="name"><br>
        Message:<br>
        <input type="text" name="message"><br>
        <button>submit</button>
      </form>
    `);
    res.end();
  }
});

// 服务器开始侦听指定的端口
const 端口 = 8000;
server.listen(端口, () => {
  console.log('服务器在', 端口, '侦听');
});
