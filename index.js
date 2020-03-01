const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const verifytoken = require('./routes/verifytoken')
const test1Route = require('./routes/test1');


const app = express();
dotenv.config();


// connect to db
// mongoose.connect( process.env.DB_CONNECT ,
//     {
//         useNewUrlParser : true,
//         useUnifiedTopology: true
//     },
//     () => console.log('connected to db!!')
// );

mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to db!!')
);

// middleware
app.use(express.json()); // this is needed to parse the request into json I believe


//route middlewares
app.use('/api/user', authRoute);
app.use('/api/user', postRoute);
app.use("/api/user", verifytoken.router);
app.use('/', test1Route);



app.listen(8080, () => console.log('Server Running...'))