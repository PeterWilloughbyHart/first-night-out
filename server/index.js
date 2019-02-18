require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const session = require("express-session");
// const bcrypt = require('bcryptjs');
const { findStuffNearLocation, searchForLocation, getPlaceDetails } = require('./controllers/mapsController')
const 
{ register, login, signout, createRoute, getRoutesByUserID, 
    getRoutesBasedOnCity, setPreferences
} = require('./controllers/firebaseControllers');


const app = express();
app.use(json());

// SESSION:
app.use(
    session({
        name: 'First Night Out',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
})
);

//ENDPOINTS: 
app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.delete('/api/auth/signout', signout);
app.post('/api/auth/preferences/:id', setPreferences);
app.post('/api/places/near', findStuffNearLocation);
app.post('/api/places/search', searchForLocation);
app.post('/api/places/details', getPlaceDetails);
app.post('/api/create/route', createRoute)
app.get('/api/routes/user/:id', getRoutesByUserID);
app.get('/api/routes/city/:city', getRoutesBasedOnCity)
// app.get('/api/seed', seed)

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));