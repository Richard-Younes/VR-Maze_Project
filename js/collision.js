/** @format */
// The following is the lives part of the code
let playerLives = 4;

const livesDisplay = document.getElementById('player-lives-display');

for (let i = 0; i < playerLives; i++) {
	livesDisplay.textContent += '❤️';
}

console.log(playerLives);

// Handle the collision
