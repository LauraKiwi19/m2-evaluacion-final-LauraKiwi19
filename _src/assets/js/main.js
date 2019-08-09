'use strict';

const button = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const favouritesList = document.querySelector('.js-favouritesList');
const searchesList = document.querySelector('.js-searchesList');

let filmsFormated = [];
let favouriteFilms = [];

function setFavouriteFilmsfromLocalStorage() {
    console.log('Hola estoy guardando tus favoritos en LocalStorage')
    console.log(favouriteFilms);
    localStorage.setItem('favouriteFilms', JSON.stringify(favouriteFilms));
};

function getFavouriteFilmsfromLocalStorage() {
    console.log('Hola estoy cogiendo tus favoritos de la última vez que estuviste aqui')
    const savedFilms = JSON.parse(localStorage.getItem('favouriteFilms'));
    if (savedFilms !== null) {
        favouriteFilms = savedFilms;
    }
}

function getFilmInfoandPrint(event) {
    event.preventDefault();
    console.log('Hola voy a empezar a buscar');
    eraseSearchedFilms();
    getDataFromServer();
}

function formatData(filmsData) {
    console.log('Hola estoy formateando los datos')
    let filmPicture = "";
    for (let filmIndex = 0; filmIndex < filmsData.length; filmIndex++) {
        if (filmsData[filmIndex].show.image === null) {
            filmPicture = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
            filmPicture = `${filmsData[filmIndex].show.image.medium}`
        }

        filmsFormated.push({
            name: filmsData[filmIndex].show.name,
            picture: filmPicture,
            id: filmsData[filmIndex].show.id,
        })
    }
    return filmsFormated;
}

function getDataFromServer() {
    console.log('Hola voy al servidor a por los datos')
    const filmWanted = input.value;
    return fetch(`http://api.tvmaze.com/search/shows?q=${filmWanted}`)
        .then(serverResponse => serverResponse.json())
        .then(serverData => {
            const filmsData = serverData;
            console.log(`Hola estoy en el servidor y te traigo ${filmWanted}`);
            formatData(filmsData);
            printFilms();
        })
}

function printFilms() {
    console.log('Hola voy a pintar las pelis')
    let htmlCode = ''
    for (const film of filmsFormated) {
        htmlCode += `<li class="search_film js-searchedFilm" data-index="${film.id}">`
        htmlCode += `<img src="${film.picture}" alt="${film.name}">`
        htmlCode += `<h3 class="js-favouriteTitle"> ${film.name}</h3>`
        htmlCode += '</li>'
    }
    searchesList.innerHTML = htmlCode;
    listenToSearchedFilms()
}

function eraseSearchedFilms() {
    console.log('Hola estoy borrando las búsquedas');
    filmsFormated = [];
}

function changeFavourites(event) {
    const selectedFilm = event.currentTarget;
    const filmId = parseInt(selectedFilm.dataset.index)
    console.log(`Hola voy a añadir tus favorias al array`)
    selectedFilm.classList.toggle('selected');
    for (let i = 0; i < filmsFormated.length; i++) {
        if (filmsFormated[i].id === filmId && !favouriteFilms.includes(filmsFormated[i])) {
            favouriteFilms.push(filmsFormated[i])
        }
    }
    printFavourites();
    setFavouriteFilmsfromLocalStorage(favouriteFilms);
}

function listenToSearchedFilms() {
    console.log("Hola voy a escuchar a ver si hacéis click")
    const filmsShowed = document.querySelectorAll('.js-searchedFilm');
    for (const film of filmsShowed) {
        film.addEventListener('click', changeFavourites);
    }
}

function printFavourites() {
    console.log('Hola voy a pintar tus favoritas')
    let htmlCode = ""
    for (const film of favouriteFilms) {
        htmlCode += `<li class="favourite_item js-favouritedFilm" data-index="${film.id}">`
        htmlCode += `<div class="favourite_item_container"><img class="favourite_img" src="${film.picture}" alt="${film.name}">`
        htmlCode += `<h3 class="favourite_title"> ${film.name}</h3></div>`
        htmlCode += '<button class="js-delete delete_favourite">x</button>'
        htmlCode += '</li>'
    }
    favouritesList.innerHTML = htmlCode;
    listenToFavouriteFilms();
}

function deleteFavouritedFilms(event) {
    const notFavouriteFilm = event.currentTarget;
    console.log('Hola voy a borrar tu peli de favoritas')
    const notFavouriteId = parseInt(notFavouriteFilm.dataset.index);
    for (let i = 0; i < favouriteFilms.length; i++) {
        if (favouriteFilms[i].id === notFavouriteId) {
            favouriteFilms.splice(i, 1);
        }
    }
    printFavourites();
    setFavouriteFilmsfromLocalStorage();
}

function listenToFavouriteFilms() {
    console.log("Hola voy a escuchar tus favoritos por si quieres borrarlos")
    const favouritedFilms = document.querySelectorAll('.js-favouritedFilm');
    for (const film of favouritedFilms) {
        film.addEventListener('click', deleteFavouritedFilms);
    }
}

getFavouriteFilmsfromLocalStorage();
printFavourites();

button.addEventListener('click', getFilmInfoandPrint)
