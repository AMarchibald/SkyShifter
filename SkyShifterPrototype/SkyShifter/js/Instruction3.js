
var Instruction3 = function() {

};
Instruction3.prototype = {
	preload: function(){
		game.load.image('Instruction3', 'assets/img/Instruction3.png');
	},
	create: function(){

		game.add.sprite(0, 0, 'Instruction3');
	},
	update: function(){

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Infinite');
		}
	},

}

