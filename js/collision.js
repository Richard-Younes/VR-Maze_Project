/** @format */
'Use strict';

// The following is the lives part of the code
let playerLives = 4;

const livesDisplay = document.getElementById('player-lives-display');

for (let i = 0; i < playerLives; i++) {
	livesDisplay.textContent += '❤️';
}

console.log(playerLives);

// *********************Handle the collision**********************************//

// Get the player entity by its ID
const player = document.getElementById('player');
const beginPosition = { x: 5, y: 4, z: 10 }; // Set the new position values
const ghosts = document.querySelectorAll('.ghost'); // Get all entities with the class 'ghost'

const margin = 0.8;

function checkCollision() {
	// Get the position of the player entity
	const playerPosition = player.getAttribute('position');

	// Iterate through all entities with the class 'ghost'
	ghosts.forEach((ghost) => {
		// Get the position of the current ghost entity
		const ghostPosition = ghost.getAttribute('position');

		if (playerLives > 0) {
			// Check for collision with the current ghost
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
			showGameOverScreen();
		}
	});
}

// Call the checkCollision function, for example, in your game loop
setInterval(checkCollision, 100); // Adjust the interval as needed

function showGameOverScreen() {
	document.querySelector('.game-container').style.display = 'none';
	document.querySelector('.game-over').style.display = 'block';
}
