const mongoose = require('mongoose');

const dbconnect = mongoose.connect(process.env.MONGODB_URI)
    .then(db => {
        console.log('MongoDB is Connected :]')
        return db;
    }).catch(err => {
        console.log ("Error in the DB connection: ");
    })

module.exports = dbconnect;