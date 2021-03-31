//父类
function Person(name) {//给构造函数添加参数
    this.name = name;
    this.say = function () {
        console.log('Person 实例 say')
    }
}
Person.prototype.do = function () {
    console.log('Person 原型 do')
}
//
/**
 * 1.原型链继承---父类的实例作为子类的原型
 * 重点：让新实例的原型等于父类的实例。
    特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
    缺点：1、新实例无法向父类构造函数传参。
       2、继承单一。
       3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
 * @param {*} name 
 */
function Per1(name) {
    this.name = name
    // this.age = age
}
let p = new Person('cjj')
p.age = 10
Per1.prototype = p;//重点
let per1 = new Per1('cjj-per1', 1)
console.log('---------原型链继承-----------------')
p.age = 11
console.log(per1.name)
console.log(per1.age)
per1.say()
per1.do()
console.log(per1 instanceof Per1)
console.log(per1 instanceof Person)
console.log(JSON.stringify(per1))

/**
 * 二、借用父类构造函数继承
 * 重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
    特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
       2、解决了原型链继承缺点1、2、3。
       3、可以继承多个构造函数属性（call多个）。
       4、在子实例中可向父实例传参。
    缺点：1、只能继承父类构造函数的属性。
       2、无法实现构造函数的复用。（每次用每次都要重新调用）
       3、每个新实例都有父类构造函数的副本，臃肿。
 */
function Per2(name, age) {
    Person.call(this, name)//重点
    this.age = age;
}
let per2 = new Per2('cjj-per2', 2)
console.log('---------借用构造函数继承-----------------')
console.log(per2.name)
console.log(per2.age)
per2.say()
// per2.do()//报错：没有继承父类原型上的属性
console.log(per2 instanceof Per2)
console.log(per2 instanceof Person)

/**
 * 三、组合继承（组合原型链继承和借用父类构造函数继承）（常用）
 *重点：结合了两种模式的优点，传参和复用
    特点：1、可以继承父类原型上的属性，可以传参，可复用。
       2、每个新实例引入的构造函数属性是私有的。
    缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
 */
function Per3(name, age) {
    Person.apply(this, arguments)//重点1，借用父类构造函数
    this.age = age
}
Per3.prototype = new Person();//重点2，原型链继承
let per3 = new Per3('cjj-per3', 3);
console.log('---------组合继承（组合原型链继承和借用构造函数继承）-----------------')
console.log(per3.name)
console.log(per3.age)
per3.say()
per3.do()
console.log(per3 instanceof Per3)
console.log(per3 instanceof Person)

/**
 * 四、原型式继承
 * 重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.createYxs()就是这个原理。
    特点：类似于复制一个对象，用函数来包装。
    缺点：1、所有实例都会继承原型上的属性。
       2、无法实现复用。（新实例属性都是后面添加的）
 */
//先封装一个容器，用来输出对象和承载继承的原型
function createYxs(obj) {
    function F() { }
    F.prototype = obj//继承参入的参数
    return new F();//返回一个新的实例
}
let p2 = new Person('cjj-per4', 4);
let yxs = createYxs(p2);
console.log('---------四、原型式继承-----------------')
console.log(yxs.name)
yxs.say()
yxs.do()
console.log(yxs instanceof Person)

/**
 * 五、寄生式继承
 * 重点：就是给原型式继承外面套了个壳子。
    优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
    缺点：没用到原型，无法复用。
 */
//在原型式继承的外面在套一层，内部使用原型式继承
function createJss(obj) {
    let son = createYxs(obj);//使用原型式继承，
    obj.name = 'createJss name'
    return son
}
var jss = createJss(new Person());
//
console.log('---------五、寄生式继承-----------------')
console.log(jss.name)
jss.say()
jss.do()
console.log(jss instanceof Person)

/**
 * 六、寄生组合式继承（常用）
 *重点：修复了组合继承的问题
 */
//寄生
let p6 = createYxs(Person.prototype)//这里更像是用原型式继承，只不过继承的是父类的原型
//组合
function Per6() {
    Person.call(this)//这个继承了父类构造器的属性
}//解决组合式两次调用构造函数的缺点
Per6.prototype = p6//继承实例
p6.constructor = 'Per6'//修改实例
let per6 = new Per6('per6', 12)
console.log('---------寄生组合式-----------------')
console.log(per6.name)
per6.say()
per6.do()
console.log(per6 instanceof Person)
console.log(per6 instanceof Per6)