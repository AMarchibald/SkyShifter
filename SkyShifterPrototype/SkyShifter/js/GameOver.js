
var GameOver = function() {

};
GameOver.prototype = {
	preload: function(){

		game.load.image('GameOver', 'assets/img/GameOver.png');
	},
	create: function(){

		game.add.sprite(0, 0, 'GameOver');
	},
	update: function(){

		Track1A.stop();
		Track1B.stop();
		Track2A.stop();
		Track2B.stop();
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	},

}

