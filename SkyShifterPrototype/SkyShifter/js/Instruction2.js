
var Instruction2 = function() {

};
Instruction2.prototype = {
	preload: function(){

		//loading Instruction2 panel
		game.load.image('Instruction2', 'assets/img/Instruction2.png');
	},
	create: function(){

		//adding in instruction2 panel
		game.add.sprite(0, 0, 'Instruction2');
	},
	update: function(){

		//stopping all music from previous game state just in case of overlap by delay
		Track1A.stop();
		Track1B.stop();
		Track2A.stop();
		Track2B.stop();

		//Setting delay to allow for quick reading and prevent button mashing
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.time.events.add(Phaser.Timer.SECOND * 2, function() {game.state.start('LevelTwo')});
		}
	},

}

