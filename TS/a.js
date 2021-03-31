function P() {
    this.name = 'p name'
    this.age = 'p age'
}
let p = new P()
function S() {
    this.name = 's name'
}
S.prototype = p
let s = new S();
for (let a in s) {
    s.hasOwnProperty(a) && console.log(a)
}
let arr = [1, 2, 3]
for (let [value, key] of arr) {
    console.log(key)
}