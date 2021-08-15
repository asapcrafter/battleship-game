const Ship = function Ship(length) {
    let health = length;
    const getHealth = () => health;
    const isSunk = () => {
        if (health === 0) console.log("Ship is sunk"); 
        return (health === 0);  
    };
    const hit = () => health--;
    return {getHealth, isSunk, hit};
}

const Gameboard = function Gameboard() {
    const receiveAttack = () => {

    }
}

const renderCoords = function renderCoordinates() {
    for (i = 0; i < 10; i++) {
        let x = i + 1;
        let y = (i+10).string(36)
        coord = `${x}${y}`;
        return coord;
    }
}


//Debug area
const shipOne = Ship(2)
 
console.log(shipOne.isSunk())
