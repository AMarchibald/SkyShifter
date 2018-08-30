
var Instruction3 = function() {

};
Instruction3.prototype = {
	preload: function(){

		game.load.audio( '140_44', 'assets/audio/140_44.wav');
		game.load.audio( '140_74', 'assets/audio/140_74.wav');
		game.load.audio( '174_44', 'assets/audio/174_44.wav');
		game.load.audio( '174_74', 'assets/audio/174_74.wav');
		game.load.image('Instruction3', 'assets/img/Instruction3.png');
	},
	create: function(){

		game.add.sprite(0, 0, 'Instruction3');
	},
	update: function(){

		Track1A.stop();
		Track1B.stop();
		Track2A.stop();
		Track2B.stop();

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Infinite');
		}
	},

}

