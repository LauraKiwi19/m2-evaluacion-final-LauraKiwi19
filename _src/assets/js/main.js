'use strict';

const button = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const favouritesList = document.querySelector('.js-favouritesList');
const searchesList = document.querySelector('.js-searchesList');

let filmsFormated = [];
let favouriteFilms = [];
console.log(favouriteFilms)

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
        htmlCode += `<h3> ${film.name}</h3>`
        htmlCode += '</li>'
        // filmsShowed.push(film);
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
    console.log(`Hola ¿le has dado a la peli ${selectedFilm}`)
    console.log(selectedFilm)
    selectedFilm.classList.toggle('selected');
    if (selectedFilm.classList.contains('selected')) {
        console.log(`Estoy guardando ${selectedFilm} en favoritos`)
        favouriteFilms.push(selectedFilm)
    }
    for (let favouriteIndex = 0; favouriteIndex < favouriteFilms.length; favouriteIndex++) {
        if (!favouriteFilms[favouriteIndex].classList.contains('selected')) {
            favouriteFilms.splice(favouriteIndex, 1);
        }
    }
    console.log(`Tus pelis favoritas son: ${favouriteFilms.length}`)
    printFavourites()
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
    for (const film of favouriteFilms) {
        favouritesList.appendChild(film);
    }
}

button.addEventListener('click', getFilmInfoandPrint)
