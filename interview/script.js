/**
 * 1. What does the following code output?
 * 
 * A: Without 'use strict' (strict mode), not as a, b is declared as a global variable, so the output is 5.
 *    With 'use strict', the output is "ReferenceError: b is not defined". 
 *    In order to make the output to be 5 in strict mode, b must be declared as 'window.b'.
 */
(function () {
    'use strict';
    var a = window.b = 5;
})();

console.log(b);

/**
 * 2. Create a String repeatity function: 'hello'.repeatify(4) output: 'hellohellohellohello'
 */
String.prototype.repeatify = String.prototype.repeatify || function (times) {
    var str = '';
    for (var i = 0; i < times; i++) {
        str += this;
    }
    
    return str;
};

console.log('hello'.repeatify(4));

/**
 * 3. Hoisting: 
 * 1) a is a variable that was not assigned any value when it is used.
 * 2) foo() is a function, which can be called before the decaration.
 */
function test() {
    console.log('a = ' + a);
    console.log('foo() = ' + foo());
    
    var a = 1;
    
    function foo() {
        return 2;
    }
    
    return 'test() is done.';
}

console.log(test());

/**
 */
var fullname = 'John Doe';
var obj = {
    fullname: 'Colin Ihrig',
    prop: {
        fullname: 'Aurelio De Rosa',
        getFullname: function () {
            return this.fullname;
        }
    }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test());
console.log(test.call(obj.prop));
console.log(test.apply(obj.prop));
