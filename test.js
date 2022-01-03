var Person = {
    init: function (name) {
        this.name = name;
    },
    print: function () {
        console.log(this.name);
    }
};
var obj = Object.create(Person);
obj.init('venkat');
obj.print();