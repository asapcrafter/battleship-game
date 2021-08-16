const Ship = function Ship(length, ...coords) {
    //Set location object property
    let location = [];
    const Location = function Location(coord) {
        const area = coord;
        let status = 1;
        return {area, status}
    };
    coords.forEach(e => location.push(e = Location(e)));
    const getHealth = () => {
        let health = []
        location.forEach(e => health.push(e.status));
        health = health.reduce((sum, amount) => sum + amount);
        return health;
    };
    const isSunk = () => {
        if (getHealth() === 0) console.log("Ship is sunk"); 
        return (getHealth() === 0);  
    };
    const hit = (coord) => {
        matchedArea = location.filter(e => e.area == coord);
        matchedArea[0].status = 0;
    } ;
    return {getHealth, isSunk, hit, location, coords};
}
        

const Gameboard = function Gameboard() {
    let totalShips = []; //stores all Ship objects

    const receiveAttack = (coord) => {
        if (Ship.status === 0) {
            //already hit
        }
        else if (coord === Ship.getLocation()) {
            Ship.hit()
            //successful hit
        } else {
            //missed 
        }
    }
}

//Generates all possible coordinates in a 10x10 
const renderCoords = function renderCoordinates() {
    let coordArray = [];
    for (i = 0; i < 10; i++) {
        let x = i + 1;
        for (j = 0; j < 10; j++) {
            let y = (j+10).toString(36)
            coord = `${x}${y}`;
            coordArray.push(coord);
        };
    };
    return coordArray;
}

//Debug area
const shipOne = Ship(2, 'A1', 'B2', 'A3')
 console.log(shipOne)


shipOne.hit('A1')
shipOne.hit('A3')
console.log(shipOne.location)
console.log(shipOne.getHealth())

