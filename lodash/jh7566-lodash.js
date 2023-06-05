
var jh7566 = {
  /**
   *将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
   * @param {*} ary  需要处理的数组
   * @param {*} size 每个数组区块的长度
   * @returns 返回一个包含拆分区块的新数组（注：相当于一个二维数组）
   */
  chunk: function (ary, size) {
    var array = []
    for (var i = 0; i < ary.length; i += size) {
      array.push(ary.slice(i, i + size))
    }
    return array
  },

  /**
   *创建一个新数组，将array与任何数组 或 值连接在一起。
   * @param {*} array 待处理的数组
   * @returns 返回过滤掉假值的新数组。
   */
  compact: function (array) {
    var ary = []
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        ary.push(array[i])
      }
    }
    return ary
  },

  /**
   * 创建一个新数组，将array与任何数组 或 值连接在一起。
   * @param {*} array  被连接的数组。
   * @param {*} arr 连接的值
   * @returns 返回连接后的新数组。
   */
  concat: function (array, ...arr) {
    var result = array
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        for (var j = 0; j < arr[i].length; j++)
          result.push([arr[i][j]])
      } else {
        result.push([arr[i]])
      }
    }
    return result
  },

  /**
   * 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
   * @param {*} array ：要填充改变的数组。
   * @param {*} value : 填充给 array 的值。
   * @param {*} start(number): 开始位置（默认0）
   * @param {*} end(number): 结束位置（默认array.length）。
   * @returns 返回 array。
   */
  fill: function (array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },


  /**
   * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（注：即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。
   * @param {*} array 要检查的数组。
   * @param {*} val 排除的值。
   */
  difference: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (val[i] in array) {
        array.splice(i)
      }
    }
    return array
  },

  /**
   * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
   * @param {*} array 要查询的数组。
   * @param {*} n 要去除的元素个数。
   * @returns 返回array剩余切片。
   */
  drop: function (array, n = 1) {
    return array.slice(n)
  },

  /**
   * 减少一级array嵌套深度。
   * @param {*} array   需要减少嵌套层级的数组。
   * @returns 返回减少嵌套层级后的新数组。
   */
  flatten: function (array) {
    return array.flat()
  },

  /**
   * 将array递归为一维数组。
   * @param {*} array 需要处理的数组。
   * @returns 返回一个的新一维数组。
   */
  flattenDeep: function (array) {
    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        array.splice(i, 1, ...array[i])
      }
    }
    return array
  },

  /**
   * 与_.toPairs正好相反；这个方法返回一个由键值对pairs构成的对象。
   * @param {*} pairs 键值对pairs。
   * @returns 返回一个新对象。
   */
  fromPairs: function (pairs) {
    var map = {}
    for (var obj of pairs) {
      map[obj[0]] = obj[1]
    }
    return map
  },

  /**
   * 使用SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
   * @param {*} array 需要查找的数组。
   * @param {*} val 需要查找的值
   * @param {*} fromIndex  开始查询的位置。
   * @returns  返回 值value在数组中的索引位置, 没有找到为返回-1。
   */
  indexOf: function (array, val, fromIndex = 0) {
    if (fromIndex < 0) {
      fromIndex = fromIndex + array.length
    }
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] == val) {
        return i
      }
    }
    return -1
  },

  /**
   * 获取数组 array 的第一个元素。
   * @param {*} array 要查询的数组。
   * @returns  返回数组 array的第一个元素。
   */
  head: function (array) {
    var arr = array[0]
    return arr
  },

  join: function (array, separator = ',') {
    var sum = ''
    for(var i = 0; i < array.length;i++){
      sum += array[i] + '' + separator
    }
    return 
  }
}

