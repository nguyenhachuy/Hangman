var word = "lmao";

var buttons = document.getElementsByTagName("button");

for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", userGuess);
}

document.getElementById("guessRow").innerHTML = prepWord(this);

function userGuess() {
	console.log(this.innerHTML);
}

function prepWord() {
	console.log("prepWord");
	var result = "";
	for(var i = 0; i < word.length; i++) {
		result += "_ ";
	}
	return result;
}