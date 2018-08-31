
var GameOver = function() {

};
GameOver.prototype = {
	preload: function(){

		//loading GameOver panel
		game.load.image('GameOver', 'assets/img/GameOver.png');
	},
	create: function(){

		//setting GameOver text screen and display
		game.add.sprite(0, 0, 'GameOver');
		scoreText = game.add.text(200, 700, 'Score: ' + Score, { fontSize: '32px', fill:'#FFFFFF'});
	},
	update: function(){

		//stopping all game tracks just in case
		Track1A.stop();
		Track1B.stop();
		Track2A.stop();
		Track2B.stop();

		//setting delay to prevent space spamming and allow players to read score
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.time.events.add(Phaser.Timer.SECOND * 2, function() {game.state.start('MainMenu')});
		}
	},

}

