//maps

class Vector {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  plus(Vector) {
    return new Vector(this.x + other.x, this.y + other.y)
  }

  minus(Vector) {
    return new Vector(this.x - other.x, this.y - other.y)
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}



class Queue {
  constructor() {
    this.items = [] // 初始化一个空数组用于存储队列元素
  }

  add(val) {
    this.items.push(val) // 在队列尾部添加一个元素
  }

  pop() {
    if (this.isEmpty()) { return null } // 如果队列为空则返回提示信息
    return this.items.shift() // 返回队列的第一个元素并将其从队列中删除
  }

  size() {
    return this.items.length // 返回队列中元素的数量
  }

  isEmpty() {
    return this.items.length === 0 // 判断队列是否为空
  }
}




class MyMap {

  constructor() {
    this.collection = {}
    this.count = 0
  }

  set(key, val) {
    this.collection[key] = val
    this.count++
  }

  get(key) {
    return (key in this.collection) ? this.collection[key] : null
  }

  has(key) {
    return (key in this.collection)
  }

  delete(key) {
    if (key in this.collection) {
      delete this.collection[key]
      this.count--
    }
  }

  values() {
    let result = []
    for (let key of Object.keys(this.collection)) {
      result.push(this.collection[key])
    }
    return (result.length > 0) ? result : null
  }

  clear() {
    this.collection = {}
    this.count = 0
  }
}





