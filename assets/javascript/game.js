function userGuess() {
	console.log(this.innerHTML);
}

var buttons = document.getElementsByTagName("button");

for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", userGuess);
}