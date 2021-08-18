import {Ship, Gameboard, renderCoords} from './objects.js'

const coordGrid = renderCoords();
let coordInput 

const loadGrid = function loadGameBoardGrid() {
    for (let i = 0 ; i < coordGrid.length; i++) {
        const coordInfo = coordGrid[i];
        const gridContainer = document.querySelector('#player-board');
        //Creates each grid item to have a coord value
        const newDiv = document.createElement('div');
            newDiv.setAttribute('coord', `${coordInfo}`);
            newDiv.setAttribute('class', 'board-item');
            newDiv.innerHTML = coordInfo;
            returnCoord(newDiv);
            gridContainer.appendChild(newDiv);
    };
}

const returnCoord = function returnCoordOnClick(e) {
    e.addEventListener('click', e => {
        coordInput = e.target.getAttribute('coord')
        console.log(coordInput)
    });
}

document.onload = loadGrid();