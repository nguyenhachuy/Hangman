var buttons = document.getElementsByClassName("input-button");
var dict = {
	"Uncle Steve": "He claimed to be the older brother of Jerry Smith and has persuaded the Smith family that he has been living in the Smith Residence for nearly a year",
	"Cousin Nicky": "In a flashback scene, he is shown saving the Smith family and Mr. Poopybutthole from within a broken elevator after they see the Hulk Musical.",
	"Beauregard": "He is the Smith family butler and saves the family and Cousin Nicky when they are captured by a Nazi.",
	"Frankenstein": "He's a zombie-like monster",
	"Sleepy Gary": "He passes himself off as a member of the immediate family, as well as Jerry's secret lover.",
	"Photography Raptor": "It is an alien parasite who takes the appearance of a velociraptor.",
	"Pencilvestyr": "He is an anthropomorphic pencil who is apparently great lifelong friends with Rick Sanchez and Morty Smith.",
	"Tinkles": "Summer's imaginary friend who takes her to a magical world called Never Past Bedtime Land. Summer is the only one who can see her and no one else believes that she's real.",
	"Hamurai": "He is a samurai who wears a suit of armor made out of meat. Mostly ham, but also steaks, sausages, and bacon strips.",
	"Amish Cyborg": "He has one robotic leg and an arm, the latter having the head of a shovel at the end.",
	"Reverse Giraffe": "He has a long body and a short neck. He can also walk on his hind legs.",
	"Ghost in a Jar": "He is a tiny green ghost, inside of a jar",
	"Baby Wizard": "He is a baby who is dressed in star diapers and a wizard's hat.",
	"Duck With Muscles": "His final words were 'Oh, wow...Baby Wizard was a Parasite?!...He set me up with my wif...'"
};
/* Setting up stuffs */

/* Code body */

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

function resetGame() {
	/* Reset all the buttons */
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].removeAttribute("disabled");
		buttons[i].classList.remove("correct");
		buttons[i].classList.remove("wrong");
	}

	/*Reset Mr.Hangman*/

	document.getElementById("hangman").src = "./assets/images/hangman0.jpg";
	/* Reset the phrase */

	hangman.resetGame();
	document.getElementById("guessRow").innerHTML = hangman.getCurrentGuess();
	$("#hint").text(hangman.getCurrentHint());

	$("#guessRow").lettering();
}

/* Adding radical text animations */

