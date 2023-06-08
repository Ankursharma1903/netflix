import axios from 'axios';
// it is an api to make request from the tmdb
// and api key is our secret key to authenticate us from the tmdb

// initiallising the axios

const instance =axios.create({
    // so here when we are creating its like we are appending the previous url
baseURL:"https://api.themoviedb.org/3"
// by this we are making the api request from this url
})

// we have made a request.js file so it can easily fetch the information

export default instance;