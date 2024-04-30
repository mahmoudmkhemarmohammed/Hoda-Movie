import { apiKey, options , imgPath} from "./api.js"
let Category_Id = localStorage.Category_Id,
currentPage = 1,
movieListContainer = document.querySelector(".movie-list"),
movieCard = '';
document.querySelector(".category-name-list").innerHTML = localStorage.categoryName;
async function fetchDataCategory () {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&page=${currentPage}&sort_by=popularity.desc&${Category_Id}` , options).then( result => result.json())
    .then( data => {
    data.results.forEach( el => {
        movieCard += `
        <div class="movie-card" data-id="${el.id}">
        <div class="img">
        <img src="${imgPath}${el.poster_path}" alt="">
        </div>
        <div class="text">
        <h3 class="title">${el.original_title.length > 18 ? `${el.title.substring(0,17)}...` : el.original_title }</</h3>
        <div class="info">
        <p class="years">${el.release_date.substring(0,4)}</p>
        <p class="stars">${el.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i></p>
        </div>
        </div>
        </div>
        `
    })
    movieListContainer.innerHTML = movieCard;
    document.querySelectorAll(".movie-list .movie-card").forEach( el => {
        el.onclick = function () {
            localStorage.setItem("Movie_id",this.dataset.id);
            window.location.assign("details.html")
        }
    })
    })
}
fetchDataCategory()
document.querySelector(".btn button").onclick = () => {
    currentPage++;
    fetchDataCategory()
}