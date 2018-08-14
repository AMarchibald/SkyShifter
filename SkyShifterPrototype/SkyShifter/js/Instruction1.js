
var Instruction1 = function() {

};
Instruction1.prototype = {
	preload: function(){
		game.load.image('Instruction1', 'assets/img/Instruction1.png');
	},
	create: function(){

		game.add.sprite(0, 0, 'Instruction1');
	},
	update: function(){

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('LevelOne');
		}
	},

}

