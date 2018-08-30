
var Instruction1 = function() {

};
Instruction1.prototype = {
	preload: function(){

		game.load.audio( '140_44', 'assets/audio/140_44.wav');
		game.load.audio( '140_74', 'assets/audio/140_74.wav');
		game.load.audio( '174_44', 'assets/audio/174_44.wav');
		game.load.audio( '174_74', 'assets/audio/174_74.wav');
		game.load.image('Instruction1', 'assets/img/Instruction1.png');
	},
	create: function(){


		game.add.sprite(0, 0, 'Instruction1');
	},
	update: function(){

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.time.events.add(Phaser.Timer.SECOND * 2, function() {game.state.start('LevelOne')});
		}
	},

}

