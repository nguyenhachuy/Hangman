var buttons = document.getElementsByClassName("input-button");
var dict = [
	"Uncle Steve",
	"Cousin Nicky",
	"Beauregard",
	"Frankenstein",
	"Sleepy Gary",
	"Photography Raptor",
	"Pencilvestyr",
	"Tinkles",
	"Hamurai",
	"Amish Cyborg",
	"Reverse Giraffe",
	"Ghost in a Jar",
	"Baby Wizard",
	"Duck With Muscles"
];
/* Setting up stuffs */

// document.getElementById("play-button").addEventListener("click", prepWord);


 window.onload = function() {
	$('#welcome-modal').modal(show = true);
 }
/* Code body */

// function checkUserGuess() {
// 	var guess = this.innerHTML;
// 	console.log(guess);
// 	var result = false;
// 	if(wordArray.includes(guess)) {
// 		result = true;
// 		updateGuessUI(guess);
// 		document.getElementById("guessRow").innerHTML = updateGuessWord();
// 	}
// 	else
// 		updateHangmanUI();

// 	updateButtonUI(guess, result);
// 	updateGameStatus();
// }


// function prepWord() {

// 	//console.log("prepWord");
// 	wordArray = word.split("");
// 	guessArray = new Array(wordArray.length);
// 	guessArray.fill(false);
// 	for(var i = 0; i < guessArray.length; i++) {
// 		if(wordArray[i] === "-") {
// 			guessArray[i] = true;
// 		}
// 	}

// 	document.getElementById("guessRow").innerHTML = makeDashes(word);

// }

// function makeDashes(word, filler) {
// 	var result = [];

// 	for(var i = 0; i < word.length; i++) {
// 		if(word[i] === "-")
// 			result.push("-");
// 		else result.push("_");
// 	}

// 	return result.join(" ");
// }

// function updateGuessWord() {
// 	var result = [];

// 	for(var i = 0; i < word.length; i++) {
// 		if(guessArray[i] === true)
// 			result.push(wordArray[i]);
// 		else result.push("_");
// 	}
// 	console.log(result);

// 	return result.join(" ");

// }

function updateButtonUI(button, status) {
	var update;
	if(status) {
		var update = ` correct`;
	}
	else update = ` wrong`;

	var tag = document.getElementById(`char${button}`);
	tag.setAttribute("disabled", "");
	tag.className += update;

}

function updateHangmanUI(state, status) {
	if(!status) {
		document.getElementById("hangman").src = `./assets/images/hangman${state}.jpg`;
	}
}

function updateGameStatus() {

	if(guessArray.every(x => x === true)) {
		console.log("Game won");
		/* Do something in here */
		document.getElementById("end-game-text").innerHTML = "You guessed it right! Rick is saved!";
		$('#end-game-modal').modal(show = true);
	
	}


	else if (state === 6) {
		console.log("Game lost")
			/* Do something in here */
			document.getElementById("end-game-text").innerHTML = "Glip glop... Grandpa Rick is dead. No more adventures for you Morty";
			$('#end-game-modal').modal(show = true);

		}
}

function resetGame() {
	/* Reset all the buttons */
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].removeAttribute("disabled");
		buttons[i].classList.remove("correct");
		buttons[i].classList.remove("wrong");
	}

	/*Reset Mr.Hangman*/

	document.getElementById("hangman").src = "./assets/images/hangman0.jpg";
	state = 0;
	/* Reset the phrase */

	prepWord();
}

/* Attempt at OOP */
function Hangman(dict) {
	/* Initialize necessary variables */
	this.state = 0,
	this.dict = dict;
	this.wordArray =[];
	this.guessArray =[];

}

Hangman.prototype.prepareGame = function() {
	console.log("preppin");
	var word = dict[0].toUpperCase();
	/* Processing the word */
	this.wordArray = word.split("");
	this.guessArray = new Array(this.wordArray.length);
	for(var i = 0; i < this.wordArray.length; i++) {
		if(this.wordArray[i] === " ")
			this.guessArray[i] = this.wordArray[i];
		else
			this.guessArray[i] = "_";
	}
	//console.log(this.guessArray);
}

Hangman.prototype.getCurrentGuess = function() {
	return this.guessArray.join("");
}

Hangman.prototype.guess = function(char) {
	if(this.wordArray.includes(char))	{
		/* Loop through the guessed word and replace the char */
		for(var i = 0; i < this.guessArray.length; i++) {
			if(this.wordArray[i] === char)
				this.guessArray[i] = char;
		}
		return true;
	}
	else {
		this.state >= 6 ? 6 : this.state++;
		console.log(this.state);
		return false;
	}
}

Hangman.prototype.gameStatus = function() {
	/* Loop to check win condition */

	var equal = true;
	for(var i = 0; i < this.wordArray.length; i++) {
		if(this.wordArray[i] !== this.guessArray[i])
			equal = false;
	}

	if(equal) {
		console.log("Game won");
		/* Do something in here */
		return 1;	
	}

	/* Check if your game is lost */
	else if (this.state >= 6) {
		console.log("Game lost")
		return -1;
	}

	/* On going game */
	else return 0;

}

Hangman.prototype.resetGame = function() {
	this.state = 0;
	prepareGame();
}

/* Assigning function calls */

var hangman = new Hangman(dict);

document.getElementById("play-button").addEventListener("click", function() {
	hangman.prepareGame();
});

document.getElementById("reset-button").addEventListener("click", resetGame);


for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function(event) {
		var guess = hangman.guess(this.innerHTML);
		updateButtonUI(this.innerHTML, guess);
		updateHangmanUI(hangman.state, guess);
		document.getElementById("guessRow").innerHTML = hangman.getCurrentGuess();
	});
}
