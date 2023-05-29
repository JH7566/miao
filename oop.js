



Class MyMap{

  constructor(){
    this.keys = {}
    this.count = 0
  }
  setInterval(key,vals){

  }
}




class Vector {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y)
  }

  minus(other) {
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

  add(element) {
    this.items.push(element) // 在队列尾部添加一个元素
  }

  pop() {
    if (this.isEmpty()){ return "Queue is empty"} // 如果队列为空则返回提示信息
    return this.items.shift() // 返回队列的第一个元素并将其从队列中删除
  }

  size() {
    return this.items.length // 返回队列中元素的数量
  }

  isEmpty() {
    return this.items.length === 0 // 判断队列是否为空
  }
}
