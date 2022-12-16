const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config({path:"./config.env"}); 
const port = process.env.PORT || 3100;


app.use(express.json());
app.use(cors());

app.use(require('./routes/userRoute'));

const conet = require('./db/connect');

conet.then(db => {
    if(!db) return process.exit(1);

    app.listen(port, () => {
        console.log(`Listening at http://localhost: ${port}`);
    })

    app.on('error',err => console.log(`No connection with the server: ${err}`));
}).catch(error => {
    console.log(`Connection failed :( ${error}`);
});




 