var myApp = { //the app is an object
    init: function () {
        Function.prototype.method = function (name, func) {
            this.prototype[name] = func;
            return this;
        };
        
        if (typeof Object.create !== 'function') {
            Object.create = function (o) {
            var F = function () {};
            F.prototype = o;
            return new F();
            };
        };      
    },

    run: function () {
        this.init();

        //do things
        this.sayHello();
        this.useFoobar();
        this.useNew();
        this.useCreate();
        this.useObject();
        this.useFunction();
        this.useApply();
    },

    write: function (iContent) {
        document.writeln(iContent);
    },

    sayHello: function () {
        this.write('Hello...');      
    },

    useFoobar: function () {
        var myFoo = this.foo(); //returned an access object with methods
        this.write('foobar='+myFoo.getBar());
        myFoo.setBar(1);
        this.write('foobar='+myFoo.getBar());
        myFoo.setBar(2);
        this.write('foobar='+myFoo.getBar());
    },

    foo: function () {
        var bar = 0; //private 

        return { //closure
            getBar: function () {
                return bar;
            },

            setBar: function (iValue) {
                bar = iValue;
            }
        }
    },

    useNew: function () { //not a good part
        var Quo = function(string) {
            this.status = string;
        };
/*same effect        
        function Quo(string) {
            this.status = string;
        }
*/        

        Quo.prototype.get_status = function ( ) {
            return this.status;
        };
            // Make an instance of Quo.
        var myQuo = new Quo("confused");                
        this.write(myQuo.get_status( )); // confused
    },

    useCreate: function () {
        var foo = 
            { 
                attr1: '1',
                attr2: 'Hum'
            };

        var bar = Object.create(foo);

        this.write(bar.attr1+bar.attr2);

        foo.attr3 = 'ahaaa!!';

        this.write(bar.attr3);

        this.write('dos bar has attr3?'+bar.hasOwnProperty('attr3'));
        this.write('dos foo has attr3?'+foo.hasOwnProperty('attr3'));
        this.write('but dos bar.attr3 has a type?'+typeof bar.attr3);
    },
  
    myObject: {
        value: 0,
        increment: function (inc) {
            this.value += typeof inc === 'number' ? inc : 1;
        },
        add: function(arg1,arg2) {
            return arg1+arg2;
        },
        double: function () {
            var that = this; // Workaround.
            var helper = function ( ) {
                that.value = that.add(that.value, that.value);
            };
            helper( ); // Invoke helper as a function.        
        }
    },

    useObject: function () {
        this.myObject.increment();
        this.write(this.myObject.value); // 1
        this.myObject.increment(2);
        this.write(this.myObject.value); // 3
        this.myObject.double();
        this.write(this.myObject.value); //6
    },

    useFunction: function() {
        function foo() {
            document.writeln((this.myObject && this.myObject.value) || 'none' ); //must fail. Gives 'none'
        };
        foo();

        var that = this;
        function bar() {
            document.writeln((that.myObject && that.myObject.value) || 'none' ); //but this (that) one must succeed
        };
        bar();        
    },

    useApply: function() {
        var modelObject = {
            val1: 2,
            var2: 3,
        };

        var helperObject = {
            add: function() {
                return val1+val2;
            }
        };

        this.write('add='+helperObject.prototype.add.apply(modelObject));
        //não deu certo. Contruído deste jeito o helperObject não tem um prototype. Mudar a criação para algo como o Quo
    },
};

myApp.run();

