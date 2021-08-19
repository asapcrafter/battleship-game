import {Gameboard, renderCoords} from './objects.js'

const coordArray = renderCoords();

const loadGrid = function loadGameBoardGrid(gameboard, team) {
    for (let i = 0 ; i < coordArray.length; i++) {
        const coordInfo = coordArray[i];
        let gridContainer;
        if (team === 'player') {
            gridContainer = document.querySelector('#player-board');
        } else {
            gridContainer = document.querySelector('#enemy-board');
        };    
        //Creates each grid item and sets their properties
        const newDiv = document.createElement('div');
        newDiv.setAttribute('coord', `${coordInfo}`);
        newDiv.setAttribute('class', 'board-item');
        newDiv.setAttribute('status', 'empty');
        newDiv.innerHTML = coordInfo;
        addClickEvent(newDiv);
        gridContainer.appendChild(newDiv);
    };
}

document.onload = loadGrid( 0 , 'player');
document.onload = loadGrid (0 , 'enemy');

//Main game loop
let currentTurn = 'player';
const enemeyBoard = Gameboard();
const playerBoard = Gameboard();
enemeyBoard.makeShip(3, 'A1', 'B2', 'A3' )
playerBoard.makeShip(5, 'C1', 'C2', 'C3' )

function playRound(targetBoard, coordInput, e) {
    //Checks if the player is targetting the correct gameboard
    if (currentTurn === 'player' && targetBoard === 'player-board') return;
    if (currentTurn === 'enemey' && targetBoard === 'enemy board') return;
    if (currentTurn === 'player') {
        const attackResult = enemeyBoard.receiveAttack(coordInput);
    }
}

function addClickEvent(e) {
    e.addEventListener('click'), e => {
        const coordInput = e.target.getAttribute('coord');
        const targetBoard = e.target.parentNode.id;
        playRound(targetBoard, coordInput, e);
    }
}