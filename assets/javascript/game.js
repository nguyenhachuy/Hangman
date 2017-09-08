var word = "Poopybutthole".toUpperCase();
var wordArray;
var guessArray;
var buttons = document.getElementsByTagName("button");
var state = 0;

/* Setting up stuffs */

for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", checkUserGuess);
}

document.getElementById("play-button").addEventListener("click", prepWord);

document.getElementById("reset-button").addEventListener("click", resetGame);

 window.onload = function() {
	$('#welcome-modal').modal(show = true);
 }
/* Code body */

function checkUserGuess() {
	var guess = this.innerHTML;
	//console.log(guess);
	var result = false;
	if(wordArray.includes(guess)) {
		result = true;
		updateGuessUI(guess);
		document.getElementById("guessRow").innerHTML = updateGuessWord();
	}
	else
		updateHangmanUI();

	updateButtonUI(guess, result);
	updateGameStatus();
}


function prepWord() {

	//console.log("prepWord");
	wordArray = word.split("");
	guessArray = new Array(wordArray.length);
	guessArray.fill(false);
	for(var i = 0; i < guessArray.length; i++) {
		if(wordArray[i] === "-") {
			guessArray[i] = true;
		}
	}

	document.getElementById("guessRow").innerHTML = makeDashes(word);

}

function makeDashes(word, filler) {
	var result = [];

	for(var i = 0; i < word.length; i++) {
		if(word[i] === "-")
			result.push("-");
		else result.push("_");
	}

	return result.join(" ");
}

function updateGuessWord() {
	var result = [];

	for(var i = 0; i < word.length; i++) {
		if(guessArray[i] === true)
			result.push(wordArray[i]);
		else result.push("_");
	}
	console.log(result);

	return result.join(" ");

}

function main() {
	checkUserGuess();
}

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

function updateGuessUI(char) {
	for(var i = 0; i < guessArray.length; i++) {
		if(wordArray[i] === char)
			guessArray[i] = true;
	}

}

function updateHangmanUI() {
	if(state < 6) {
		state++;
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
