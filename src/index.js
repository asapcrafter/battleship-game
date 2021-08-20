import {Gameboard, renderCoords} from './objects.js'

const coordArray = renderCoords();

const loadGrid = function loadGameBoardGrid(gameboard, team) {
    let gridContainer; //Targets the correct gameboard display
    for (let i = 0 ; i < coordArray.length; i++) {
        const coordInfo = coordArray[i];
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
        addClickEvent(newDiv, gameboard);
        gridContainer.appendChild(newDiv);
    };
    renderShips(gridContainer, gameboard)
}

function renderShips(gridContainer, gameboard) {
    gridContainer.childNodes.forEach(e => {
        const coordInfo = e.getAttribute('coord');
        if (gameboard.checkIfValidCoord(coordInfo)) {
            e.style.backgroundColor = 'var(--lapis)';
            e.setAttribute('status', 'occupied');
        }
    });
}

function addClickEvent(e, gameboard) {
    e.addEventListener('click', e => {
        //Disallows choosing the same coord more than once
        if (e.target.getAttribute('status') !== 'empty') return; 
        const coordInput = e.target.getAttribute('coord');
        const targetBoard = e.target.parentNode.id;
        playRound(targetBoard, coordInput, e, gameboard);
    });
}

//Main game loop
let currentTurn = 'player';
const enemyBoard = Gameboard();
const playerBoard = Gameboard();
enemyBoard.makeShip(3, '1a', '2a', '3a' )
playerBoard.makeShip(5, '1c', '2c', '3c' )

document.onload = loadGrid(enemyBoard, 'player');
document.onload = loadGrid(playerBoard , 'enemy');

function playRound(targetBoard, coordInput, e, gameboard) {
    //Checks if the player is targetting the correct gameboard
    if (currentTurn === 'player' && targetBoard === 'player-board') return;
    if (currentTurn === 'enemey' && targetBoard === 'enemy board') return;
    if (currentTurn === 'player') {
        const attackResult = gameboard.receiveAttack(coordInput);
        if (attackResult === 'missed') {
            e.target.setAttribute('status', 'missed');
        } else if (attackResult === 'hit') {
            e.target.setAttribute('status', 'hit')
        } 
        updateDisplay();
        currentTurn === 'enemy';
    }
}


//Changes color if a coordinate is 'hit' or 'missed'
function updateDisplay() {
   document.querySelectorAll('.board-item').forEach(e => {
       const status = e.getAttribute('status');
       if (status === 'hit') {
            e.style.backgroundColor = 'var(--peach)';
       } else if (status === 'missed') {
            e.style.backgroundColor = 'var(--gray)';
       } else if (status === 'occupied') {
            e.style.backgroundColor = 'var(--lapis)';
       }
   }) 
}