const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const app = express();

//Body parser: form data from req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Failed to connect: ', err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));