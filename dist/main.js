/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects.js */ \"./src/objects.js\");\n\n\nconst coordArray = (0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.renderCoords)();\n\nconst loadGrid = function loadGameBoardGrid(gameboard, team) {\n    let gridContainer; //Targets the correct gameboard display\n    for (let i = 0 ; i < coordArray.length; i++) {\n        const coordInfo = coordArray[i];\n        if (team === 'player') {\n            gridContainer = document.querySelector('#player-board');\n        } else {\n            gridContainer = document.querySelector('#enemy-board');\n        };    \n        //Creates each grid item and sets their properties\n        const newDiv = document.createElement('div');\n        newDiv.setAttribute('coord', `${coordInfo}`);\n        newDiv.setAttribute('class', 'board-item');\n        newDiv.setAttribute('status', 'empty');\n        newDiv.innerHTML = coordInfo;\n        addClickEvent(newDiv, gameboard);\n        gridContainer.appendChild(newDiv);\n    };\n    renderShips(gridContainer, gameboard)\n}\n\nfunction renderShips(gridContainer, gameboard) {\n    gridContainer.childNodes.forEach(e => {\n        const coordInfo = e.getAttribute('coord');\n        if (gameboard.checkIfValidCoord(coordInfo)) {\n            e.style.backgroundColor = 'var(--lapis)';\n            e.setAttribute('status', 'occupied');\n        }\n    });\n}\n\nfunction addClickEvent(e, gameboard) {\n    e.addEventListener('click', e => {\n        //Disallows choosing the same coord more than once\n        if (e.target.getAttribute('status') !== 'empty') return; \n        const coordInput = e.target.getAttribute('coord');\n        const targetBoard = e.target.parentNode.id;\n        playRound(targetBoard, coordInput, e, gameboard);\n    });\n}\n\n//Main game loop\nlet currentTurn = 'player';\nconst enemyBoard = (0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\nconst playerBoard = (0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\nenemyBoard.makeShip(3, '1a', '2a', '3a' )\nplayerBoard.makeShip(5, '1c', '2c', '3c' )\n\ndocument.onload = loadGrid(enemyBoard, 'player');\ndocument.onload = loadGrid(playerBoard , 'enemy');\n\nfunction playRound(targetBoard, coordInput, e, gameboard) {\n    //Checks if the player is targetting the correct gameboard\n    if (currentTurn === 'player' && targetBoard === 'player-board') return;\n    if (currentTurn === 'enemey' && targetBoard === 'enemy board') return;\n    if (currentTurn === 'player') {\n        const attackResult = gameboard.receiveAttack(coordInput);\n        if (attackResult === 'missed') {\n            e.target.setAttribute('status', 'missed');\n        } else if (attackResult === 'hit') {\n            e.target.setAttribute('status', 'hit')\n        } \n        updateDisplay();\n        currentTurn === 'enemy';\n    }\n}\n\n\n//Changes color if a coordinate is 'hit' or 'missed'\nfunction updateDisplay() {\n   document.querySelectorAll('.board-item').forEach(e => {\n       const status = e.getAttribute('status');\n       if (status === 'hit') {\n            e.style.backgroundColor = 'var(--peach)';\n       } else if (status === 'missed') {\n            e.style.backgroundColor = 'var(--gray)';\n       } else if (status === 'occupied') {\n            e.style.backgroundColor = 'var(--lapis)';\n       }\n   }) \n}\n\n//# sourceURL=webpack://battleship-game/./src/index.js?");

/***/ }),

