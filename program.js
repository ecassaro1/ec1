var myApp = { //the app is an Object
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
        //
        this.loopOverAttrs();
        this.useRegexp();
        this.useCurry();
        this.usePromise();
        this.usePromise2();
        this.useClass();
        //this.usePrototypes3();
        this.usePrototypes2();
        this.usePrototypes();
        this.useInstances();
        this.useAugmenting();
        this.useApply();
        this.useFoobar();
        this.useNew();
        this.useCreate();
        this.useObject();
        this.useFunction();
        this.useFunc1();
    },

    write: function (iContent) {
        document.writeln(iContent);
    },

    title: function (iTitle) {
        this.write('');
        this.write('------------------------------');
        this.write(iTitle);
    },

    sayHello: function () {
        this.write('Hello...');
    },

    loopOverAttrs: function() {        
        this.title('loopOverAttrs');

        var obj = {
            attr1: "val1",
            attr2: function() {
                return "val2";
            },
            attr3: "val3"
        }

        for(var member in obj) {
            if (typeof obj[member] === "function") {
                this.write(obj[member]());
            }
            else {
                this.write(obj[member]);
            }
        }
    },

    useRegexp: function() {        
        this.title('useRegexp');

        var exp = "Good programs have a structure";
        var regExp = /(prog|struct|good)/i;

        this.write(regExp.test(exp));
    },

    useCurry: function() {        
        this.title('useCurry');

        const that = this;

        var greetCurried = function(greeting) {
            return function(name) {
                that.write(greeting + ", " + name);
            };
        };
        
        var greetHello = greetCurried("Hello");
        
        greetHello("Heidi");
        greetHello("Eddie");
        greetCurried("Hi there")("Howard");         
    },

    usePromise: function() {        
        this.title('usePromise');

        this.write('o resultado estara no final, pois roda assincrono')

        const that = this;

        doSomething().then(function(result) {
            return doSomethingElse(result);
        })
        .then(function(newResult) {
            return doThirdThing(newResult);
        })
        .then(function(finalResult) {
            that.title('usePromise (result)');
            that.write('Got the final result: ' + finalResult);
        })
        .catch(failureCallback);
          
        function doSomething() {
            return new Promise((resolve,reject)=>{
                resolve("something");
            })
        }

        function doSomethingElse(p1) {
            return new Promise((resolve,reject)=>{
                resolve(p1+" + something else");
            })            
        }

        function doThirdThing(p1) {
            return new Promise((resolve,reject)=>{
                resolve(p1+" + some third thing");
            })     
        }

        function failureCallback() {
            that.write("Failure");
        }
    },    

    usePromise2: function() {
        this.title("usePromise2");        

        var that=this;

        function f1(p1) {
            return new Promise((resolve,reject)=>{
                resolve(p1*p1);
            });
        }

        f1(3).then((result)=>{
            this.title("usePromise2 (result)");        

            that.write(result);
        });
    },

    useClass: function() {        
        this.title('useClass');

        const that = this;

        class Animal { 

            constructor(nome) {
                this.nome = nome;
            }
            
            falar() {
                that.write(this.nome + ' emite um barulho.');
            }
        }

        class Cachorro extends Animal {
            falar() {
                that.write(this.nome + ' latidos.');
            }
        }

        var d = new Cachorro('Mat');
        d.falar();      
    },

    usePrototypes3: function () {
        this.title('usePrototypes3');

        /*
        var Quo = function (string) {
            this.status = string;
        };

        Quo.prototype.get_status = function () {
            return this.status;
        };
        this.write(Quo.prototype.get_status.apply(statusObject));
        */


        var A = function () {
            this.name = "my name is just 'a'";

            getName = function() {
                return this.name;
            }
        };


        var myB = Object.create(A);

        this.write("B.getName()="+myB.getName());
    },

    usePrototypes2: function () {
        this.title('usePrototypes2');
        this.title('prototypal inheritance');

        var animal = {
            legs: undefined,
            name: undefined,
            organs: ["heart", "lungs", "stomach", "brain"],
            sayName: function () {
                myApp.write((this.name && ("My name is " + this.name)) || "none"); //here, "this" is the "bird" object
            }
        };

        var bird = Object.create(animal);
        bird.name = "The Word";
        bird.sayName();

        var ancestorOrgans = bird.organs;
        bird.organs = [];
        bird.organs.push(ancestorOrgans);
        bird.organs.push("wings");

        this.write("animal.organs="+animal.organs);
        this.write("bird.organs="+bird.organs);
    },

    usePrototypes: function () {
        this.title('usePrototypes');

        function Employee() {
            this.name = '';
            this.dept = 'general';
        }

        function Manager() {
            Employee.call(this);
            this.reports = [];
        }
        Manager.prototype =
            Object.create(Employee.prototype);

        function WorkerBee() {
            Employee.call(this);
            this.projects = [];
        }
        WorkerBee.prototype =
            Object.create(Employee.prototype);

        var manager1 = new Manager();
        manager1.reports[0] = 'report 0';

        var wb1 = new WorkerBee();
        wb1.projects[0] = 'project 0';

        this.write("manager1.reports[0]=" + manager1.reports[0]);
        this.write("wb1.projects[0]=" + wb1.projects[0]);

        //nestes testes abaixo dá pra ver que se trata do mesmo objeto. Não éra o que eu queria...
        // o problema é que quando eu queria atualizar as propriedades do wb11 na vdd eu estava
        // atualizando as do wb1, pq a referencia da propriedade estava subindo a cadeia
        var wb11 = Object.create(wb1);
        this.write("wb11.projects[0]=" + wb11.projects[0]);
        wb1.projects[1] = 'project 1';
        this.write("wb11.projects[1]=" + wb11.projects[1]);
        wb11.projects[2] = 'project 2';
        this.write("wb1.projects[2]=" + wb1.projects[2]);
        wb11.projects[1] = 'project 1b';
        this.write("wb1.projects[1]=" + wb1.projects[1]);

        //mas assim dá certo, pq ao definir uma propriedade "projects" no wb11 eu não toquei na 
        // propriedade "projects" do wb1. Ou seja, ela foi redefinida por diferença
        this.write("agora sim!");

        var wb11 = Object.create(wb1);
        this.write("wb11.projects[0]=" + wb11.projects[0]);
        wb1.projects[1] = 'project 1';

        wb1Projects = wb1.projects;
        wb11.projects = [];
        wb1Projects.forEach((project)=>{
            wb11.projects.push(project);
        });

        this.write("wb11.projects[1]=" + wb11.projects[1]);
        wb11.projects[2] = 'project 2';
        this.write("wb1.projects[2]=" + wb1.projects[2]);
        wb11.projects[1] = 'project 1b';
        this.write("wb1.projects[1]=" + wb1.projects[1]);
    },

    useInstances: function () {
        this.title('useInstances');

        //this example shows two independent instances of a class, and the "Items" atribute is private

        var wdg1 = {
            factory: function (iStatus) {
                return {
                    status: iStatus
                }
            },

            Wrapper: function () {
                //private
                var items = []; //These members are private and you...
                var current = 0; //...can only access them through the methods

                return {
                    getItem: function (iIndex) {
                        return items[iIndex || current];
                    },

                    setItem: function (iValue, iIndex) {
                        items[iIndex || current] = iValue;
                    },

                    setCurrent: function (iIndex) {
                        current = iIndex;
                    },

                    getCurrent: function () {
                        return current;
                    }
                }
            }
        }


        var hdl1 = new wdg1.Wrapper(); //instance 1
        hdl1.setCurrent(0);
        hdl1.setItem(wdg1.factory("inicial do hdl1"));
        document.writeln("hdl1:" + hdl1.getItem().status);


        var hdl2 = new wdg1.Wrapper(); //instance 2
        hdl2.setCurrent(0);
        hdl2.setItem(wdg1.factory("inicial do hdl2"));
        document.writeln("hdl2:" + hdl2.getItem().status);


        document.writeln("hdl1:" + hdl1.getItem().status); // instance 1 retains its original value                
    },

    useAugmenting: function () {
        this.title('useAugmenting');

        Object.method('sayHi', function (iThat, someone) {
            document.writeln('Hi ' + someone + ' from ' + iThat.constructor.name);
        });

        var v1 = 'Teste123';
        v1.sayHi(v1, 'people!');
    },

    useApply: function () {
        this.title('useApply');

        var Quo = function (string) {
            this.status = string;
        };

        Quo.prototype.get_status = function () {
            return this.status;
        };

        var statusObject = {
            status: 'A-OK'
        };

        // o statusObject não tem get_status, mas mesmo assim consigo rodar o get_status sobre ele
        this.write(Quo.prototype.get_status.apply(statusObject));
    },

    useFoobar: function () {
        this.title('useFoobar');

        var myFoo = this.foo(); //returned an access Object with methods
        this.write('foobar=' + myFoo.getBar());
        myFoo.setBar(1);
        this.write('foobar=' + myFoo.getBar());
        myFoo.setBar(2);
        this.write('foobar=' + myFoo.getBar());

        var myFoo2 = this.foo(); //not another instance, but just the same
        this.write('foobar=' + myFoo2.getBar());
        myFoo.setBar(1);
        this.write('foobar=' + myFoo.getBar()); //myFoo didn´t keep the bar=2. It changed to 1.
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
        this.title('useNew');

        var Quo = function (string) {
            this.status = string;
        };
        /*same effect        
        function Quo(string) {
            this.status = string;
        }
        */

        Quo.prototype.get_status = function () {
            return this.status;
        };
        // Make an instance of Quo.
        var myQuo = new Quo("confused");
        this.write(myQuo.get_status()); // confused
    },

    useCreate: function () {
        this.title('useCreate');

        var foo = {
            attr1: '1',
            attr2: 'Hum'
        };

        var bar = Object.create(foo);

        this.write(bar.attr1 + bar.attr2);

        foo.attr3 = 'ahaaa!!';

        //this.write(bar.attr3);

        this.write('does foo has attr3?' + foo.hasOwnProperty('attr3'));
        this.write('does bar has attr3?' + bar.hasOwnProperty('attr3'));
        this.write('but does bar.attr3 has a type?' + typeof bar.attr3);
        this.write('wait... wtf??    bar.attr3==='+bar.attr3);
    },

    myObject: {
        value: 0,
        increment: function (inc) {
            this.value += typeof inc === 'number' ? inc : 1;
        },
        add: function (arg1, arg2) {
            return arg1 + arg2;
        },
        double: function () {
            var that = this; // Workaround.
            var helper = function () {
                that.value = that.add(that.value, that.value);
            };
            helper(); // Invoke helper as a function.        
        }
    },

    useObject: function () {
        this.title('useObject');

        this.myObject.increment();
        this.write(this.myObject.value); // 1
        this.myObject.increment(2);
        this.write(this.myObject.value); // 3
        this.myObject.double();
        this.write(this.myObject.value); //6
    },

    useFunction: function () {
        this.title('useFunction');

        function foo() {
            document.writeln((this.myObject && this.myObject.value) || 'none'); //must fail. Gives 'none'
        };
        foo();

        var that = this;

        function bar() {
            document.writeln((that.myObject && that.myObject.value) || 'none'); //but this (that) one must succeed
        };
        bar();
    },

    useFunc1: function () {
        this.title('useFunc1');

        var that = this;

        var a = function () {
            that.write('this is a');
        }

        var b = function () {
            return function () {
                that.write('this is b');
            }
        }

        a();
        var c = b();
        c();
    }
};

myApp.run();