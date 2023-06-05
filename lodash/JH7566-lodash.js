
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
  concat: function (array, arr) {
    var result = []
    var length = array.length + arr.length
    for (var i = 0; i < length; i++) {
      if (array[i]) {
        result.push([array[i]])
      } else {
        i = 0
        result.push([arr[i]])
      }
    }
    return result
  },


  fill: function (array, value, start, end) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      var
    }
  }
}