/***/ "./src/objects.js":
/*!************************!*\
  !*** ./src/objects.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship),\n/* harmony export */   \"Gameboard\": () => (/* binding */ Gameboard),\n/* harmony export */   \"renderCoords\": () => (/* binding */ renderCoords),\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n\n\nconst Ship = function Ship(length, ...coords) {\n    const Location = function Location(coord) {\n        const area = coord;\n        let status = 1; //Status: (Alive = 1, Dead = 0)\n        return {area, status};\n    };\n\n    let location = [];\n        coords.forEach(e => location.push(e = Location(e)));\n\n    const hit = (coord) => {\n        if (coords.find(e => e === coord) == undefined) return;\n        let hitArea = location.filter(e => e.area == coord);\n        hitArea[0].status = 0;\n    };\n\n    //Checks for Ship's overall health\n    const getHealth = () => {\n        let health = [];\n        location.forEach(e => health.push(e.status));\n        health = health.reduce((sum, amount) => sum + amount);\n        return health;\n    };\n    //Checks for Ship's individual area health\n    const getStatus = (coord) => {\n        const area = location.filter(e => e.area == coord);\n        console.log(`${area[0].area}'s health is ${area[0].status}`);\n        return area[0].status;\n    }; \n    const isSunk = () => {\n        if (getHealth() === 0) console.log(\"Ship is sunk\");\n        return (getHealth() === 0);  \n    };\n\n    return {getHealth, getStatus, isSunk, hit, location, coords};\n} \n\nconst Gameboard = function Gameboard() {\n    let totalShips = []; //stores all Ship objects \n\n    const makeShip = (length, ...coords) => {\n        const newShip = Ship(length, ...coords);\n        totalShips.push(newShip);\n    };\n\n    //Checks if a grid coordinate contains a Ship (used in receiveAttack)\n    const getValidCoords = () => { \n        let validCoords = []; \n        totalShips.forEach(e => validCoords.push(e.coords));\n        validCoords = validCoords.flat();\n        return validCoords;\n    };\n    //Returns 'true' if the coord matches\n    const checkIfValidCoord = (coord) => {\n        const coordArray = getValidCoords();\n        const matchingCoord = coordArray.find(e => e == coord)\n        return (matchingCoord !== undefined) \n    };\n\n    let missedCoords = []; //stores all missed shots\n    let hitCoords = []; //stores all successful shots\n\n    const receiveAttack = (coord) => {\n        if (checkIfValidCoord(coord) === false) {\n            missedCoords.push(coord);\n            console.log(\"Missed hit\")\n            return 'missed';\n        };\n        if (hitCoords.find(e => e == coord) !== undefined) {\n            console.log(\"Already hit\")\n            return 'invalid';\n        };\n        let matchingShip = totalShips.find(e => {\n            return e.coords.includes(coord);\n        });\n        matchingShip.hit(coord);\n        matchingShip.isSunk();\n        hitCoords.push(coord);\n        console.log('Ship was hit')\n        return 'hit';\n    };\n\n    const checkFleetHP = () => {\n        let fleetHealth = [];\n        totalShips.forEach(e => fleetHealth.push(e.getHealth()));\n        fleetHealth = fleetHealth.flat();\n        fleetHealth = fleetHealth.reduce((sum, amount) => sum + amount);\n        return fleetHealth;\n    };\n    const checkFleetSunk = () => {\n        return checkFleetHP() === 0;\n    };\n\n    return {totalShips, makeShip, getValidCoords, checkIfValidCoord, receiveAttack, checkFleetHP, checkFleetSunk};\n}\n\n//Generates all possible coordinates in a 10x10 \nconst renderCoords = function renderCoordinates() {\n    let coordArray = [];\n    for (let i = 0; i < 10; i++) {\n        let x = i + 1;\n        for (let j = 0; j < 10; j++) {\n            let y = (j+10).toString(36)\n            let coord = `${x}${y}`;\n            coordArray.push(coord);\n        };\n    };\n    return coordArray;\n}\n\nconst Player = function Player() {\n    const attackGameBoard = (gameboard, coord) => {\n        gameboard.receiveAttack(coord);\n    };\n    //Returns a random coord for Computer-AI to attack with\n    const getRandomCoord = () => {\n        const coordArray = renderCoords()\n        const randomCoord = coordArray[Math.floor(Math.random() * coordArray.length)];\n        return randomCoord;\n    };\n\n    return {getRandomCoord, attackGameBoard}\n}\n\n\n// const testBoard = Gameboard()\n// testBoard.makeShip(2, 'A1', 'B2', 'A3' )\n// testBoard.makeShip(5, 'C1', 'C2', 'C3' )\n// // console.log(testBoard.getValidCoords())\n\n// console.log(testBoard.receiveAttack('A1'))\n// console.log(testBoard.totalShips)\n// // console.log(testBoard.totalShips[0].coords.includes('A1'))\n\n// const newPlayer = Player();\n// console.log(newPlayer.getRandomCoord())\n\n\n\n\n\n\n\n//# sourceURL=webpack://battleship-game/./src/objects.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;