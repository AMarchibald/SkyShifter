
var MainMenu = function() {

};
MainMenu.prototype = {
	preload: function(){
		game.load.image('MainMenu', 'assets/img/MainMenu.png');
	},
	create: function(){

		game.add.sprite(0, 0, 'MainMenu');
	},
	update: function(){

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Instruction1');
		}
	},

}

