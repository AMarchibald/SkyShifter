
// initialize Play state
var LevelOne = function() {
	
};
LevelOne.prototype = {
	preload: function(){
		
		PlayerX = game.world.centerX;
		PlayerY = game.world.height - 150;
		Tempo = 140;
		Rhythm = 44;
		Fired = false;
		FirstBomberX = 100;
		FirstBomberY = 150;
		FirstGunnerX = 50;
		FirstGunnerY = 250;
		FirstDiveBomberX = 50;
		FirstDiveBomberY = 350;
		firingTimer110 = 0;
		EnemyCount = 0;

		livingGreenGunners = [];
		livingGreenBombers = [];
		livingGreenDiveBombers = [];
		this.shoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


		game.load.atlas('sprites', 'assets/img/SkyShifter.png', 'assets/img/SkyShifter.json');
		game.load.audio( '140_44', 'assets/audio/140_44.mp3');
		game.load.audio( '140_74', 'assets/audio/140_74.mp3');
		game.load.audio( '174_44', 'assets/audio/174_44.mp3');
		game.load.audio( '174_74', 'assets/audio/174_74.mp3');
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

		Track1A = new Phaser.Sound(this,'140_44', 1.0, true);
		Track1B = new Phaser.Sound(this, '140_74', 0.0, true);
		Track2A = new Phaser.Sound(this, '174_44', 0.0, true);
		Track2B = new Phaser.Sound(this, '174_74', 0.0, true);

		Track1B.play();
		Track2A.play();
		Track2B.play();
		Track1A.play();

		Gunner_Explosion = game.add.audio('Gunner_Explosion');
		Bomber_Explosion = game.add.audio('Bomber_Explosion');
		Diver_Explosion = game.add.audio('Diver_Explosion');
		Player_Death = game.add.audio('Player_Death');
		Enemy_Laser = game.add.audio('Enemy_Laser');
		Player_Laser = game.add.audio('Player_Laser');
		Rhythm_Change_Down = game.add.audio('Rhythm_Change_Down');
		Rhythm_Change_Up = game.add.audio('Rhythm_Change_Up');

		Enemy_Laser.allowMultiple = true;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();

		spaceGreen = game.add.tileSprite(0, 0, 600, 2000, 'sprites', 'BackgroundGreen');
		spaceBlue = game.add.tileSprite(0, 0, 600, 2000, 'sprites', 'BackgroundBlue');
		spaceBlue.alpha = 0.0;
		
		Player = game.add.sprite(PlayerX, PlayerY, 'sprites', 'Player');
		game.physics.arcade.enable(Player);
		Player.body.collideWorldBounds = true;
		Player.anchor.setTo(0.5);

		Player.animations.add('PlayerMetronome', ['Player', 'Player2']);
		Player.animations.add('Explosion', Phaser.Animation.generateFrameNames('Explosion', 1, 8), 24);



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


		DiveBomberDrill = game.add.group();
		DiveBomberDrill.enableBody = true;
		DiveBomberDrill.physicsBodyType = Phaser.Physics.ARCADE;
		DiveBomberDrill.createMultiple(30, 'sprites', 'DiveBomberDrill');
		DiveBomberDrill.setAll('anchor.x', 0.5);
		DiveBomberDrill.setAll('anchor.x', 0.5);
		DiveBomberDrill.setAll('outOfBoundsKill', true);
		DiveBomberDrill.setAll('checkWorldBounds', true);


		GreenGunners = game.add.group();
		GreenGunners.enableBody = true;
		GreenGunners.physicsBodyType = Phaser.Physics.ARCADE;

		this.createGreenGunners('GreenGunner');

		GreenBombers = game.add.group();
		GreenBombers.enableBody = true;
		GreenBombers.physicsBodyType = Phaser.Physics.ARCADE;

		this.createGreenBombers('GreenBomber')

		GreenDiveBombers = game.add.group();
		GreenDiveBombers.enableBody = true;
		GreenDiveBombers.physicsBodyType = Phaser.Physics.ARCADE;

		this.createGreenDiveBombers('GreenDiveBomber');

		PlayerBulletsGreen = game.add.group();
		PlayerBulletsGreen.enableBody = true;

		PlayerBulletsBlue = game.add.group();
		PlayerBulletsBlue.enableBody = true;
	},

	update: function(){
		
		//Track1A.loopFull(1.0);
		//Track2A.loopFull(0.0);
		//Track1B.loopFull(0.0);
		//Track2B.loopFull(0.0);

		console.log(Tempo);
		//console.log(Rhythm);
		console.log(EnemyCount);

		this.checkInput();

		spaceGreen.tilePosition.y += 5;
		spaceBlue.tilePosition.y += 10;

		Player.animations.play('PlayerMetronome', 4.6, true);

		if(game.time.now > firingTimer110){

			this.GreenBomberFires();
			this.GreenGunnerFires();
			this.GreenDiveBomberDives();
		}

		if(game.time.now > 0){
			if(EnemyCount == 0){

				game.state.start('Instruction2');
				Track1A.stop();
				Track1B.stop();
				Track2A.stop();
				Track2B.stop();
			}
		}


		game.physics.arcade.overlap(GreenGunners, PlayerBulletsGreen, this.killGreenGunner, null, this);
		game.physics.arcade.overlap(GreenGunners, PlayerBulletsGreen, this.killGreenGunner, null, this);
		game.physics.arcade.overlap(GreenBombers, PlayerBulletsGreen, this.killGreenBomber, null, this);
		game.physics.arcade.overlap(GreenBombers, PlayerBulletsGreen, this.killGreenBomber, null, this);
		game.physics.arcade.overlap(GreenDiveBombers, PlayerBulletsGreen, this.killGreenDiveBomber, null, this);
		game.physics.arcade.overlap(GreenDiveBombers, PlayerBulletsGreen, this.killGreenDiveBomber, null, this);
		game.physics.arcade.overlap(DiveBomberDrill, PlayerBulletsGreen, this.killDiveBomberDrill, null, this);
		game.physics.arcade.overlap(DiveBomberDrill, PlayerBulletsGreen, this.killDiveBomberDrill, null, this);

		game.physics.arcade.overlap(GreenGunnerBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(GreenBomberBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(DiveBomberDrill, Player, this.killPlayer, null, this);
	},


	checkInput: function(){


		if(cursors.left.isDown){

			Player.body.velocity.x = -300;
			PlayerX = -300;

		} else if (cursors.right.isDown){

			Player.body.velocity.x = 300;
			PlayerX = +300;
		} else {

			Player.body.velocity.x = 0;
		}


		if(cursors.up.isDown){

			if(Tempo == 140){

				game.add.tween(spaceGreen).to( { alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
				game.add.tween(spaceBlue).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true);

				if( Rhythm == 44){

					Track1A.fadeOut(1500, 0);
					Track2A.fadeIn(4500, 1);
					Tempo = 174;
				}else if( Rhythm == 74){

					Track1B.fadeOut(1500, 0);
					Track2B.fadeIn(4500, 1);
					Tempo = 174;
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
				}else if( Rhythm == 74){

					Track2B.fadeOut(1500, 0);
					Track1B.fadeIn(4500, 1);
					Tempo = 140;
				}
			}
		}


		if(game.input.keyboard.isDown(RhythmShiftUp)){

			if(Rhythm == 44){
				if( Tempo == 140){

					Track1A.fadeOut(1000, 0);
					Rhythm_Change_Up.play();
					Track1B.fadeIn(2000, 1);
					Rhythm = 74;
				}else if( Tempo == 174){

					Track2A.fadeOut(1000, 0);
					Rhythm_Change_Up.play();
					Track2B.fadeIn(2000, 1);
					Rhythm = 74;
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
				}else if( Tempo == 174){

					Track2B.fadeOut(1000, 0);
					Rhythm_Change_Down.play();
					Track2A.fadeIn(2000, 1);
					Rhythm = 44;		
				}
			}
		}




		if(this.shoot.isDown){

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

		if(this.shoot.isUp){

			Fired = false;
		}



	},

	GreenGunnerFires: function(){

		GreenGunnerBullet = GreenGunnerBullets.getFirstExists(false);

		livingGreenGunners.length=0;

		GreenGunners.forEachAlive(function(GreenGunner){

			livingGreenGunners.push(GreenGunner);
		});

		if( GreenGunnerBullet && livingGreenGunners.length > 0){

			var random = game.rnd.integerInRange(0, livingGreenGunners.length-1);

			var shooter = livingGreenGunners[random];

			GreenGunnerBullet.reset(shooter.body.x + 16, shooter.body.y + 16);

			GreenGunnerBullet.body.velocity.y = 140;
			Enemy_Laser.play();
			firingTimer110 = game.time.now + 545;
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

			GreenBomberBullet.reset(shooter.body.x, shooter.body.y);

			game.physics.arcade.moveToObject(GreenBomberBullet, Player, 140);
			firingTimer110 = game.time.now + 2180;
		}
	},


	GreenDiveBomberDives: function(){

		GreenDiveBomberBullet = DiveBomberDrill.getFirstExists(false);

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
			game.physics.arcade.moveToObject(GreenDiveBomberBullet, Player, 110);
			firingTimer110 = game.time.now + 4360;
		}
	},

	createGreenGunners: function(GunnerType){

		for(var x = 1; x < 10; x++){

			var GreenGunner = GreenGunners.create(x*60, 250, 'sprites', GunnerType);
			GreenGunner.anchor.setTo(0.5);
			GreenGunner.animations.add('GreenMetronome', ['GreenGunner', 'GreenGunner2']);
			GreenGunner.animations.add('Explosion', Phaser.Animation.generateFrameNames('Explosion', 1, 8), 24);
			GreenGunner.animations.play('GreenMetronome', 4.6, true);
			EnemyCount += 1;
		}
	},

	createGreenBombers: function(BomberType){

		for(var x = 1; x < 4; x++){

			var GreenBomber = GreenBombers.create(x*150, 150, 'sprites', BomberType);
			GreenBomber.anchor.setTo(0.5);
			GreenBomber.animations.add('GreenMetronome', ['GreenBomber', 'GreenBomber2']);
			GreenBomber.animations.play('GreenMetronome', 4.6, true);
			EnemyCount += 1;
		}
	},

	createGreenDiveBombers: function(DiveBomberType){

		for(var x = 1; x < 7; x++){

			var GreenDiveBomber = GreenDiveBombers.create(x*85, 350, 'sprites', DiveBomberType);
			GreenDiveBomber.anchor.setTo(0.5);
			GreenDiveBomber.animations.add('GreenMetronome', ['GreenDiveBomber', 'GreenDiveBomber2']);
			GreenDiveBomber.animations.play('GreenMetronome', 4.6, true);
			EnemyCount += 1;
		}
	},

	killGreenGunner: function(PlayerShot, GreenGunner){

		GreenGunner.animations.play('Explosion', 24);
		GreenGunner.kill();
		PlayerShot.kill();
		Gunner_Explosion.play();
		EnemyCount -= 1;
	},


	killGreenBomber: function(PlayerShot, GreenBomber){

		GreenBomber.kill();
		PlayerShot.kill();
		Bomber_Explosion.play();
		EnemyCount -= 1;
	},

	killGreenDiveBomber: function(PlayerShot, GreenDiveBomber){

		GreenDiveBomber.kill();
		PlayerShot.kill();
		Diver_Explosion.play();
		EnemyCount -= 1;
	},

	killDiveBomberDrill: function(PlayerShot, GreenDiveBomber){
			
		GreenDiveBomber.kill();
		PlayerShot.kill();
		Diver_Explosion.play();
	},

	killPlayer: function(EnemyBullet, Player){

		EnemyBullet.kill();
		Player.animations.play('Explosion');
		Player.kill();
		Player_Death.play();
		Track1A.fadeOut(3000, 0);
		Track1B.fadeOut(3000, 0);
		Track2A.fadeOut(3000, 0);
		Track2B.fadeOut(3000, 0);
		game.state.start('GameOver');
	}
}

