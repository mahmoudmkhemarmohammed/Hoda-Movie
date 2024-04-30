import { apiKey , genre , imgPath, options , popular , topRated , allTrending } from "./api.js";
let searchIcon = document.querySelector("header .container nav .search i"),
searchInput = document.querySelector("header .container nav .search input"),
iconTheme = document.querySelector("header .container nav .theme i"),
iconBars = document.querySelector("header .container nav .list"),
sidebar = document.querySelector(".home .sidebar"),
imgSlide = document.querySelector(".home .content .img-details img"),
ulGenere = document.querySelector("ul.genere"),
movieTitle = document.querySelector(".home .content .img-details .data h2"),
movieDescription = document.querySelector(".home .content .img-details .data .description"),
movieRate = document.querySelector(".home .content .img-details .data .years"),
movieStars = document.querySelector(".home .content .img-details .data .stars"),
movieCardContainer = document.querySelector(".home .content .movie-container .movie-card-container"),
movieCardContainerTrend = document.querySelector(".home .content .movie-container .movie-card-container-trend"),
movieCardContainerPopular = document.querySelector(".home .content .movie-container .movie-card-container-popular"),
movieCard = '',
movieCardTrend = '',
movieCardPopular = '',
cardSearch = '',
inputSearch = document.querySelector("header .container nav .search input"),
watchNow = document.querySelector(".home .content .img-details .data button"),
currentIndex = 0,
spanDate = document.querySelector(".copyright span"),
movieSearch = document.querySelector(".movie-search"),
dateYears = new Date().getFullYear();
spanDate.innerHTML = dateYears;
searchIcon.onclick = () => {
    setTimeout( () => {
        searchInput.style.opacity = '0';
        searchInput.classList.toggle("active");
        setTimeout( () => {
            searchInput.style.opacity = '1'
        },10)
    },0)
}
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
iconBars.onclick = () => {
    sidebar.classList.toggle("open")
}
async function fetchDataGenere () {
    fetch(genre,options).then( result => result.json()).then( data => {
        let arrayData = data.genres;
        arrayData.forEach( el => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = './pages/movie-list.html';
            let textNode = document.createTextNode(el.name);
            a.appendChild(textNode);
            li.appendChild(a);
            li.dataset.id = `with_genres=${el.id}`;
            li.dataset.name = el.name;
            ulGenere.appendChild(li)
        })
        document.querySelectorAll("ul.genere li").forEach( li => {
            li.onclick = function () {
                localStorage.setItem("Category_Id" , this.dataset.id)
                localStorage.setItem("categoryName" , this.dataset.name)
            }
        })
    })
}
fetchDataGenere();
async function fetchDataPopular () {
    fetch(popular,options).then( result => result.json())
    .then( data => {
        let arrayMovie = data.results;
        arrayMovie.forEach( el => {
            movieCardPopular += `
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
        movieCardContainerPopular.innerHTML = movieCardPopular;
        document.querySelectorAll(".home .content .movie-container .movie-card-container-popular .movie-card").forEach( el => {
            el.onclick = function () {
                localStorage.setItem("Movie_id",this.dataset.id);
                window.location.assign("pages/details.html")
            }
        })
        imgSlide.src = `${imgPath}${data.results[currentIndex].backdrop_path}`;
        movieTitle.innerHTML = data.results[currentIndex].title;
        movieDescription.innerHTML = data.results[currentIndex].overview;
        movieRate.innerHTML = data.results[currentIndex].release_date.substring(0,4);
        movieStars.innerHTML = `${data.results[currentIndex].vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
        watchNow.dataset.id = data.results[currentIndex].id;
        setInterval( () => {
            setTimeout(() => {
                imgSlide.style.opacity = `0`;
                imgSlide.style.filter = `blur(30px)`;
                setTimeout( () => {
                    imgSlide.src = `${imgPath}${data.results[currentIndex].backdrop_path}`;
                    watchNow.dataset.id = data.results[currentIndex].id;
                    movieTitle.innerHTML = data.results[currentIndex].title;
                    movieDescription.innerHTML = data.results[currentIndex].overview;
                    movieRate.innerHTML = data.results[currentIndex].release_date.substring(0,4);
                    movieStars.innerHTML = `${data.results[currentIndex].vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
                    imgSlide.style.opacity = `.7`;
                    imgSlide.style.filter = `blur(10px)`;
                    setTimeout( () => {
                        imgSlide.style.opacity = `1`;
                        imgSlide.style.filter = `blur(0px)`;
                    },50)
                },200)
            },0)
            currentIndex++;
            if(currentIndex === data.results.length - 1){
                currentIndex = 0;
            }
        },7000)
    })
}
fetchDataPopular()
async function topRatedMovie () {
    fetch(topRated,options).then( result => result.json())
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
        movieCardContainer.innerHTML = movieCard;
        document.querySelectorAll(".home .content .movie-container .movie-card-container .movie-card").forEach( el => {
            el.onclick = function () {
                localStorage.setItem("Movie_id",this.dataset.id);
                window.location.assign("pages/details.html")
            }
        })
    })
}
topRatedMovie()
async function allTrendingMovie () {
    await fetch(allTrending ,options).then( result => result.json())
    .then( data => {
        let arrayMovie = data.results;
        arrayMovie.forEach( el => {
            movieCardTrend += `
            <div class="movie-card" data-id="${el.id}">
            <div class="img">
            <img src="${imgPath}${el.poster_path}" alt="">
            </div>
            <div class="text">
            <h3 class="title">${el.title != undefined && el.title.length > 18 ? `${el.title.substring(0,17)}...` : el.title == undefined ? "...." : el.title}</h3>
            <div class="info">
            <p class="years">${el.media_type}</p>
            <p class="stars">${el.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i></p>
            </div>
            </div>
            </div>
            `
        })
        movieCardContainerTrend.innerHTML = movieCardTrend;
        document.querySelectorAll(".home .content .movie-container .movie-card-container-trend .movie-card").forEach( el => {
            el.onclick = function () {
                localStorage.setItem("Movie_id",this.dataset.id);
                window.location.assign("pages/details.html")
            }
        })
    })
}
allTrendingMovie();
watchNow.onclick = function () {
    localStorage.setItem("Movie_id" , this.dataset.id)
    window.location.assign("pages/details.html")
}
document.querySelectorAll("ul.language li").forEach( li => {
    li.onclick = function() {
        console.log(li.dataset.id , li.dataset.name)
        localStorage.setItem("Category_Id" , this.dataset.id)
        localStorage.setItem("categoryName" , this.dataset.name)
    }
})
inputSearch.onkeyup = function (event) {
    if(inputSearch.value != '') {
        document.querySelector(".home").style.display = 'none';
        movieSearch.style.display = 'flex'
        fetch(`https://api.themoviedb.org/3/search/movie?query=${event.target.value}&include_adult=false`, options).then( result => result.json())
        .then( data => {
            cardSearch = '';
            data.results.forEach( el => {
                cardSearch += `
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
            movieSearch.innerHTML = cardSearch;
            document.querySelectorAll(".movie-search .movie-card").forEach( el => {
                el.onclick = function () {
                    localStorage.setItem("Movie_id",this.dataset.id);
                    window.location.assign("pages/details.html")
                }
            })
        })
    }
    else {
        document.querySelector(".home").style.display = 'flex';
        movieSearch.style.display = 'none'
    }
}