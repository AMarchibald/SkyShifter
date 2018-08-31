
// initialize Play state
var Infinite = function() {
	
};
Infinite.prototype = {
	preload: function(){
		
		//setting variable for this game instance		
		PlayerX = game.world.centerX;
		PlayerY = game.world.height - 150;
		Tempo = 140;
		Rhythm = 44;
		Score = 0;
		Fired = false;
		FirstBomberX = 100;
		FirstBomberY = 150;
		FirstGunnerX = 50;
		FirstGunnerY = 250;
		FirstDiveBomberX = 50;
		FirstDiveBomberY = 350;
		firingTimerGunners = 2180;
		firingTimerBombers = 2180;
		firingTimerDivers = 2180;
		EnemyCount = 0;

		//setting arrays for enemy tracking
		livingGreenGunners = [];
		livingGreenBombers = [];
		livingGreenDiveBombers = [];
		livingBlueGunners = [];
		livingBlueBombers = [];
		livingBlueDiveBombers = [];
		this.shoot2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//adding in audio and visual assets
		game.load.atlas('sprites', 'assets/img/SkyShifter.png', 'assets/img/SkyShifter.json');
		//game.load.audio( '140_44', 'assets/audio/140_44.mp3');
		//game.load.audio( '140_74', 'assets/audio/140_74.mp3');
		//game.load.audio( '174_44', 'assets/audio/174_44.mp3');
		//game.load.audio( '174_74', 'assets/audio/174_74.mp3');
		game.load.audio( 'Gunner_Explosion', 'assets/audio/Gunner_Explosion.wav');
		game.load.audio( 'Bomber_Explosion', 'assets/audio/Bomber_Explosion.wav');
		game.load.audio( 'Diver_Explosion', 'assets/audio/Diver_Explosion.wav');
		game.load.audio( 'Player_Death', 'assets/audio/Player_Death.wav');
		game.load.audio( 'Enemy_Laser', 'assets/audio/Enemy_Laser.wav');
		game.load.audio( 'Player_Laser', 'assets/audio/Player_Laser.wav');
		game.load.audio( 'Rhythm_Change_Down', 'assets/audio/Rhythm_Change_Down.wav');
		game.load.audio( 'Rhythm_Change_Up', 'assets/audio/Rhythm_Change_Up.wav');
	},

	create: function(){

		//Track1A = new Phaser.Sound(this,'140_44', 1.0, true);
		//Track1B = new Phaser.Sound(this, '140_74', 0.0, true);
		//Track2A = new Phaser.Sound(this, '174_44', 0.0, true);
		//Track2B = new Phaser.Sound(this, '174_74', 0.0, true);

		//setting sounds to play at no volume to be ready for swaps
		Track1B.play();
		Track2A.play();
		Track2B.play();
		Track1A.fadeIn(4500, 1);

		//adding appropritate sounds into the game
		Gunner_Explosion = game.add.audio('Gunner_Explosion');
		Bomber_Explosion = game.add.audio('Bomber_Explosion');
		Diver_Explosion = game.add.audio('Diver_Explosion');
		Player_Death = game.add.audio('Player_Death');
		Enemy_Laser = game.add.audio('Enemy_Laser');
		Player_Laser = game.add.audio('Player_Laser');
		Rhythm_Change_Down = game.add.audio('Rhythm_Change_Down');
		Rhythm_Change_Up = game.add.audio('Rhythm_Change_Up');

		//allowing multiple instances of sounds for multiple enemy kills and shots
		Gunner_Explosion.allowMultiple = true;
		Bomber_Explosion.allowMultiple = true;
		Diver_Explosion.allowMultiple = true;
		Player_Death.allowMultiple = true;
		Enemy_Laser.allowMultiple = true;
		Player_Laser.allowMultiple = true;
		Enemy_Laser.allowMultiple = true;

		//basic physics and cursors declaration
		game.physics.startSystem(Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();

		//Setting backgrounds for swapping	
		spaceGreen = game.add.tileSprite(0, 0, 600, 2000, 'sprites', 'BackgroundGreen');
		spaceBlue = game.add.tileSprite(0, 0, 600, 2000, 'sprites', 'BackgroundBlue');
		spaceBlue.alpha = 0.0;

		//Adding in player and setting animations
		Player = game.add.sprite(PlayerX, PlayerY, 'sprites', 'Player');
		game.physics.arcade.enable(Player);
		Player.body.collideWorldBounds = true;
		Player.anchor.setTo(0.5);

		//Setting bullet groups for all greeen enemies
		GreenGunnerBullets = game.add.group();
		GreenGunnerBullets.enableBody = true;
		GreenGunnerBullets.physicsBodyType = Phaser.Physics.ARCADE;
		GreenGunnerBullets.createMultiple(30, 'sprites', 'GunnerBulletGreen');
		GreenGunnerBullets.setAll('anchor.x', 0.5);
		GreenGunnerBullets.setAll('anchor.x', 1);
		GreenGunnerBullets.setAll('outOfBoundsKill', true);
		GreenGunnerBullets.setAll('checkWorldBounds', true);


		GreenBomberBullets = game.add.group();
		GreenBomberBullets.enableBody = true;
		GreenBomberBullets.physicsBodyType = Phaser.Physics.ARCADE;
		GreenBomberBullets.createMultiple(30, 'sprites', 'BomberBullet');
		GreenBomberBullets.setAll('anchor.x', 0.5);
		GreenBomberBullets.setAll('anchor.x', 1);
		GreenBomberBullets.setAll('outOfBoundsKill', true);
		GreenBomberBullets.setAll('checkWorldBounds', true);


		GreenDiveBomberBullets = game.add.group();
		GreenDiveBomberBullets.enableBody = true;
		GreenDiveBomberBullets.physicsBodyType = Phaser.Physics.ARCADE;
		GreenDiveBomberBullets.createMultiple(30, 'sprites', 'DiveBomberDrill');
		GreenDiveBomberBullets.setAll('anchor.x', 0.5);
		GreenDiveBomberBullets.setAll('anchor.x', 0.5);
		GreenDiveBomberBullets.setAll('outOfBoundsKill', true);
		GreenDiveBomberBullets.setAll('checkWorldBounds', true);

		//setting bulelt groups for all blue enemies
		BlueGunnerBullets = game.add.group();
		BlueGunnerBullets.enableBody = true;
		BlueGunnerBullets.physicsBodyType = Phaser.Physics.ARCADE;
		BlueGunnerBullets.createMultiple(30, 'sprites', 'GunnerBulletBlue');
		BlueGunnerBullets.setAll('anchor.x', 0.5);
		BlueGunnerBullets.setAll('anchor.x', 1);
		BlueGunnerBullets.setAll('outOfBoundsKill', true);
		BlueGunnerBullets.setAll('checkWorldBounds', true);


		BlueBomberBullets = game.add.group();
		BlueBomberBullets.enableBody = true;
		BlueBomberBullets.physicsBodyType = Phaser.Physics.ARCADE;
		BlueBomberBullets.createMultiple(30, 'sprites', 'BomberBullet');
		BlueBomberBullets.setAll('anchor.x', 0.5);
		BlueBomberBullets.setAll('anchor.x', 1);
		BlueBomberBullets.setAll('outOfBoundsKill', true);
		BlueBomberBullets.setAll('checkWorldBounds', true);


		BlueDiveBomberBullets = game.add.group();
		BlueDiveBomberBullets.enableBody = true;
		BlueDiveBomberBullets.physicsBodyType = Phaser.Physics.ARCADE;
		BlueDiveBomberBullets.createMultiple(30, 'sprites', 'DiveBomberDrill');
		BlueDiveBomberBullets.setAll('anchor.x', 0.5);
		BlueDiveBomberBullets.setAll('anchor.x', 0.5);
		BlueDiveBomberBullets.setAll('outOfBoundsKill', true);
		BlueDiveBomberBullets.setAll('checkWorldBounds', true);


		//setting enemy gruops for all green enemies
		GreenGunners = game.add.group();
		GreenGunners.enableBody = true;
		GreenGunners.physicsBodyType = Phaser.Physics.ARCADE;

		GreenBombers = game.add.group();
		GreenBombers.enableBody = true;
		GreenBombers.physicsBodyType = Phaser.Physics.ARCADE;

		GreenDiveBombers = game.add.group();
		GreenDiveBombers.enableBody = true;
		GreenDiveBombers.physicsBodyType = Phaser.Physics.ARCADE;

		//setting enemy groups ofr all blue enemies
		BlueGunners = game.add.group();
		BlueGunners.enableBody = true;
		BlueGunners.physicsBodyType = Phaser.Physics.ARCADE;

		BlueBombers = game.add.group();
		BlueBombers.enableBody = true;
		BlueBombers.physicsBodyType = Phaser.Physics.ARCADE;

		BlueDiveBombers = game.add.group();
		BlueDiveBombers.enableBody = true;
		BlueDiveBombers.physicsBodyType = Phaser.Physics.ARCADE;

		//setting Blue and Green enemies to be randomly generated
		this.createGunners();
		this.createBombers();
		this.createDiveBombers();

		//setting player bulelt groups
		PlayerBulletsGreen = game.add.group();
		PlayerBulletsGreen.enableBody = true;

		PlayerBulletsBlue = game.add.group();
		PlayerBulletsBlue.enableBody = true;

		//adding in U.I. elements for this game instance
		rhythmText = game.add.text(16, 16, 'Rhythm: ' + Rhythm, { fontSize: '32px', fill:'#FFFFFF'});
		tempoText = game.add.text(216, 16, 'Tempo: ' + Tempo, { fontSize: '32px', fill:'#FFFFFF'});
		scoreText = game.add.text(416, 16, 'Score: ' + Score, { fontSize: '32px', fill:'#FFFFFF'});

	},

	update: function(){
		
		//Track1A.loopFull(1.0);
		//Track2A.loopFull(0.0);
		//Track1B.loopFull(0.0);
		//Track2B.loopFull(0.0);

		console.log(Tempo);
		//console.log(Rhythm);
		console.log(EnemyCount);

		//setting game to check for player input
		this.checkInput();

		//setting backgrounds to scroll
		spaceGreen.tilePosition.y += 5;
		spaceBlue.tilePosition.y += 10;

		//setting different enemy firing timer patterns
		if(game.time.now > firingTimerGunners){

			this.GreenGunnerFires();
			this.BlueGunnerFires();
		}

		if(game.time.now > firingTimerBombers){

			this.GreenBomberFires();
			this.BlueBomberFires();
		}

		if(game.time.now > firingTimerDivers){

			this.GreenDiveBomberDives();
			this.BlueDiveBomberDives();
		}

		//setting parameters for what to do if level is passed
		if(game.time.now > 0){
			if(EnemyCount <= 0){

				PlayerBulletsGreen.kill();
				PlayerBulletsBlue.kill();
				this.createGunners();
				this.createBombers();
				this.createDiveBombers();

				PlayerBulletsGreen = game.add.group();
				PlayerBulletsGreen.enableBody = true;

				PlayerBulletsBlue = game.add.group();
				PlayerBulletsBlue.enableBody = true;

				firingTimerDivers = 2180;
				firingTimerGunners = 2180;
				firingTimerBombers = 2180;
			}
		}

		//setting collision detection for player bullets with green enemies
		game.physics.arcade.overlap(GreenGunners, PlayerBulletsGreen, this.killGreenGunner, null, this);
		game.physics.arcade.overlap(GreenBombers, PlayerBulletsGreen, this.killGreenBomber, null, this);
		game.physics.arcade.overlap(GreenDiveBombers, PlayerBulletsGreen, this.killGreenDiveBomber, null, this);
		game.physics.arcade.overlap(GreenDiveBomberBullets, PlayerBulletsGreen, this.killGreenDiveBomberBullets, null, this);

		//setting collision detection for player bulelts iwth blue enemies
		game.physics.arcade.overlap(BlueGunners, PlayerBulletsBlue, this.killBlueGunner, null, this);
		game.physics.arcade.overlap(BlueBombers, PlayerBulletsBlue, this.killBlueBomber, null, this);
		game.physics.arcade.overlap(BlueDiveBombers, PlayerBulletsBlue, this.killBlueDiveBomber, null, this);
		game.physics.arcade.overlap(BlueDiveBomberBullets, PlayerBulletsBlue, this.killBlueDiveBomberBullets, null, this);

		//setting collsion detection for enemy bullets with the player
		game.physics.arcade.overlap(GreenGunnerBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(GreenBomberBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(GreenDiveBomberBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(BlueGunnerBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(BlueBomberBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(BlueDiveBomberBullets, Player, this.killPlayer, null, this);
	},


	checkInput: function(){

		//setting basic movement controls for player
		if(cursors.left.isDown){

			Player.body.velocity.x = -300;
			PlayerX = -300;

		} else if (cursors.right.isDown){

			Player.body.velocity.x = 300;
			PlayerX = +300;
		} else {

			Player.body.velocity.x = 0;
		}

		//setting tempo change controls for the player
		if(cursors.up.isDown){

			if(Tempo == 140){

				game.add.tween(spaceGreen).to( { alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
				game.add.tween(spaceBlue).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true);

				if( Rhythm == 44){

					Track1A.fadeOut(1500, 0);
					Track2A.fadeIn(4500, 1);
					Tempo = 174;
					tempoText.text = 'Tempo: ' + Tempo;
				}else if( Rhythm == 74){

					Track1B.fadeOut(1500, 0);
					Track2B.fadeIn(4500, 1);
					Tempo = 174;
					tempoText.text = 'Tempo: ' + Tempo;
				}
			}	
		}

		if(cursors.down.isDown){

			game.add.tween(spaceBlue).to( { alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
			game.add.tween(spaceGreen).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true);

			if(Tempo == 174){
				if( Rhythm == 44){

					Track2A.fadeOut(1500, 0);
					Track1A.fadeIn(4500, 1);
					Tempo = 140;
					tempoText.text = 'Tempo: ' + Tempo;
				}else if( Rhythm == 74){

					Track2B.fadeOut(1500, 0);
					Track1B.fadeIn(4500, 1);
					Tempo = 140;
					tempoText.text = 'Tempo: ' + Tempo;
				}
			}
		}

		//setting rhythm change controls for the player
		if(game.input.keyboard.isDown(RhythmShiftUp)){

			if(Rhythm == 44){
				if( Tempo == 140){

					Track1A.fadeOut(1000, 0);
					Rhythm_Change_Up.play();
					Track1B.fadeIn(2000, 1);
					Rhythm = 74;
					rhythmText.text = 'Rhythm: ' + Rhythm;
				}else if( Tempo == 174){

					Track2A.fadeOut(1000, 0);
					Rhythm_Change_Up.play();
					Track2B.fadeIn(2000, 1);
					Rhythm = 74;
					rhythmText.text = 'Rhythm: ' + Rhythm;
				}
			}
		}

		if(game.input.keyboard.isDown(RhythmShiftDown)){

			if(Rhythm == 74){
				if( Tempo == 140){

					Track1B.fadeOut(1000, 0);
					Rhythm_Change_Down.play();
					Track1A.fadeIn(2000, 1);
					Rhythm = 44;
					rhythmText.text = 'Rhythm: ' + Rhythm;
				}else if( Tempo == 174){

					Track2B.fadeOut(1000, 0);
					Rhythm_Change_Down.play();
					Track2A.fadeIn(2000, 1);
					Rhythm = 44;
					rhythmText.text = 'Rhythm: ' + Rhythm;
				}
			}
		}


		//setting firing controls for the player based on tempo and rhythm
		if(this.shoot2.isDown){

			if( Tempo == 140){
				if( Rhythm == 44){
					if(!Fired){
						for(var i = 0; i < 4; i++){
							var PlayerBullet = PlayerBulletsGreen.create(Player.x, Player.y - (i*15), 'sprites', 'PlayerBulletGreen');
							PlayerBullet.anchor.setTo(0.5);
							game.physics.arcade.enable(PlayerBullet);
							PlayerBullet.body.velocity.y = -500;
							Player_Laser.play();
						}
						Fired = true;
					}
				} else if (Rhythm == 74){
					if(!Fired){

						var PlayerBullet = PlayerBulletsGreen.create(Player.x - 22, Player.y - 24, 'sprites', 'PlayerBulletGreen');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						var PlayerBullet = PlayerBulletsGreen.create(Player.x + 18, Player.y - 24, 'sprites', 'PlayerBulletGreen');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						var PlayerBullet = PlayerBulletsGreen.create(Player.x - 22, Player.y - 8, 'sprites', 'PlayerBulletGreen');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						var PlayerBullet = PlayerBulletsGreen.create(Player.x + 18, Player.y - 8, 'sprites', 'PlayerBulletGreen');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						Fired = true;
					}	
				}
			}else if( Tempo == 174){
				if( Rhythm == 44){
					if(!Fired){
						for(var i = 0; i < 4; i++){
							var PlayerBullet = PlayerBulletsBlue.create(Player.x, Player.y - (i*15), 'sprites', 'PlayerBulletBlue');
							PlayerBullet.anchor.setTo(0.5);
							game.physics.arcade.enable(PlayerBullet);
							PlayerBullet.body.velocity.y = -500;
							Player_Laser.play();
						}
						Fired = true;
					}
				} else if (Rhythm == 74){
					if(!Fired){

						var PlayerBullet = PlayerBulletsBlue.create(Player.x - 22, Player.y - 24, 'sprites', 'PlayerBulletBlue');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						var PlayerBullet = PlayerBulletsBlue.create(Player.x + 18, Player.y - 24, 'sprites', 'PlayerBulletBlue');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						var PlayerBullet = PlayerBulletsBlue.create(Player.x - 22, Player.y - 8, 'sprites', 'PlayerBulletBlue');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						var PlayerBullet = PlayerBulletsBlue.create(Player.x + 18, Player.y - 8, 'sprites', 'PlayerBulletBlue');
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();

						Fired = true;
					}	
				}
			}

		}

		//preventing laser firing constantly while holding spacebar down
		if(this.shoot2.isUp){

			Fired = false;
		}
	},

	//setting enemy firing patterns using Phaser Weapon system
	GreenGunnerFires: function(){

		GreenGunnerBullet = GreenGunnerBullets.getFirstExists(false);

		livingGreenGunners.length=0;

		GreenGunners.forEachAlive(function(GreenGunner){

			livingGreenGunners.push(GreenGunner);
		});

		if( GreenGunnerBullet && livingGreenGunners.length > 0){

			var random = game.rnd.integerInRange(0, livingGreenGunners.length-1);

			var shooter = livingGreenGunners[random];

			GreenGunnerBullet.reset(shooter.body.x+16, shooter.body.y+16);

			GreenGunnerBullet.body.velocity.y = 140;
			Enemy_Laser.play();
			firingTimerGunners = game.time.now + 545;
		}
	},


	BlueGunnerFires: function(){

		BlueGunnerBullet = BlueGunnerBullets.getFirstExists(false);

		livingBlueGunners.length=0;

		BlueGunners.forEachAlive(function(BlueGunner){

			livingBlueGunners.push(BlueGunner);
		});

		if( BlueGunnerBullet && livingBlueGunners.length > 0){

			var random = game.rnd.integerInRange(0, livingBlueGunners.length-1);

			var shooter = livingBlueGunners[random];

			BlueGunnerBullet.reset(shooter.body.x+16, shooter.body.y+16);

			BlueGunnerBullet.body.velocity.y = 174;
			Enemy_Laser.play();
			firingTimerGunners = game.time.now + 545;
		}
	},


	GreenBomberFires: function(){

		GreenBomberBullet = GreenBomberBullets.getFirstExists(false);

		livingGreenBombers.length=0;
		GreenBombers.forEachAlive(function(GreenBomber){

			livingGreenBombers.push(GreenBomber);
		});

		if( GreenBomberBullet && livingGreenBombers.length > 0){

			var random = game.rnd.integerInRange(0, livingGreenBombers.length-1);

			var shooter = livingGreenBombers[random];

			GreenBomberBullet.reset(shooter.body.x+16, shooter.body.y+16);

			game.physics.arcade.moveToObject(GreenBomberBullet, Player, 140);
			firingTimerBombers = game.time.now + 1090;
		}
	},


	BlueBomberFires: function(){

		BlueBomberBullet = BlueBomberBullets.getFirstExists(false);

		livingBlueBombers.length=0;
		BlueBombers.forEachAlive(function(BlueBomber){

			livingBlueBombers.push(BlueBomber);
		});

		if( BlueBomberBullet && livingBlueBombers.length > 0){

			var random = game.rnd.integerInRange(0, livingBlueBombers.length-1);

			var shooter = livingBlueBombers[random];

			BlueBomberBullet.reset(shooter.body.x+16, shooter.body.y+16);

			game.physics.arcade.moveToObject(BlueBomberBullet, Player, 174);
			firingTimerBombers = game.time.now + 1090;
		}
	},


	GreenDiveBomberDives: function(){

		GreenDiveBomberBullet = GreenDiveBomberBullets.getFirstExists(false);

		livingGreenDiveBombers.length=0;
		GreenDiveBombers.forEachAlive(function(GreenDiveBomber){

			livingGreenDiveBombers.push(GreenDiveBomber);
		});

		if( livingGreenDiveBombers.length > 0){

			var random = game.rnd.integerInRange(0, livingGreenDiveBombers.length-1);

			var diver = livingGreenDiveBombers[random];

			GreenDiveBomberBullet.reset(diver.body.x, diver.body.y);

			diver.kill();
			EnemyCount -= 1;
			game.physics.arcade.moveToObject(GreenDiveBomberBullet, Player, 140);
			firingTimerDivers = game.time.now + 2180;
		}
	},


	BlueDiveBomberDives: function(){

		BlueDiveBomberBullet = BlueDiveBomberBullets.getFirstExists(false);

		livingBlueDiveBombers.length=0;
		BlueDiveBombers.forEachAlive(function(BlueDiveBomber){

			livingBlueDiveBombers.push(BlueDiveBomber);
		});

		if( livingBlueDiveBombers.length > 0){

			var random = game.rnd.integerInRange(0, livingBlueDiveBombers.length-1);

			var diver = livingBlueDiveBombers[random];

			BlueDiveBomberBullet.reset(diver.body.x, diver.body.y);

			diver.kill();
			EnemyCount -= 1;
			game.physics.arcade.moveToObject(BlueDiveBomberBullet, Player, 174);
			firingTimerDivers = game.time.now + 2180;
		}
	},

	//setting randomly generated rows of blue and green enemies using double for loops
	createGunners: function(){

		for(var i = 0; i < 3; i++){
			for(var x = 1; x < 10; x++){

				var rng = game.rnd.integerInRange(0, 1);

				if(rng == 0){
					var GreenGunner = GreenGunners.create(x*60, 200 + i*50, 'sprites', 'GreenGunner');
					GreenGunner.alpha = 0.0;
					game.add.tween(GreenGunner).to( { alpha: 1}, 2180, Phaser.Easing.Linear.None, true);
					GreenGunner.anchor.setTo(0.5);
					GreenGunner.animations.add('GreenMetronome', ['GreenGunner', 'GreenGunner2']);
					GreenGunner.animations.play('GreenMetronome', 4.6, true);
					EnemyCount += 1;
				} else if( rng == 1){
					var BlueGunner = BlueGunners.create(x*60, 200 + i*50, 'sprites', 'BlueGunner');
					BlueGunner.alpha = 0.0;
					game.add.tween(BlueGunner).to( { alpha: 1}, 2180, Phaser.Easing.Linear.None, true);
					BlueGunner.anchor.setTo(0.5);
					BlueGunner.animations.add('BlueMetronome', ['BlueGunner', 'BlueGunner2']);
					BlueGunner.animations.play('BlueMetronome', 4.6, true);
					EnemyCount+=1;
				}
			}
		}
	},

	createBombers: function(){

		for(var i = 0; i < 2; i++){
			for(var x = 1; x < 8; x++){

				var rng = game.rnd.integerInRange(0, 1);

				if(rng == 0){
					var GreenBomber = GreenBombers.create(x*75, 100 + i*50, 'sprites', 'GreenBomber');
					GreenBomber.alpha = 0.0;
					game.add.tween(GreenBomber).to( { alpha: 1}, 2180, Phaser.Easing.Linear.None, true);
					GreenBomber.anchor.setTo(0.5);
					GreenBomber.animations.add('GreenMetronome', ['GreenBomber', 'GreenBomber2']);
					GreenBomber.animations.play('GreenMetronome', 4.6, true);
					EnemyCount += 1;
				} else if( rng == 1){
					var BlueBomber = BlueBombers.create(x*75, 100 + i*50, 'sprites', 'BlueBomber');
					BlueBomber.alpha = 0.0;
					game.add.tween(BlueBomber).to( { alpha: 1}, 2180, Phaser.Easing.Linear.None, true);
					BlueBomber.anchor.setTo(0.5);
					BlueBomber.animations.add('BlueMetronome', ['BlueBomber', 'BlueBomber2']);
					BlueBomber.animations.play('BlueMetronome', 4.6, true);
					EnemyCount+=1;
				}
			}
		}
	},

	createDiveBombers: function(){

		for(var i = 0; i < 2; i++){
			for(var x = 1; x < 7; x++){

				var rng = game.rnd.integerInRange(0, 1);

				if(rng == 0){
					var GreenDiveBomber = GreenDiveBombers.create(x*85, 350 + i*50, 'sprites', 'GreenDiveBomber');
					GreenDiveBomber.alpha = 0.0;
					game.add.tween(GreenDiveBomber).to( { alpha: 1}, 2180, Phaser.Easing.Linear.None, true);
					GreenDiveBomber.anchor.setTo(0.5);
					GreenDiveBomber.animations.add('GreenMetronome', ['GreenDiveBomber', 'GreenDiveBomber2']);
					GreenDiveBomber.animations.play('GreenMetronome', 4.6, true);
					EnemyCount += 1;
				} else if( rng == 1){
					var BlueDiveBomber = BlueDiveBombers.create(x*85, 350 + i*50, 'sprites', 'BlueDiveBomber');
					BlueDiveBomber.alpha = 0.0;
					game.add.tween(BlueDiveBomber).to( { alpha: 1}, 2180, Phaser.Easing.Linear.None, true);
					BlueDiveBomber.anchor.setTo(0.5);
					BlueDiveBomber.animations.add('BlueMetronome', ['BlueDiveBomber', 'BlueDiveBomber2']);
					BlueDiveBomber.animations.play('BlueMetronome', 4.6, true);
					EnemyCount += 1;
				}
			}
		}
	},

	//setting parameters for what to do if an enemy is hit by the correct player shot
	killGreenGunner: function(PlayerShot, GreenGunner){

			GreenGunner.kill();
			PlayerShot.kill();
			Gunner_Explosion.play();
			EnemyCount -= 1;
			Score += 5;
			scoreText.text = 'Score: ' + Score;
	},


	killGreenBomber: function(PlayerShot, GreenBomber){

			GreenBomber.kill();
			PlayerShot.kill();
			Bomber_Explosion.play();
			EnemyCount -= 1;
			Score += 10;
			scoreText.text = 'Score: ' + Score;
	},

	killGreenDiveBomber: function(PlayerShot, GreenDiveBomber){


			GreenDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
			EnemyCount -= 1;
			Score += 15;
			scoreText.text = 'Score: ' + Score;
	},

	killGreenDiveBomberBullets: function(PlayerShot, GreenDiveBomber){

			GreenDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
			Score += 5;
			scoreText.text = 'Score: ' + Score;
	},


	killBlueGunner: function(PlayerShot, BlueGunner){

			BlueGunner.kill();
			PlayerShot.kill();
			Gunner_Explosion.play();
			EnemyCount -= 1;
			Score += 5;
			scoreText.text = 'Score: ' + Score;
	},


	killBlueBomber: function(PlayerShot, BlueBomber){

			BlueBomber.kill();
			PlayerShot.kill();
			Bomber_Explosion.play();
			EnemyCount -= 1;
			Score += 10;
			scoreText.text = 'Score: ' + Score;
	},

	killBlueDiveBomber: function(PlayerShot, BlueDiveBomber){

			BlueDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
			EnemyCount -= 1;
			Score += 15;
			scoreText.text = 'Score: ' + Score;
	},

	killBlueDiveBomberBullets: function(PlayerShot, BlueDiveBomber){

			BlueDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
			Score += 5;
			scoreText.text = 'Score: ' + Score;
	},


	//setting parameters for what to do if the player is hit by an enemy bullet
	killPlayer: function(EnemyBullet, Player){

		fired = true;
		Player.animations.play('PlayerExplosion', 4, false, true);
		EnemyBullet.kill();
		Player_Death.play();
		Track1A.fadeOut(3000, 0);
		Track1B.fadeOut(3000, 0);
		Track2A.fadeOut(3000, 0);
		Track2B.fadeOut(3000, 0);
		game.time.events.add(Phaser.Timer.SECOND * 3, function() {game.state.start('GameOver')});
	}
}

