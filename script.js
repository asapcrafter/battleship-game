const Ship = function Ship(length, ...coords) {
    let health = length;
    const getHealth = () => health;
    //Set location property 
    // let location = []
    // coords.forEach(e => {
        //      location.push(e = Location(e))
        // })
        
        
        // const addLocation = (Ship, coords) => {
            //     Ship.coords = 1
            // }
            
            
            const isSunk = () => {
                if (health === 0) console.log("Ship is sunk"); 
                return (health === 0);  
            };
            const hit = () => health-- ;
            return {getHealth, isSunk, hit, location, coords};
        }
        
const addLocation = function addLocation(ship, ...coords) {
    const Location = function Location(coord) {
        const location = coord;
        status = 1;
        return {status, location}
    }
    coords.forEach(e => {
        ship.e = Location(e)
    })
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

shipTest = addLocation(Ship(2), 'A1', 'A2')
console.log(shipTest)

console.log(shipOne.location[1].location)

