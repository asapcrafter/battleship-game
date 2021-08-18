import {Ship, Gameboard, renderCoords} from './objects.js'

const coordGrid = renderCoords();

const loadGrid = function loadGameBoardGrid() {
    for (let i = 0 ; i < coordGrid.length; i++) {
        const coordInfo = coordGrid[i];
        const gridContainer = document.querySelector('#player-board');
        //Creates each grid item to have a coord value
        const newDiv = document.createElement('div');
            newDiv.setAttribute('id', `${coordInfo}`);
            newDiv.setAttribute('class', 'board-item');
            newDiv.innerHTML = coordInfo;
            gridContainer.appendChild(newDiv);
    };
}

document.onload = loadGrid();