
.0.toExponential// 1. 给定一个数组，将数组从第 x 位置的内容进行调换：

function swapArrayElements(arr, x) {
  if (x >= 0 && x < arr.length) {
    const firstPart = arr.slice(0, x);
    const secondPart = arr.slice(x);
    const swappedArray = secondPart.concat(firstPart);
    return swappedArray;
  } else {
    return arr; // Return the original array if x is out of bounds.
  }
}

const originalArray = [1, 2, 3, 4, 5, 6];
const x = 2;
const swappedArray = swapArrayElements(originalArray, x);
console.log(swappedArray); // Output: [3, 4, 5, 6, 1, 2]

// 2. 判断一个数组是否有序，升序返回 1，倒序返回 -1，乱序返回 0：

function isSorted(ary) {
  let ascending = true;
  let descending = true;

  for (let i = 1; i < ary.length; i++) {
    if (ary[i] > ary[i - 1]) {
      descending = false;
    } else if (ary[i] < ary[i - 1]) {
      ascending = false;
    }
  }

  if (ascending) {
    return 1; // Ascending
  } else if (descending) {
    return -1; // Descending
  } else {
    return 0; // Unsorted
  }
}

const sortedArray = [1, 2, 3, 4, 5];
const reverseArray = [5, 4, 3, 2, 1];
const unsortedArray = [2, 1, 4, 3, 5];

console.log(isSorted(sortedArray)); // Output: 1
console.log(isSorted(reverseArray)); // Output: -1
console.log(isSorted(unsortedArray)); // Output: 0

// 3. 实现 URL 匹配，不匹配时返回 null：

function parse(pattern, url) {
  const patternParts = pattern.split("/");
  const urlParts = url.split("/");

  if (patternParts.length !== urlParts.length) {
    return null;
  }

  const result = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const urlPart = urlParts[i];

    if (patternPart.startsWith(":")) {
      const key = patternPart.slice(1);
      result[key] = urlPart;
    } else if (patternPart !== urlPart) {
      return null;
    }
  }

  return result;
}

console.log(parse("/user/:userId", "/user/2")); // Output: { userId: '2' }
console.log(parse("/user/:userId", "/foo")); // Output: null

// 4. 实现链式四则运算：

function calculate(x) {
  let currentValue = x;

  function performOperation(operation, value) {
    if (operation === "plus") {
      currentValue += value;
    } else if (operation === "minus") {
      currentValue -= value;
    } else if (operation === "times") {
      currentValue *= value;
    } else if (operation === "divide") {
      currentValue /= value;
    }
    return calculate(currentValue);
  }

  return {
    plus(value) {
      return performOperation("plus", value);
    },
    minus(value) {
      return performOperation("minus", value);
    },
    times(value) {
      return performOperation("times", value);
    },
    divide(value) {
      return performOperation("divide", value);
    },
    value() {
      return currentValue;
    },
  };
}

const result = calculate(5).plus(1).minus(3).times(5).divide(2).value();
console.log(result); // Output: 7.5

// 这段代码实现了链式四则运算，其中 `calculate(x)` 创建一个对象，可以通过链式调用 `plus`, `minus`, `times`, 和 `divide` 方法来进行计算，最后使用 `value()` 方法获取计算结果。
