/** @format */
'Use strict';

// timer

let counterValue = 0;
const counterDisplay = document.getElementById('counterDisplay');
let arrived = true;
function updateCounter() {
	if (!arrived) {
		counterValue++;
		counterDisplay.textContent = 'Time: ' + counterValue;

		// Check if you've reached the end of the map, and clear the interval if necessary
		if (counterValue >= mapEnd) {
			clearInterval(intervalId);
		}
	}
}

function resetCounter() {
	counterValue = 0;
	counterDisplay.textContent = 'Time: ' + counterValue;
}

// Set the interval to update the counter every second (1000 milliseconds)

// Set the end of the map value (change this to your actual end value)
const mapEnd = Infinity; // Replace 10 with your actual end value
window.intervalId = setInterval(updateCounter, 1000);

// The following is the lives part of the code
let playerLives = 4;

console.log(document);
let livesDisplay = document.getElementById('player-lives-display');

for (let i = 0; i < playerLives; i++) {
	livesDisplay.textContent += '❤️';
}

console.log(playerLives);

// *********************Handle the collision**********************************//

// Get the player entity by its ID
const player = document.getElementById('player');
const beginPosition = { x: 5, y: 2.1, z: 10 }; // Set the new position values
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

// Collision with the new game image

const newGameImg = document.querySelector('.new-game-img');
const newGame = document.getElementById('new-game');
console.log(newGame);
function checkCollisionNewGame() {
	const playerPosition = player.getAttribute('position');
	const imgCollision = newGameImg.getAttribute('position');

	if (playerPosition.z - imgCollision.z <= 1.5 && playerPosition.y > 35) {
		player.setAttribute('position', { x: 5, y: 30, z: 9 });
		arrived = false;
		newGame.setAttribute('visible', false);
	}
}
setInterval(checkCollisionNewGame, 100); // Adjust the interval as needed

// Winnig condition
// Collision With the trophy

const trophy = document.querySelector('.trophy');
const trophyPosition = trophy.getAttribute('position');
const highscoreDisplay = document.getElementById('highscore');
let fireworks = document.querySelector('#fireworks');
let launchSound = document.querySelector('#launch');
let burstSounds = [document.querySelector('#burst1'), document.querySelector('#burst2'), document.querySelector('#burst3')];
let highscore = 9999999;
let gameWon = false;
function winGame() {
	let playerPosition = player.getAttribute('position');
	if (Math.abs(playerPosition.x - trophyPosition.x) <= 1 && Math.abs(playerPosition.z - trophyPosition.z) <= 1) {
		console.log('WIIIIIIIIIIIIIIIIIIIIIIIIIINNNNNNNNNNNNNNNNNNNNNNNNNNN');
		arrived = true;
		gameWon = true;

		if (highscore > counterValue) {
			highscore = counterValue;
			console.log(highscore);
		}
		highscoreDisplay.textContent = 'Highscore: ' + highscore;

		// Fireworks

		launchSound.play();
		let burstSound = burstSounds[Math.floor(Math.random() * burstSounds.length)];
		burstSound.play();

		setTimeout(gameReset, 20000);
	}
}
// function animateFireworks() {
// 	fireworks.setAttribute("particle-system", "preset: star; color: #FF0000, #FFFF00; particleCount: 10; size: 0.1; maxAge: 1");
// 	requestAnimationFrame(animateFireworks);
// }

// Reset the game

function gameReset() {
	player.setAttribute('position', { x: 5, y: 38, z: 13 });
	newGame.setAttribute('visible', true);
	counterValue = 0;
	counterDisplay.textContent = 'Time: ' + counterValue;
}

// Set up the interval
setInterval(winGame, 100);
