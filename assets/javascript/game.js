var word = "lmao";
var wordArray = ["L","M","A","O"];
var buttons = document.getElementsByTagName("button");

for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", checkUserGuess);
}

document.getElementById("guessRow").innerHTML = prepWord(this);

function checkUserGuess() {
	var guess = this.innerHTML;
	console.log(guess);
	var result = false;
	if(wordArray.includes(guess)) {
		result = true;
	}
	updateButtonUI(guess, result);

}

function prepWord() {
	console.log("prepWord");
	var result = "";
	for(var i = 0; i < word.length; i++) {
		result += "_ ";
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