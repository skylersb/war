$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
				copy.push(array[i]); 
				delete array[i]; 
				n--; 
			} 
		} 
		return copy; 
	}
	
	deck = shuffle(deck);
	var cards_player_1 = [];
	var cards_player_2 = [];
	//divide out the cards into the two arrays
	
	var deal = function() {
		for (var i = 0; i < deck.length; i++) {
			if (i % 2 !== 0) {
				cards_player_2.push(deck[i]);
			}else {
				cards_player_1.push(deck[i]);
			}
		}
	}

	deal();

	console.log(cards_player_1);
	console.log(cards_player_2);
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function (card1, card2) {
		//card_1 is an object
		
		if (card1.number > card2.number){
			alert("You Lose!");
			return card1;
		}else if (card1.number < card2.number)  {
			alert("You Win!");
			return card2;
		} else  {
			return false; //tie
		}
	}


	var tie = function(p1card, p2card) {
		
		var tie1 = cards_player_1.splice(0, 3);
		var tie2 = cards_player_2.splice(0, 3);
		
		var tie1card = cards_player_1.shift();
		var tie2card = cards_player_2.shift();
		var tieWinner = war(tie1card, tie2card);
		if(tieWinner === tie1card){
			cards_player_1.push(p1card, p2card, tie1card, tie2card);
			for(var i = 0; i < tie1.length; i++){
				cards_player_1.push(tie1[i]);
				cards_player_1.push(tie2[i]);
			}   
			alert("You Lose Double!");
		} else if (tieWinner === tie2card){
			cards_player_2.push(p1card, p2card, tie1card, tie2card);
			for(var i = 0; i < tie2.length; i++){
				cards_player_2.push(tie2[i]);
				cards_player_2.push(tie1[i]);
			} 
			alert("You Win Double!");
		}
	}

	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
		var play = function() {
			var p1card = cards_player_1.shift();
			var p2card = cards_player_2.shift();
			var result = war(p1card, p2card);

			if(result === p1card){
				cards_player_1.push(p1card, p2card);
			} else if (result === p2card){
				cards_player_2.push(p1card, p2card);
			}	else {
				tie(p1card, p2card);
			}

		//this function (defined below) will continue to the next turn
		advance();

	
}
var advance = function() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});
