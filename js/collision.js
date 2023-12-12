/** @format */
'Use strict';
// The following is the lives part of the code
let playerLives = 4;

const livesDisplay = document.getElementById('player-lives-display');

for (let i = 0; i < playerLives; i++) {
	livesDisplay.textContent += '❤️';
}

console.log(playerLives);

// Handle the collision

// Get the player entity by its ID
const player = document.getElementById('player');
const beginPosition = { x: 5, y: 4, z: 15 }; // Set the new position values
// Get the ghost entity by its ID
const ghost = document.querySelector('.ghost');

const margin = 0.5;

function checkCollision() {
	// Get the position of the player entity
	const playerPosition = player.getAttribute('position');

	// Get the position of the ghost entity
	const ghostPosition = ghost.getAttribute('position');

	if (playerLives > 0) {
		if (Math.abs(playerPosition.x - ghostPosition.x) <= margin && Math.abs(playerPosition.z - ghostPosition.z) <= margin) {
			// Log the player position
			console.log('Player Position:', playerPosition);

			// Log the ghost position
			console.log('Ghost Position:', ghostPosition);

			console.log('Collision');
			playerLives = playerLives - 1;
			livesDisplay.textContent = '';
			for (let i = 0; i < playerLives; i++) {
				livesDisplay.textContent += '❤️';
			}
			console.log(playerLives);
			player.setAttribute('position', beginPosition);
		}
	} else {
		console.log('You Lost');
	}
}

const collisionCheckInterval = setInterval(checkCollision, 100);
