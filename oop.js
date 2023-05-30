
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

var s = new Queue()
s.add(1)
s.add(2)
s.add(3)
assert(s.pop() == 1, '出队的应该为1')
assert(s.pop() == 2, '出队的应该为2')
assert(s.size == 1, '队列长度应该为1')



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


class Complex {
  constructor(real, imaginary) {
    this.real = real
    this.imaginary = imaginary
  }

  plus(a) {
    return new Complex(this.real + a.real, this.imaginary + a.imaginary)
  }

  minus(a) {
    return new Complex(this.real - a.real, this.imaginary - a.imaginary)
  }

  mul(a) {
    const real1 = (this.real * a.real) - (this.imaginary * a.imaginary)
    const imaginary1 = (this.real * a.imaginary) + (this.imaginary * a.real)
    return new Complex(real1, imaginary1)
  }

  div(a) {
    const denominator = (a.real * a.real) + (a.imaginary * a.imaginary)
    const real1 = ((this.real * a.real) + (this.imaginary * a.imaginary)) / denominator
    const imaginary1 = ((this.imaginary * a.real) - (this.real * a.imaginary)) / denominator
    return new Complex(real1, imaginary1)
  }
}

var a = new Complex(1,2)
var b = new Complex(2,4)
var c = a.div(b)
assert(c.real == 0.5, 'a/b的实部应该为0.5')
assert(c.imag == 0, 'a/b的虚部应该为0')



class Stack {
  constructor() {
    this.items = []
  }

  push(val) {
    this.items.push(val)
  }

  pop() {
    this.items.pop()
  }

  size() {
    return this.items.length
  }
}

var s = new Stack()
s.push(1)
s.push(2)
s.push(3)
assert(s.pop() == 3, 'pop出来的应该是3')
s.push(4)
assert(s.pop() == 4, 'pop出来的应该是4')
assert(s.size == 2, 'size应该为2')



class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  append(val) {
    const newNode = {
      val: val,
      next: null
    }
    if (this.tail) {
      this.tail.next = newNode
    }
    thia.tail = newNode
    if (!this.head) {
      this.head = newNode
    }
    this.length++
    return this
  }

  prepend(val) {
    const newNode = {
      val: val,
      next: this.head
    }
    this.head = newNode
    if (!this.tail) {
      this.tail = newNode
    }
    this.length++
    return this
  }

  at(index) {
    if (index < 0 || index >= this.length) {
      return null
    }
    var Node1 = this.head
    for (var i = 0; i < index; i++) {
      Node1 = Node1.next
    }
    return Node1.value
  }

  size() {
    return this.length
  }
}

var s = new LinkedList()
s.append(1)
s.append(2)
s.prepend(3)
assert(s.size == 3, '链表长度应该为3')
s.prepend(4)
assert(s.at(0) == 4, '0号位置应该为4')
assert(s.at(1) == 3, '1号位应该为3')
assert(s.at(3) == 2, '3号位应该为2')


class MySet {

  constructor(arr = []) {
    this.items = {}
    this.length = 0
    arr.forEach(item => this.add(item))
  }


  add(value) {
    if (this.has(value)) {
      return false
    } else {
      this.items[value] = values
      this.length++
      return true
    }
  }

  delete(value) {
    if (this.has(value)) {
      delete this.items[value]
      this.length--
      return true
    } else {
      return false
    }
  }

  has(value) {
    return this.items.hasOwnProperty(value)
  }

  clear() {
    this.items = {}
    this.length = 0
  }

  size() {
    return this.length
  }

  toArray() {
    return Object.values(this.items)
  }

  toString() {
    return this.toArray().join(',')
  }

  union(set) {
    const result = new MySet()
    this.toArray().forEach(item => result.add(item))
    set.toArray().forEach(item => result.add(item))
    return result
  }

  intersect(set) {
    const result = new MySet()
    this.toArray().forEach(item => {
      if (set.has(item)) {
        result.add(item)
      }
    })
    return result
  }

  difference(set) {
    const result = new MySet()
    this.toArray().forEach(item => {
      if (!set.has(item)) {
        result.add(item)
      }
    })
    return result
  }
}

var s = new MySet()
s.add("foo")
s.add("foo")
s.add("bar")
assert(s.size == 2, '不能有重复元素')
s.delete('foo')
assert(s.size == 1)
assert(s.has('foo') == false)
