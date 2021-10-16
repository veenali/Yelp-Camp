const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require("./cities");
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Database connected")
})


const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title:"purple field"});
    // await c.save();
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10
        const camp = new Campground({
            author: '60faa511cba2760ad0b0477f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea accusamus, velit veritatis expedita obcaecati qui optio facere voluptates vero sit et nulla vitae dolore hic nemo suscipit pariatur dolorem consequuntur.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqty1poqc/image/upload/v1628680468/YelpCamp/vmp6sfu0aq4xmsk7rjt3.jpg',
                    filename: 'YelpCamp/vmp6sfu0aq4xmsk7rjt3.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dqty1poqc/image/upload/v1628680288/YelpCamp/Baekhyun1_ptgymm.jpg',
                    filename: 'YelpCamp/Baekhyun1_ptgymm'
                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

