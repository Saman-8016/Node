// 1. add a new car to the DB
// 2. get all cars from the DB

const config = require("../Yelp_comics/config.js");

const mongoose = require('mongoose');
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    color: String,
    mileage: Number,
    needsRepair: Boolean
});

const Car = mongoose.model("cars", carSchema);

const myTruck = new Car({
    make: "Chevrolet",
    model: "Silverado",
    year: 2006,
    color: "Silver",
    mileage: 120000,
    needsRepair: false
});

// three different ways to add to the data base:

// myTruck.save((err, car) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(car)
//     }
// });

// Car.create(myTruck, (err, car) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(car)
//     }
// })

// Car.create(myTruck)
// .then((err, car) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(car)
//     }
// });

Car.findById("60a7d692225b362196f2eacc")
.exec() // Execute our query. returning a promise
.then((foundCar) => {
    console.log(foundCar)
})
.catch((err) => {
    console.log("Error!" + err)
})


Car.find()
.exec() // Execute our query. returning a promise
.then((foundCars) => {
    console.log(foundCars[2].year)
})
.catch((err) => {
    console.log("Error!" + err)
})