// a function to simplify animating each text
$.fn.extend({
    animateCss: function (animationName, removeAnimationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.removeClass('animated ' + removeAnimationName).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

function updateTextUI(text) {
	var changedChars = text["charIndexes"];
	for(var i = 0; i < changedChars.length; i++) {
		console.log(changedChars[i]);
		var char = $(`.char${changedChars[i]}`);
		char.addClass("animated fadeOutUp");
		var newChar = char.clone();
		newChar.removeClass("animated hinge");
		newChar.addClass("delay animated rollIn");
		newChar.text(text["char"]);
		char.replaceWith(newChar);

		setTimeout(function(){
			setTimeout(function(){newChar.removeClass("animated rollIn");}, 3000);
	
		},2000);
		// char.animateCss("hinge", "hinge");
		// char.replaceWith('<span class="char7 animated rollIn">S</span>')
	}
}

$("#hangman").bind("click", function(event) {
	$("#hangman").animateCss("hinge");
});
/* Attempt at OOP */
function Hangman(dict) {
	/* Initialize necessary variables */
	this.state = 0;
	this.dict = dict;
	this.words = Object.keys(this.dict);
	this.hint = "";
	this.wordArray =[];
	this.guessArray =[];
	this.currentIndex = 0;
}

Hangman.prototype.getNextIndex = function() {
	if(this.currentIndex < this.words.length - 1)
		this.currentIndex++;
	else
		this.currentIndex = 0;
}

Hangman.prototype.prepareGame = function() {
	var word = this.words[this.currentIndex].toUpperCase();
	this.hint = this.dict[this.words[this.currentIndex]];
	this.getNextIndex();
	/* Processing the word */
	this.wordArray = word.split("");
	this.guessArray = new Array(this.wordArray.length);
  this.guessArray = this.wordArray.map(function(value){
      return value === " " ? " ": "_"; 
  })
	//console.log(this.guessArray);
}

Hangman.prototype.getCurrentGuess = function() {
	return this.guessArray.join("");
}

Hangman.prototype.guess = function(char) {
	var text = {};
	text["guessResult"] = false;
	text["charIndexes"] = [];
	text["char"] = "";
	if(this.wordArray.includes(char))	{
		text["guessResult"] = true;
		text["char"] = char;
		/* Loop through the guessed word and replace the char */
		for(var i = 0; i < this.guessArray.length; i++) {
			if(this.wordArray[i] === char) {
				text["charIndexes"].push(i+1); // Since lettering counts from 1
				this.guessArray[i] = char;
			}
		}
	}
	else 
		this.state >= 6 ? 0 : this.state++;
	

	return text;
}

Hangman.prototype.gameStatus = function() {
	/* Loop to check win condition */

	var equal = true;
	for(var i = 0; i < this.wordArray.length; i++) {
		if(this.wordArray[i] !== this.guessArray[i])
			equal = false;
	}

	if(equal) {
		// console.log("Game won");
		/* Do something in here */
		return 1;	
	}

	/* Check if your game is lost */
	else if (this.state >= 6) {
		// console.log("Game lost")
		return -1;
	}

	/* On going game */
	else return 0;

}

Hangman.prototype.resetGame = function() {
	this.state = 0;
	this.prepareGame();
}

Hangman.prototype.getCurrentHint = function() {
	return this.hint;
}




/* Assigning function calls */

var hangman = new Hangman(dict);

document.getElementById("play-button").addEventListener("click", function() {
	hangman.prepareGame();
	document.getElementById("guessRow").innerHTML = hangman.getCurrentGuess();
	$("#guessRow").lettering();
	$("#hint").text(hangman.getCurrentHint());
});


 window.onload = function() {
	$('#welcome-modal').modal(show = true);
 }



for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function(event) {
		var text = hangman.guess(this.innerHTML);
		var guess = text["guessResult"];
		updateButtonUI(this.innerHTML, guess);
		updateHangmanUI(hangman.state, guess);
		updateTextUI(text);
		/* Handle game wins */
		if(hangman.gameStatus() === 1) {
			console.log("Game won");
			/* Do something in here */
			document.getElementById("end-game-text").innerHTML = "You guessed it right! Rick is saved!";
			$('#end-game-modal').modal(show = true);
		}

		/*Handle game lost */
		else if(hangman.gameStatus() === -1) {
			console.log("Game lost")
			/* Do something in here */
			document.getElementById("end-game-text").innerHTML = "Glip glop... Grandpa Rick is dead. No more adventures for you Morty";
			$('#end-game-modal').modal(show = true);
		}
	});
}

document.getElementById("reset-button").addEventListener("click", resetGame);

/* Since guide wants key event */

document.onkeyup = function(event) {
	var text = hangman.guess(event.key.toUpperCase());
	var guess = text["guessResult"];
	updateButtonUI(event.key.toUpperCase(), guess);
	updateHangmanUI(hangman.state, guess);
	updateTextUI(text);

	/* Handle game wins */
	if(hangman.gameStatus() === 1) {
		console.log("Game won");
		/* Do something in here */
		document.getElementById("end-game-text").innerHTML = "You guessed it right! Rick is saved!";
		$('#end-game-modal').modal(show = true);
	}

	/*Handle game lost */
	else if(hangman.gameStatus() === -1) {
		console.log("Game lost")
		/* Do something in here */
		document.getElementById("end-game-text").innerHTML = "Glip glop... Grandpa Rick is dead. No more adventures for you Morty";
		$('#end-game-modal').modal(show = true);
	}
};

