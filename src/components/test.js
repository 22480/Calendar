const fruits = []
fruits.push("banana", "apple", "peach")
// console.log(fruits.length)
fruits[5] = "mango"
// console.log(0 in fruits) //true
// console.log(fruits[5])
// console.log(Object.keys(fruits))
// console.log(fruits.length)

// console.log("----------")
// Array(6).forEach((_,i)=>console.log(i))
// Array(6).fill(0).forEach((_,i)=>console.log(i))

// 静态方法
// console.log(Array.from("foo")) //[ 'f', 'o', 'o' ]
// console.log(Array.from([1, 2, 3], x => x + x)) //[ 2, 4, 6 ]

const set = new Set(["foo", "bar", "baz", "foo"])
Array.from(set)

//实例方法
// every()
function isBigEnough(element) {
    return element >= 10;
  }
// console.log([12, 5, 8, 130, 44].every(isBigEnough));
//  会改变原数组
let arr = [1, 2, 3, 4];
arr.every((elem, index, arr) => {
//     console.log(index)
//   arr[index + 1]--;
//   console.log(arr[index + 1])
//   console.log(`[${arr}][${index}] -> ${elem}`);
  return elem < 2;
});

// const arr1 = Array(3).fill({}); // [{}, {}, {}]
// arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]

// const arr2 = new Array(3);
// for (let i = 0; i < arr.length; i++) {
//   arr[i] = new Array(4).fill(1); // 创建一个大小为 4 的数组，填充全 1
// }
// arr[0][0] = 10;
// console.log(arr[0][0]); // 10
// console.log(arr[1][0]);

const a = ["Wind", "Water", "Fire"]
// console.log(a.join(",")) 
// console.log(a.toString())

const array1 = ['a', 'b', 'c'];
const iterator = array1.keys()
for(const key of iterator){
    console.log(key)
}
const array4 = ['a', 'b', 'c'];
const iterator1 = array1.values();

for (const value of iterator1) {
  console.log(value);
}

const arr3 = ["a", , "c"];
const sparseKeys = Object.keys(arr3);
const denseKeys = [...arr.keys()];
// console.log(sparseKeys); // ['0', '2']
// console.log(denseKeys); // [0, 1, 2]

const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
    enumerable:true
  },
  property2: {
    value: "Hello",
    writable: false,
  }
});


//Object.defineProperty(),entries(),groupBy()实验性，先不看，hasOwn()  -判断是否是子类自身的属性,is()  -与"==="唯一区别在于它们处理带符号的 0 和 NaN 值的时候。=== 运算符（和 == 运算符）将数值 -0 和 +0 视为相等，但是会将 NaN 视为彼此不相等。keys()  -用的最多,values()
console.log(object1.property1,object1.property2);
object1.property1 = 32
// object1.property2 = "ad" //报错，不能重写
// console.log(object1.property1,object1.property2);

const map = new Map([
    [1, 2],
    [2, 4],
    [4, 8],
  ]);
  console.log(Array.from(map)) ;
  console.log(Array.from(map.values())) ;
  console.log(Array.from(map.keys()))

  const set1 = new Set(["foo", "bar", "baz", "foo1"]);
console.log(Array.from(set1)) ;

console.log(Array(3))  //[ <3 empty items> ]
console.log(0 in [undefined, undefined, undefined])
console.log(0 in [, , ,]);
[,'a'].forEach((x,i) => console.log(i));
console.log(Array.from(['a',,'b'])) 
console.log([,'a','b',,].copyWithin(2,0))
console.log("-----------------");
[,'a'].map(x => console.log(x))
// console.log([,'a'].map(x => console.log(x)))

