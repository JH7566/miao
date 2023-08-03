// 同步版（listFiles1）：
import fs from 'node:fs';
import path from 'node:path';

// 递归获取文件夹内所有文件的名字组成的数组
function listFiles1(dirPath) {
  const files = fs.readdirSync(dirPath); // 同步读取文件夹内的文件名
  const result = []; // 保存所有文件名的数组

  files.forEach(file => {
    const fullPath = path.join(dirPath, file); // 获取文件的完整路径
    const stat = fs.statSync(fullPath); // 获取文件的状态信息，判断是文件还是文件夹

    if (stat.isFile()) { // 如果是文件，将文件名加入结果数组
      result.push(file);
    } else if (stat.isDirectory()) { // 如果是文件夹，递归获取文件夹内的文件名，并将它们加入结果数组
      const subFiles = listFiles1(fullPath);
      result.push(...subFiles);
    }
  });

  return result; // 返回结果数组
}


// 回调版（listFiles4）：
import fs from 'node:fs';
import path from 'node:path';

// 异步获取文件夹内所有文件的名字组成的数组
function listFiles4(dirPath, cb) {
  fs.readdir(dirPath, (err, files) => { // 异步读取文件夹内的文件名
    if (err) {
      cb(err, null);
      return;
    }

    const result = []; // 保存所有文件名的数组

    function processFile(index) {
      if (index === files.length) { // 当处理完所有文件后，调用回调函数返回结果数组
        cb(null, result);
        return;
      }

      const file = files[index];
      const fullPath = path.join(dirPath, file); // 获取文件的完整路径

      fs.stat(fullPath, (err, stat) => { // 异步获取文件的状态信息
        if (err) {
          cb(err, null);
          return;
        }

        if (stat.isFile()) { // 如果是文件，将文件名加入结果数组
          result.push(file);
          processFile(index + 1); // 继续处理下一个文件
        } else if (stat.isDirectory()) { // 如果是文件夹，递归获取文件夹内的文件名，并将它们加入结果数组
          listFiles4(fullPath, (err, subFiles) => {
            if (err) {
              cb(err, null);
              return;
            }
            result.push(...subFiles);
            processFile(index + 1); // 继续处理下一个文件
          });
        }
      });
    }

    processFile(0); // 开始处理第一个文件
  });
}


// async / await 版本（listFiles2）：
import fs from 'node:fs';
import path from 'node:path';

// 使用 async/await 异步获取文件夹内所有文件的名字组成的数组
async function listFiles2(dirPath) {
  const files = await fs.promises.readdir(dirPath); // 异步读取文件夹内的文件名
  const result = []; // 保存所有文件名的数组

  for (const file of files) {
    const fullPath = path.join(dirPath, file); // 获取文件的完整路径
    const stat = await fs.promises.stat(fullPath); // 异步获取文件的状态信息

    if (stat.isFile()) { // 如果是文件，将文件名加入结果数组
      result.push(file);
    } else if (stat.isDirectory()) { // 如果是文件夹，递归获取文件夹内的文件名，并将它们加入结果数组
      const subFiles = await listFiles2(fullPath);
      result.push(...subFiles);
    }
  }

  return result; // 返回结果数组
}


// Promise 版本（listFiles3）：
import fs from 'node:fs';
import path from 'node:path';

// 使用 Promise 异步获取文件夹内所有文件的名字组成的数组
function listFiles3(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => { // 异步读取文件夹内的文件名
      if (err) {
        reject(err);
        return;
      }

      const result = []; // 保存所有文件名的数组

      function processFile(index) {
        if (index === files.length) { // 当处理完所有文件后，通过 resolve 返回结果数组
          resolve(result);
          return;
        }

        const file = files[index];
        const fullPath = path.join(dirPath, file); // 获取文件的完整路径

        fs.stat(fullPath, (err, stat) => { // 异步获取文件的状态信息
          if (err) {
            reject(err);
            return;
          }

          if (stat.isFile()) { // 如果是文件，将文件名加入结果数组
            result.push(file);
            processFile(index + 1); // 继续处理下一个文件
          } else if (stat.isDirectory()) { // 如果是文件夹，递归获取文件夹内的文件名，并将它们加入结果数组
            listFiles3(fullPath)
              .then(subFiles => {
                result.push(...subFiles);
                processFile(index + 1); // 继续处理下一个文件
              })
              .catch(reject);
          }
        });
      }

      processFile(0); // 开始处理第一个文件
    });
  });
}
