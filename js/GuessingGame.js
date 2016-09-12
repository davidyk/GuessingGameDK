function generateWinningNumber() {
	return Math.ceil(Math.random() * 100);
}

function shuffle (array) {
	// debugger;
	var n = array.length;
	
	while (n) {
		var chosen = Math.floor(Math.random() * n);
		var moveMe = array[n - 1];

		array[n - 1] = array[chosen];
		array[chosen] = moveMe;

		n--;
	}

	return array;
}

function Game () {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();

}


Game.prototype.playersGuessSubmission = function (num) {
	if(!(num >= 1 && num <= 100)) {
		throw "That is an invalid guess.";
	}
	this.playersGuess = num;

	return this.checkGuess(num);

}

Game.prototype.difference = function () {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function () {
	return (this.playersGuess < this.winningNumber ? true : false);
}

Game.prototype.checkGuess = function (num) {
		// debugger;
		var checkOldGuess = this.pastGuesses.find(function(el) {
			return el === num;

		});

		if(checkOldGuess) { return "You have already guessed that number."; }

		var a = this.winningNumber;

		if(parseInt(num) === this.winningNumber) { return "You Win!"; }

		this.pastGuesses.push(num);

		if(this.pastGuesses.length === 5) { return "You Lose."; }

		if(Math.abs(num - this.winningNumber) < 10) {
			return 'You\'re burning up!';
		}

		if(Math.abs(num - this.winningNumber) < 25) {
			return 'You\'re lukewarm.';
		}
		if(Math.abs(num - this.winningNumber) < 50) {
			return 'You\'re a bit chilly.';
		}
		if(Math.abs(num - this.winningNumber) < 100) {
			return 'You\'re ice cold!';
		}

}

function newGame () {
	return new Game();
}

Game.prototype.provideHint = function () {

	var array = [];

	array[0] = this.winningNumber;
	array[1] = generateWinningNumber();
	array[2] = generateWinningNumber();

	shuffle(array);

	return array;

}

function makeAGuess(game) {
	answer = $("input").val();
	$("input").val("");
	var output = game.playersGuessSubmission(answer);
	console.log(output);
	console.log("game.pastGuesses.length = " + game.pastGuesses.length);
	


	if(output === "You have already guessed that number.") {
		$("H1").text("Guess again!");
	} else {
		$("li:nth-child(" + game.pastGuesses.length + ")").text(answer);

	}

	switch(output) {
	 	case "You Win!":
	 		$("H1").text("You WIN!");
	 		$("H2").text("Click Reset");
	 		$('#submitbtn').attr("disabled", true);
	 		$('#hint').attr("disabled", true);
			break;
 		case "You Lose.":
	 		$("H1").text("You LOSE!");
	 		$("H2").text("Click Reset");
	 		$('#submitbtn').attr("disabled", true);
	 		$('.hint').attr("disabled", true);
			break;

		default:
			$("H1").text(output);
			if(game.isLower()) {
				$("H2").text("The answer is higher than your guess.");
			} else {
				$("H2").text("The answer is lower than your guess.");
			}
			break;
	}		
	








	// 	case 	
}

$(document).ready(function(){
	var newFun = newGame();
	var answer = "";

	// $("#submitbtn").text(newFun.winningNumber);

	$("input").on("keypress", function(event){
		if(event.which === 13) {
			makeAGuess(newFun);		
		}
	});


	$("#submitbtn").click(function(){
		makeAGuess(newFun);
	});

	$(".reset").click(function(){
		newFun = newGame();
		$("H1").text("Guessing Game");
 		$("H2").text("Guess any number between 1 and 100");

		$("li").text("-");
		console.log("Reset");
	});


	$(".hint").click(function(){

		var helper = newFun.provideHint();
 		$("H2").text("The answer is one of the following: " + helper[0] + ", " + helper[1] + ", " + helper[2] + ".");
		console.log("hint");
		console.log("Winning number: " + newFun.winningNumber);
	});






});




// Game.prototype.playersGuessSubmission 
 // Game.prototype.provideHint
 // newGame