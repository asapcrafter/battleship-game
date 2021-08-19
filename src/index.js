import {Ship, Gameboard, renderCoords} from './objects.js'

const coordArray = renderCoords();
let coordInput 

const loadGrid = function loadGameBoardGrid(gameboard, team) {
    for (let i = 0 ; i < coordArray.length; i++) {
        const coordInfo = coordArray[i];
        let gridContainer;
        if (team === 'player') {
            gridContainer = document.querySelector('#player-board');
        } else {
            gridContainer = document.querySelector('#enemy-board');
        };
        //Sets coord value when a grid item is clicked on
        const returnCoord = function returnCoordOnClick(e) {
            e.addEventListener('click', e => {
                coordInput = e.target.getAttribute('coord');
                console.log(coordInput);
            });
        };
        //Creates each grid item and sets their properties
        const newDiv = document.createElement('div');
        newDiv.setAttribute('coord', `${coordInfo}`);
        newDiv.setAttribute('class', 'board-item');
        newDiv.innerHTML = coordInfo;
        returnCoord(newDiv);
        gridContainer.appendChild(newDiv);
    };
}

document.onload = loadGrid( 0 , 'player');
document.onload = loadGrid (0 , 'enemy')