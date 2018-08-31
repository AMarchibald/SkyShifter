
var Instruction3 = function() {

};
Instruction3.prototype = {
	preload: function(){

		//preloading audio again for next game state
		game.load.audio( '140_44', 'assets/audio/140_44.wav');
		game.load.audio( '140_74', 'assets/audio/140_74.wav');
		game.load.audio( '174_44', 'assets/audio/174_44.wav');
		game.load.audio( '174_74', 'assets/audio/174_74.wav');
		game.load.image('Instruction3', 'assets/img/Instruction3.png');
	},
	create: function(){

		//adding in Instruction3 panel
		game.add.sprite(0, 0, 'Instruction3');
	},
	update: function(){

		//stopping tracks from previous game state just to be safe
		Track1A.stop();
		Track1B.stop();
		Track2A.stop();
		Track2B.stop();

		//creating delay to preven button mashing and allow quick lore snippit
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.time.events.add(Phaser.Timer.SECOND * 2, function() {game.state.start('Infinite')});
		}
	},

}

