const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const authRoute = require('./routes/auth');
const privateRoute = require('./routes/private');
const verifytoken = require('./routes/verifytoken')



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
app.use('/protected', privateRoute);
app.use("/api/user", verifytoken.router);




app.listen(8000, () => console.log('Server Running...'))