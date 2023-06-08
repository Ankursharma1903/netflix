// typically we would store in {process.env.API_KEY}
// env means environment

const API_KEY = 'c52492f5d4193ab504e1ea0ef535cc61';

const requests={

fetchTrending: `/trending/all/week?api_key=${API_KEY}&
language=en-US`,
fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&
with_networks=213`,
fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&
language=en-US`,
fetchActionMovies: `/discover/movie?api_key=${API_KEY}&
with_genres=28`,
fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&
with_genres=35`,
fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&
with_genres=27`,
fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&
with_genres=10749`,
fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&
with_genres=99`,


}

// so everytime it works it place the url mention of tmdb in axios in it and the api key and made these all requests from the tmdb sites

export default requests;