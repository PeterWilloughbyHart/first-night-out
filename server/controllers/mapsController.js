const axios = require('axios');
const nearbyBaseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const textSearchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
const placeDetailsURL = 'https://maps.googleapis.com/maps/api/place/details/json'
function searchForLocation(req, res, next) {
    const {query, location, radius, minPrice, maxPrice, type} = req.body;
    const key = process.env.REACT_APP_GCLOUD_PLACES_API;
    //QUERY AND KEY ARE REQUIRED
    if(!(query && key)) {
        res.status(412).json({error: "INVALID_REQUEST"})
    } else {
        let newQuery = query.split(' ').join('+');
        let request = `${textSearchURL}?query=${query}&key=${key}`;
        if(location)
            request+=`&location=${location}`
        if(radius)
            request+=`&radius=${radius}`;
        if(minPrice)
            request+=`&minprice=${minPrice}`;
        if(maxPrice)
            request+=`&maxprice=${maxPrice}`;
        if(type)
            request+=`&type=${type}`;

        axios.get(request).then(response => {
            if(response.data.status === "ZERO_RESULTS")
                res.status(404).json({error: "No results were found"});
            else
                res.status(200).json(response.data);
        })
    }
}

function findStuffNearLocation(req, res, next) {
    const {location, radius, keyword, minPrice, maxPrice, name, openNow, type} = req.body;
    const key = process.env.REACT_APP_GCLOUD_PLACES_API;
    //LOCATION, RADIUS, AND KEY ARE ALL REQUIRED
    if(!(location && radius && key)) {
        console.log('failed')
        res.status(412).json({error: "INVALID_REQUEST"});
    } else {
        let request = `${nearbyBaseURL}?location=${location}&radius=${radius}&key=${key}`
        if(keyword)
            request+=`&keyword=${keyword}`;
        if(minPrice)
            request+=`&minprice=${minPrice}`;
        if(maxPrice)
            request+=`&maxprice=${maxPrice}`;
        if(name)
            request+=`&name=${name}`;
        if(openNow)
            request+=`&opennow=${openNow}`;
        if(type)
            request+=`&type=${type}`;

        axios.get(request).then(response => {
            if(response.data.status === "ZERO_RESULTS")
                res.status(404).json({error: "No results were found"});
            else 
                res.status(200).json(response.data);
        })
    }
}

function getPlaceDetails(req, res, next) {
    const {placeid, fields} = req.body;
    const key = process.env.REACT_APP_GCLOUD_PLACES_API;
    if(!(key && placeid)) {
        res.status(412).json({error: "INVALID_REQUEST"});
    } else {
        let request = `${placeDetailsURL}?placeid=${placeid}&key=${key}`;
        if(fields) {
            request+=`&fields=${fields}`;
        }
        axios.get(request).then(response => {
            if(response.data.status === 'OK') {
                res.status(200).json(response.data);
            } else {
                res.status(404).json({error: "No results were found"})
            }
        })
    }
}

module.exports = {
    findStuffNearLocation,
    searchForLocation,
    getPlaceDetails
}