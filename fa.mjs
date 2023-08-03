
// 1.stats.isFile(): 如果是文件则返回true,否则返回false;
// 2.stats.isDirectory(): 如果是目录则返回true,否则返回false;
// 3.stats.isBlockDevice(): 如果是块设备则返回true，否则返回false;
// 4.stats.isCharacterDevice(): 如果是字符设备返回true,否则返回false;
// 5.stats.isSymbolicLink(): 如果是软链接返回true,否则返回false;
// 6.stats.isFIFO(): 如果是FIFO,则返回true,否则返回false.FIFO是UNIX中的一种特殊类型的命令管道；
// 7.stats.isSocket(): 如果是Socket则返回true,否则返回false;
// 8.stats.size(): 文件的大小（以字节为单位）。

import { dir } from 'node:console'
// import fs from 'node:fs'

// const fsp = fs.promises // fs模块中所有函数的promise版

// 传入一个文件夹的路径
// 它应该返回该文件夹内所有文件的名字组成的数组
// 要内层所有文件夹的内容都要
// 要求同步版,回调版,async/await,promise版
//   var names = fs.readdirSync()
//   stat = fs.statSync(path)
//     stat.isFile()
//     stat.isDirectory()





//同步版

import fs from 'node:fs'
import path from 'node:path'


var a = listFiles1(process.argv[2])
console.log(a)

const fsp = fs.promises

function listFiles1(dirPath) {
  const files = fs.readdirSync(dirPath) //读取文件夹的文件名
  const result = []

  files.forEach(file => {
    const fullPath = path.join(dirPath, file)  //获取文件的路径
    const stat = fs.statSync(fullPath)  //判断是文件夹还是文件

    if (stat.isFile()) { //是文件就加入数组
      result.push(fullPath) //将文件完整路径添加进数组
    } else if (stat.isDirectory()) { //是文件夹就继续递归获取里面文件的文件名加入数组
      const lastFile = listFiles1(fullPath)
      result.push(...lastFile)
    }
  })
  return result
}



//async await 版

import fs from 'node:fs'
import path from 'node:path'

async function start() {
  const b = await listFiles2(process.argv[2])
  console.log(b)
}

async function listFiles2(dirPath) {
  const files = await fs.promises.readdir(dirPath)
  const result = []

  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    const stat = await fs.promises.stat(fullPath)

    if (stat.isFile()) {
      result.push(fullPath)
    } else if (stat.isDirectory()) {
      const subFiles = await listFiles2(fullPath)
      result.push(...subFiles)
    }
  }

  return result
}

start()


//Promise版

function listFiles3(dirPath) {
  return new Promise(resolve => {

  })
}

function listFiles4(dirPath, cb) {

}
