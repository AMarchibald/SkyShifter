
var Load = function() {

};
Load.prototype = {
	preload: function(){

		game.load.atlas('sprites', 'assets/img/SkyShifter.png', 'assets/img/SkyShifter.json');
		game.load.audio('Title_Track', 'assets/audio/SkyShifter_Title.wav');
		game.load.image('Load', 'assets/img/Loading.png');

	},
	create: function(){

		game.add.sprite(0, 0, 'Load');

		Player = game.add.sprite( 325, 612, 'sprites', 'Player');

		Player.animations.add('PlayerMetronome', ['Player', 'Player2']);

	},
	update: function(){

		Player.animations.play('PlayerMetronome', 4.6, true);

		game.time.events.add(Phaser.Timer.SECOND * 3, function() {game.state.start('MainMenu')});
	},

}

