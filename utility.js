const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzIyMzYyZTU3ODgxZjhlZWYzOTIxNmFjOGMyODdiZiIsIm5iZiI6MTczMzc1NzM3MS4zMDA5OTk5LCJzdWIiOiI2NzU3MDliYjljYzBiNmZjMzE5YTc1ZTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KYNgvwhQja_IEZyuJv2b4vDYUV9wFIiJtkk_7P_YclA'
};

const tmdbBASEURL='https://api.themoviedb.org/3/'
const imageBASEURL='https://image.tmdb.org/t/p/original/'

const tmdbEndPoints={
    // Home Endpoints
    nowPlaying:'movie/now_playing?language=en-US&page=1',
    topRated:'movie/top_rated?language=en-US&page=1',
    popular:'movie/popular?language=en-US&page=1',
    upcoming:'movie/upcoming?language=en-US&page=1',
    trending:'/trending/all/week',


    // Movie Endpoints
    fetchActionMovies: `/discover/movie?language=en-US&with_genres=28`,
    fetchComedyMovies: `/discover/movie?language=en-US&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?language=en-US&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?language=en-US&with_genres=10749`,
    fetchAnimeMovies: '/discover/movie?language=en-US&with_genres=16',


    // TV Show Endpoints
    fetchActionTvShows: `/discover/tv?language=en-US&with_genres=10759`,
    fetchComedyTvShows: `/discover/tv?language=en-US&with_genres=35`,
    fetchMysteryTvShows: `/discover/tv?language=en-US&with_genres=9648`,
    fetchDramaTvShows: `/discover/tv?language=en-US&with_genres=18`,
    fetchCrimeTvShows: `/discover/tv?language=en-US&with_genres=80`,
}


async function fetchMovieData(endpoint) {
    try {
        
        const url=tmdbBASEURL+endpoint
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        console.log("Response Status:", response.status); // Log response status

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Log fetched data
        return data;

    } catch (err) {
        console.error("Fetch Error:", err.message); // Log error message
        throw new Error(`Failed to fetch movie data: ${err.message}`);
    }
}


module.exports={
    fetchMovieData, tmdbEndPoints
}