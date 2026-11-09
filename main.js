import HashSet from "./hashSet.js";

const set = new HashSet();
set.add("apple");
set.add("banana");
set.add("apple"); // duplicate, ignored

console.log(set.length());       // 2
console.log(set.has("apple"));   // true
console.log(set.has("grape"));   // false
console.log(set.remove("apple")); // true
console.log(set.keys());         // ['banana']

for (let i = 0; i < 20; i++) set.add("key" + i);
console.log(set.length(), set.capacity); // 21 32