const apiKey = "24b5f0e492500b176506395fe57e7133";
const genre = "https://api.themoviedb.org/3/genre/movie/list";
const popular = "https://api.themoviedb.org/3/movie/popular";
const imgPath = "https://image.tmdb.org/t/p/original";
const topRated = "https://api.themoviedb.org/3/movie/top_rated";
const allTrending = "https://api.themoviedb.org/3/trending/movie/day";
const details = "https://api.themoviedb.org/3/movie";
const similar = "https://api.themoviedb.org/3/movie/";
const credits = "https://api.themoviedb.org/3/movie/";
const videos = "https://api.themoviedb.org/3/movie/";
const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGI1ZjBlNDkyNTAwYjE3NjUwNjM5NWZlNTdlNzEzMyIsInN1YiI6IjY1ZmYxZDhmMDkyOWY2MDE2NDlhYmI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lNdVj6jhHuvmlVtwkYbZ4LIONsFupvufwbe3MUBXleI'
    }
};
export {
    apiKey,
    genre,
    options,
    popular,
    imgPath,
    topRated,
    allTrending,
    details,
    similar,
    credits,
    videos
}