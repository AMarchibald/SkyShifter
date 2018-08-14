
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

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	},

}

