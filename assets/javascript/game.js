var word = "lmao";
var wordArray = ["L","M","A","O"];
var guessArray;
var buttons = document.getElementsByTagName("button");

for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", checkUserGuess);
}

document.getElementById("hangman").addEventListener("click", prepWord);

function checkUserGuess() {
	var guess = this.innerHTML;
	console.log(guess);
	var result = false;
	if(wordArray.includes(guess)) {
		result = true;
	}
	updateButtonUI(guess, result);

function prepWord() {

	console.log("prepWord");
	wordArray = word.split("");
	guessArray = new Array(wordArray.length);
	guessArray.fill(false);
	for(var i = 0; i < guessArray.length; i++) {
		if(wordArray[i] === " ") {
			guessArray[i] = true;
		}
	}

	document.getElementById("guessRow").innerHTML = makeDashes(word);
	return result;

}

function makeDashes(word) {
	var result = [];

	for(var i = 0; i < word.length; i++) {
		if(word[i] === " ")
			result.push(" ");
		else result.push("_");
	}

	return result;
}

function main() {
	checkUserGuess();
}

function updateButtonUI(button, status) {
	var update;
	if(status) {
		var update = ` disabled`;
	}
	else update = ` btn-lg`;
	document.getElementById(`char${button}`).className += update;
	console.log(document.getElementById(`char${button}`).innerHTML);
}
