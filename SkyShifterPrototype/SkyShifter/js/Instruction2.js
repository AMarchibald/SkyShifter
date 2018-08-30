
var Instruction2 = function() {

};
Instruction2.prototype = {
	preload: function(){
		game.load.image('Instruction2', 'assets/img/Instruction2.png');
	},
	create: function(){

		game.add.sprite(0, 0, 'Instruction2');
	},
	update: function(){

		Track1A.stop();
		Track1B.stop();
		Track2A.stop();
		Track2B.stop();

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('LevelTwo');
		}
	},

}

