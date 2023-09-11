

var num = process.argv[2]
var r = factor(+num)

console.log(num + ': ', r.join(' ') )

function factor(n) {
  let arr = []

  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      arr.push(i)
      n /= i
    }
  }

  return arr
}
