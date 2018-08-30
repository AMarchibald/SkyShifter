
var MainMenu = function() {

};
MainMenu.prototype = {
	preload: function(){

		game.load.image('MainMenu', 'assets/img/MainMenu.png');

	},
	create: function(){

		Title_Track = new Phaser.Sound(this,'Title_Track', 1.0, true);
		Title_Track.play();

		game.add.sprite(0, 0, 'MainMenu');
	},
	update: function(){

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			Title_Track.fadeOut(2000, 0);
			game.time.events.add(Phaser.Timer.SECOND * 2, function() {game.state.start('Instruction1')});
		}
	},

}

