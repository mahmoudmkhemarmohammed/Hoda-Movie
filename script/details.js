import { details , options , imgPath , similar , credits , videos} from "./api.js";
let movieId = localStorage.Movie_id,
img = document.querySelector(".details .container .movie-details .img img"),
movieTitle = document.querySelector(".details .container .movie-details .text-details .title"),
movieStars = document.querySelector(".details .container .movie-details .text-details .stars"),
movieTime = document.querySelector(".details .container .movie-details .text-details .time"),
movieYears = document.querySelector(".details .container .movie-details .text-details .years"),
movieDesc = document.querySelector(".details .container .movie-details .text-details .description"),
movieCateg = document.querySelector(".details .container .movie-details .text-details .category"),
movieCard = '',
movieCardContainerSim = document.querySelector(".details .container .movie-similar"),
character = document.querySelector("body .details .container .movie-details .text-details .starring"),
movieVideos = document.querySelector(".details .container .videos"),
videoFrame = '',
author = document.querySelector("body .details .container .movie-details .text-details .directed span"),
iconTheme = document.querySelector("header .container nav .theme i")
if(localStorage.theme === "light") {
    document.body.classList.add("light");
    iconTheme.className = 'fa-solid fa-moon';
}
else {
    document.body.classList.remove("light");
    iconTheme.className = 'fa-solid fa-sun';
}
iconTheme.onclick = () => {
    if(!document.body.classList.contains("light")) {
        document.body.classList.add("light");
        iconTheme.className = 'fa-solid fa-moon';
        localStorage.setItem("theme","light")
    }
    else {
        document.body.classList.remove("light");
        iconTheme.className = 'fa-solid fa-sun';
        localStorage.setItem("theme","dark")
    }
}
async function fetchDataDetails () {
    await fetch(`${details}/${movieId}`,options).then( result => result.json())
    .then( data => {
        img.src = `${imgPath}${data.backdrop_path}`;
        movieTitle.innerHTML = data.title;
        movieStars.innerHTML = `${data.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
        movieTime.innerHTML = `${data.runtime}m`;
        movieDesc.innerHTML = data.overview
        movieYears.innerHTML = data.release_date.substring(0,4);
        data.genres.forEach( el => {
            let span = document.createElement("span");
            let text = document.createTextNode(el.name);
            span.appendChild(text);
            movieCateg.appendChild(span)
        })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews` , options).then( result => result.json())
        .then( data => author.innerHTML = data.results[0].author == undefined ? "...." : data.results[0].author)
    })
}
fetchDataDetails()
async function fetchDataSimilar () {
    fetch(`${similar}${movieId}/similar`,options).then(result => result.json())
    .then( data => {
        let arrayMovie = data.results;
        arrayMovie.forEach( el => {
            movieCard += `
            <div class="movie-card" data-id="${el.id}">
            <div class="img">
            <img src="${imgPath}${el.poster_path}" alt="">
            </div>
            <div class="text">
            <h3 class="title">${el.title.length > 18 ? `${el.title.substring(0,17)}...` : el.title }</</h3>
            <div class="info">
            <p class="years">${el.release_date.substring(0,4)}</p>
            <p class="stars">${el.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i></p>
            </div>
            </div>
            </div>
            `
        })
        movieCardContainerSim.innerHTML = movieCard;
        document.querySelectorAll(".movie-similar .movie-card").forEach( el => {
            el.onclick = function () {
                localStorage.setItem("Movie_id",this.dataset.id);
                window.location.reload()
            }
        })
    })
}
fetchDataSimilar()
async function fetchDataCredits () {
    await fetch(`${credits}${movieId}/credits` , options).then( result => result.json())
    .then( data => {
        let arrayFromData = data.cast
        arrayFromData.forEach( el=> {
            let span = document.createElement("span");
            let text = document.createTextNode(el.name);
            span.appendChild(text);
            character.appendChild(span)
        })
    })
}
fetchDataCredits()
async function fetchDataVideos () {
    await fetch(`${videos}${movieId}/videos` , options).then( result => result.json())
    .then( data => {
        data.results.forEach( el => {
            videoFrame += `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${el.key}?si=COgEMzNRj8udrql9" 
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="1"></iframe>
            `
        })
        movieVideos.innerHTML = videoFrame;
    })
}
fetchDataVideos()