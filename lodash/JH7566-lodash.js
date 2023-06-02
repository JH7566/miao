// /miao/lodash/jh7566-lodash.js

var jh7566 = {
  chunk: function (ary, size) {
    var array = []
    for (var i = 0; i < ary.length; i += size) {
      array.push(ary.slice(i, i + size))
    }
    return array
  }
}
