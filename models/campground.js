const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;


//Created this separate Image Schema so that we can access the virtual property. Otherwise it is not accessible.
const ImageSchema = new Schema({
    url: String,
    filename: String,
})

//This information is not stored in the database and therefore virtual.
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

// By default, Mongoose does not include virtuals when you convert a document to JSON. For example, if you pass a document to Express' res.json() function, virtuals will not be included by default.
// To include virtuals in res.json(), you need to set the toJSON schema option to { virtuals: true }.
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

//Add a virtual attibute
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <a href="/campgrounds/${this._id}"><strong>${this.title}</strong></a>
    <p>${this.location}</p>
    `
})

// Middleware when we delete a campground all related reviews must be removed
CampgroundSchema.post('findOneAndDelete', async function (data) {
    if (data) {
        await Review.deleteMany({
            _id: {
                $in: data.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)

