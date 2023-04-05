var firstVar: any = 'This is a string';

//tipuri de date incorporate:
//number, string, boolean, void, null, undefined
let num: number = 5;
let string: string = 'this is a string number 2';
let boolean: boolean = true;

//tipuri de date definite de utilizator(user-defined)
//enum, class, interface, array, tupple
class Car{
    //fields
    model: String;
    doors: Number;
    isElectric: Boolean;

    constructor(model: String, doors: Number, isElectric: Boolean){
        this.model = model;
        this.doors = doors;
        this.isElectric = isElectric;
    }

    displayMake():void{
        console.log('This car is: ',this.model);
    }
}

const car1 = new Car('Prius', 4, true);
const car2 = new Car('PersonalCar', 0, false);
car2.displayMake();

const Cars = {
    model: 'Neto',
    make: 'Cars',
    display(): void{}
}

