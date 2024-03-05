const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65e40695167439a32a7d857a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos impedit ratione consequuntur aspernatur debitis eveniet porro nostrum rerum temporibus cupiditate deleniti placeat, explicabo tenetur praesentium, molestias amet. Rerum, numquam atque?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dijk6duuf/image/upload/v1709524973/YelpCamp/ijkotixvrshqwst0fgzi.webp',
                    filename: 'YelpCamp/ijkotixvrshqwst0fgzi',
                },
                {
                    url: 'https://res.cloudinary.com/dijk6duuf/image/upload/v1709524973/YelpCamp/youolcspvxnhuozccuzz.webp',
                    filename: 'YelpCamp/youolcspvxnhuozccuzz',
                }
            ]
        })
        await camp.save();
    }

}

// execute seedDB to test if Mongo is connected successfully
seedDB().then(() => {
    mongoose.connection.close();
})