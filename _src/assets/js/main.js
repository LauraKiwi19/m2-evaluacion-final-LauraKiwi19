'use strict';

const button = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const favouritesList = document.querySelector('.js-favouritesList');
const searchesContainer = document.querySelector('.js-searchesDiv');

function getFilmInfo(event) {
    event.preventDefault();
    console.log('Hola estoy buscando algo');

    getDataFromServer();
    formatData(serverData)

}


function getDataFromServer() {
    const filmWanted = input.value;
    const url = 'http://api.tvmaze.com/search/shows?q='
    fetch(url + `${filmWanted}`)
        .then(serverResponse => serverResponse.json())
        .then(serverData => {
            console.log(`Hola estoy en el servidor y vengo a traerte a ${filmWanted}`);
            console.log(serverData);
        })
    return serverData
}

function formatData(serverData) {
    const filmsFormated = []
    const filmsCharacteristics = serverData.show;
    for (const characteristic of filmsCharacteristics) {
        debugger
        filmsFormated.push({
            name: characteristic.name,
            image: characteristic.image
        }
        )
    }

}

button.addEventListener('click', getFilmInfo)