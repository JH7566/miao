
var jh7566 = {
  /**
   *
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
   *
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
   *
   * @param {*} array  被连接的数组。
   * @param {*} arr 连接的值
   * @returns
   */
  concat: function (array, ...arr) {
    var result = array
    for (var i = 0; i < arr.length; i++) {
      if (array.isarray(arr[i])) {
        for (var j = 0; j < arr[i].length; j++)
          result.push([arr[i][j]])
      } else {
        result.push([arr[i]])
      }
    }
    return result
  },


  fill: function (array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }
}


