'use strict';

const button = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const favouritesList = document.querySelector('.js-favouritesList');
const searchesList = document.querySelector('.js-searchesList');

const filmsFormated = [];

function getFilmInfoandPrint(event) {
    event.preventDefault();
    console.log('Hola voy a empezar a buscar');
    getDataFromServer();
}



function formatData(filmsData) {
    console.log('Hola estoy formateando')
    let picture = "";
    for (let filmIndex = 0; filmIndex < filmsData.length; filmIndex++) {
        if (filmsData[filmIndex].show.image === null) {
            picture = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
            picture = `${filmsData[filmIndex].show.image.medium}`
        }

        filmsFormated.push({
            name: filmsData[filmIndex].show.name,
            picture: picture,
            id: filmsData[filmIndex].show.id,
        })
    }
    console.log(filmsFormated[1])
    return filmsFormated;
}



function getDataFromServer() {
    console.log('Hola voy al servidor')
    const filmWanted = input.value;
    return fetch(`http://api.tvmaze.com/search/shows?q=${filmWanted}`)
        .then(serverResponse => serverResponse.json())
        .then(serverData => {
            const filmsData = serverData;
            console.log(`Hola estoy en el servidor y te traigo ${filmWanted}`);
            console.log(filmsData);
            formatData(filmsData);
            printFilms();
        })

}

function printFilms() {
    debugger;
    console.log('Hola voy a pintar las pelis')
    let htmlCode = ''
    for (const film of filmsFormated) {
        htmlCode += '<li class="searches-film js-searchedFilm">'
        htmlCode += `<img src="${film.picture}" alt="${film.name}">`
        htmlCode += `<h3> ${film.name}</h3>`
        htmlCode += '</li>'
    }
    searchesList.innerHTML = htmlCode;
}




/*         if (film.picture === null) {
            htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${film.name}"`
        } else {
            htmlCode += `<img src="${film.picture}" alt="${film.name}>`
        } */

button.addEventListener('click', getFilmInfoandPrint)