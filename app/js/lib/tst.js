var firstVar = 'This is a string';
//tipuri de date incorporate:
//number, string, boolean, void, null, undefined
var num = 5;
var string = 'this is a string number 2';
var boolean = true;
//tipuri de date definite de utilizator(user-defined)
//enum, class, interface, array, tupple
var Car = /** @class */ (function () {
    function Car(model, doors, isElectric) {
        this.model = model;
        this.doors = doors;
        this.isElectric = isElectric;
    }
    Car.prototype.displayMake = function () {
        console.log('This car is: ', this.model);
    };
    return Car;
}());
var car1 = new Car('Prius', 4, true);
var car2 = new Car('PersonalCar', 0, false);
car2.displayMake();
var Cars = {
    model: 'Neto',
    make: 'Cars',
    display: function () { }
};
