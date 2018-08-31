
var Load = function() {

};
Load.prototype = {
	preload: function(){

		//loading texture atlas and audio to prevent issues later
		game.load.atlas('sprites', 'assets/img/SkyShifter.png', 'assets/img/SkyShifter.json');
		game.load.audio('Title_Track', 'assets/audio/SkyShifter_Title.wav');
		game.load.image('Load', 'assets/img/Loading.png');

	},
	create: function(){

		//setting background loading panel and animations
		game.add.sprite(0, 0, 'Load');

		Player = game.add.sprite( 325, 612, 'sprites', 'Player');

		Player.animations.add('PlayerMetronome', ['Player', 'Player2']);

	},
	update: function(){

		//setting loading animation to start
		Player.animations.play('PlayerMetronome', 4.6, true);

		//setting delay to prevent mashing past screens
		game.time.events.add(Phaser.Timer.SECOND * 3, function() {game.state.start('MainMenu')});
	},

}

