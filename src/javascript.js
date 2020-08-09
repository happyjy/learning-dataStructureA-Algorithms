// 1. for in
// for (variable in object)
//   statement

const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}

// expected output:
// "a: 1"
// "b: 2"
// "c: 3"

// 2. for of
/*
  for (variable of iterable) {
    statement
  }
  # variable
    On each iteration a value of a different property is assigned to variable. variable may be declared with const, let, or var.
  
  # iterable
    Object whose iterable properties are iterated.
*/

const array1 = ['a', 'b', 'c'];

for (const element of array1) {
  console.log(element);
}

// expected output: "a"
// expected output: "b"
// expected output: "c"

//2. keys, values, entries and fromEntries
// keys, values, entries:
// fromEntries:
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

Object.keys(object1); //(3) ["a", "b", "c"]
Object.values(object1); //(3) ["somestring", 42, false]
Object.entries(object1);
/*
0: (2) ["a", "somestring"]
1: (2) ["b", 42]
2: (2) ["c", false]
*/

var arr = [
  ['a', 'somestring'],
  ['b', 42],
  ['c', false],
];
Object.fromEntries(arr); //{a: "somestring", b: 42, c: false}
