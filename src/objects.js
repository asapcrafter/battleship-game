export {Ship, Gameboard, renderCoords}

const Ship = function Ship(length, ...coords) {
    const Location = function Location(coord) {
        const area = coord;
        let status = 1; //Status: (Alive = 1, Dead = 0)
        return {area, status};
    };

    let location = [];
        coords.forEach(e => location.push(e = Location(e)));

    const hit = (coord) => {
        if (coords.find(e => e === coord) == undefined) return;
        let hitArea = location.filter(e => e.area == coord);
        hitArea[0].status = 0;
    };

    //Checks for Ship's overall health
    const getHealth = () => {
        let health = [];
        location.forEach(e => health.push(e.status));
        health = health.reduce((sum, amount) => sum + amount);
        return health;
    };
    //Checks for Ship's individual area health
    const getStatus = (coord) => {
        const area = location.filter(e => e.area == coord);
        console.log(`${area[0].area}'s health is ${area[0].status}`);
        return area[0].status;
    }; 
    const isSunk = () => {
        if (getHealth() === 0) console.log("Ship is sunk");
        return (getHealth() === 0);  
    };

    return {getHealth, getStatus, isSunk, hit, location, coords};
} 

const Gameboard = function Gameboard() {
    let totalShips = []; //stores all Ship objects 

    const makeShip = (length, ...coords) => {
        const newShip = Ship(length, ...coords);
        totalShips.push(newShip);
    };

    //Checks if a grid coordinate contains a Ship
    const getValidCoords = () => { 
        let validCoords = []; 
        totalShips.forEach(e => validCoords.push(e.coords));
        validCoords = validCoords.flat();
        return validCoords;
    };
    const checkIfValidCoord = (coord) => {
        const coordArray = getValidCoords();
        const matchingCoord = coordArray.find(e => e == coord)
        return (matchingCoord !== undefined) 
    };

    let missedCoords = []; //stores all missed shots
    let hitCoords = []; //stores all successful shots

    const receiveAttack = (coord) => {
        if (checkIfValidCoord(coord) === false) {
            missedCoords.push(coord);
            console.log("Missed hit")
            return;
        };
        if (hitCoords.find(e => e == coord) !== undefined) {
            console.log("Already hit")
            return "invalid";
        };
        const matchingShip = totalShips.find(e => {
            return e.coords.includes(coord);
        });
        matchingShip.hit(coord);
        hitCoords.push(coord);
    };

    const checkFleetHP = () => {
        let fleetHealth = [];
        totalShips.forEach(e => fleetHealth.push(e.getHealth()));
        fleetHealth = fleetHealth.flat();
        fleetHealth = fleetHealth.reduce((sum, amount) => sum + amount);
        return fleetHealth;
    };
    const checkFleetSunk = () => {
        return checkFleetHP() === 0;
    };

    return {totalShips, makeShip, getValidCoords, checkIfValidCoord, receiveAttack, checkFleetHP, checkFleetSunk};
}

//Generates all possible coordinates in a 10x10 
const renderCoords = function renderCoordinates() {
    let coordArray = [];
    for (let i = 0; i < 10; i++) {
        let x = i + 1;
        for (let j = 0; j < 10; j++) {
            let y = (j+10).toString(36)
            let coord = `${x}${y}`;
            coordArray.push(coord);
        };
    };
    return coordArray;
}

const Player = function Player() {

    const attackGameBoard = (gameboard, coord) => {
        gameboard.receiveAttack(coord);
    };

    const getRandomCoord = () => {
        const coordArray = renderCoords()
        const randomCoord = coordArray[Math.floor(Math.random() * coordArray.length)];
        return randomCoord;
    };

    return {getRandomCoord, attackGameBoard}
}


const testBoard = Gameboard()
testBoard.makeShip(2, 'A1', 'B2', 'A3' )
testBoard.makeShip(5, 'C1', 'C2', 'C3' )
// console.log(testBoard.getValidCoords())

// console.log(testBoard.receiveAttack('A1'))
// console.log(testBoard.totalShips)
// // console.log(testBoard.totalShips[0].coords.includes('A1'))

// const newPlayer = Player();
// console.log(newPlayer.getRandomCoord())





