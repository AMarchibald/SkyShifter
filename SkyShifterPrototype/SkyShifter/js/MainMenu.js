
var MainMenu = function() {

};
MainMenu.prototype = {
	preload: function(){

		//loading MainMenu panel
		game.load.image('MainMenu', 'assets/img/MainMenu.png');

	},
	create: function(){

		//Starting title song
		Title_Track = new Phaser.Sound(this,'Title_Track', 1.0, true);
		Title_Track.play();

		//adding in MainMenu panel
		game.add.sprite(0, 0, 'MainMenu');
	},
	update: function(){

		//Fade title song and set delay to allow for fadeout and extra loading time
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			Title_Track.fadeOut(2000, 0);
			game.time.events.add(Phaser.Timer.SECOND * 2, function() {game.state.start('Instruction1')});
		}
	},

}

