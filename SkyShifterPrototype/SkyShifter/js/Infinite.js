
// initialize Play state
var Infinite = function() {
	
};
Infinite.prototype = {
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
		livingBlueGunners = [];
		livingBlueBombers = [];
		livingBlueDiveBombers = [];
		this.shoot2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


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
		
		Player = game.add.sprite(PlayerX, PlayerY, 'sprites', 'Player');
		game.physics.arcade.enable(Player);
		Player.body.collideWorldBounds = true;
		Player.anchor.setTo(0.5);


		GreenGunnerBullets = game.add.group();
		GreenGunnerBullets.enableBody = true;
		GreenGunnerBullets.physicsBodyType = Phaser.Physics.ARCADE;
		GreenGunnerBullets.createMultiple(30, 'sprites', 'GunnerBullet');
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
		GreenDiveBomberBullets.createMultiple(30, 'sprites', 'GreenDiveBomber');
		GreenDiveBomberBullets.setAll('anchor.x', 0.5);
		GreenDiveBomberBullets.setAll('anchor.x', 0.5);
		GreenDiveBomberBullets.setAll('outOfBoundsKill', true);
		GreenDiveBomberBullets.setAll('checkWorldBounds', true);

		BlueGunnerBullets = game.add.group();
		BlueGunnerBullets.enableBody = true;
		BlueGunnerBullets.physicsBodyType = Phaser.Physics.ARCADE;
		BlueGunnerBullets.createMultiple(30, 'sprites', 'GunnerBullet');
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
		BlueDiveBomberBullets.createMultiple(30, 'sprites', 'BlueDiveBomber');
		BlueDiveBomberBullets.setAll('anchor.x', 0.5);
		BlueDiveBomberBullets.setAll('anchor.x', 0.5);
		BlueDiveBomberBullets.setAll('outOfBoundsKill', true);
		BlueDiveBomberBullets.setAll('checkWorldBounds', true);



		GreenGunners = game.add.group();
		GreenGunners.enableBody = true;
		GreenGunners.physicsBodyType = Phaser.Physics.ARCADE;

		GreenBombers = game.add.group();
		GreenBombers.enableBody = true;
		GreenBombers.physicsBodyType = Phaser.Physics.ARCADE;

		GreenDiveBombers = game.add.group();
		GreenDiveBombers.enableBody = true;
		GreenDiveBombers.physicsBodyType = Phaser.Physics.ARCADE;


		BlueGunners = game.add.group();
		BlueGunners.enableBody = true;
		BlueGunners.physicsBodyType = Phaser.Physics.ARCADE;

		BlueBombers = game.add.group();
		BlueBombers.enableBody = true;
		BlueBombers.physicsBodyType = Phaser.Physics.ARCADE;

		BlueDiveBombers = game.add.group();
		BlueDiveBombers.enableBody = true;
		BlueDiveBombers.physicsBodyType = Phaser.Physics.ARCADE;

		this.createGunners();
		this.createBombers();
		this.createDiveBombers();

		PlayerBullets = game.add.group();
		PlayerBullets.enableBody = true;

		PlayerBulletSpreads = game.add.group();
		PlayerBulletSpreads.enableBody = true;
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


		if(game.time.now > firingTimer110){

			this.GreenBomberFires();
			this.GreenGunnerFires();
			this.GreenDiveBomberDives();
			this.BlueBomberFires();
			this.BlueGunnerFires();
			this.BlueDiveBomberDives();
		}

		if(game.time.now > 0){
			if(EnemyCount == 0){

			this.createGunners();
			this.createBombers();
			this.createDiveBombers();
			}
		}


		game.physics.arcade.overlap(GreenGunners, PlayerBullets, this.killGreenGunner, null, this);
		game.physics.arcade.overlap(GreenGunners, PlayerBulletSpreads, this.killGreenGunner, null, this);
		game.physics.arcade.overlap(GreenBombers, PlayerBullets, this.killGreenBomber, null, this);
		game.physics.arcade.overlap(GreenBombers, PlayerBulletSpreads, this.killGreenBomber, null, this);
		game.physics.arcade.overlap(GreenDiveBombers, PlayerBullets, this.killGreenDiveBomber, null, this);
		game.physics.arcade.overlap(GreenDiveBombers, PlayerBulletSpreads, this.killGreenDiveBomber, null, this);
		game.physics.arcade.overlap(GreenDiveBomberBullets, PlayerBullets, this.killGreenDiveBomberBullets, null, this);
		game.physics.arcade.overlap(GreenDiveBomberBullets, PlayerBulletSpreads, this.killGreenDiveBomberBullets, null, this);

		game.physics.arcade.overlap(BlueGunners, PlayerBullets, this.killBlueGunner, null, this);
		game.physics.arcade.overlap(BlueGunners, PlayerBulletSpreads, this.killBlueGunner, null, this);
		game.physics.arcade.overlap(BlueBombers, PlayerBullets, this.killBlueBomber, null, this);
		game.physics.arcade.overlap(BlueBombers, PlayerBulletSpreads, this.killBlueBomber, null, this);
		game.physics.arcade.overlap(BlueDiveBombers, PlayerBullets, this.killBlueDiveBomber, null, this);
		game.physics.arcade.overlap(BlueDiveBombers, PlayerBulletSpreads, this.killBlueDiveBomber, null, this);
		game.physics.arcade.overlap(BlueDiveBomberBullets, PlayerBullets, this.killBlueDiveBomberBullets, null, this);
		game.physics.arcade.overlap(BlueDiveBomberBullets, PlayerBulletSpreads, this.killBlueDiveBomberBullets, null, this);

		game.physics.arcade.overlap(GreenGunnerBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(GreenBomberBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(GreenDiveBomberBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(BlueGunnerBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(BlueBomberBullets, Player, this.killPlayer, null, this);
		game.physics.arcade.overlap(BlueDiveBomberBullets, Player, this.killPlayer, null, this);
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


		if(game.input.keyboard.isDown(TempoShiftUp)){

			if(Tempo == 140){

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

		if(game.input.keyboard.isDown(TempoShiftDown)){

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




		if(this.shoot2.isDown){

			if( Rhythm == 44){
				if(!Fired){
					for(var i = 0; i < 4; i++){
						var PlayerBullet = PlayerBullets.create(Player.x, Player.y - (i*15), 'sprites', 'PlayerBullet');
						PlayerBullet.anchor.setTo(0.5);
						game.physics.arcade.enable(PlayerBullet);
						PlayerBullet.body.velocity.y = -500;
						Player_Laser.play();
					}
					Fired = true;
				}
			} else if (Rhythm == 74){
				if(!Fired){
					bulletY1 = -400/2;
					bulletY2 = -600/2;
					bulletX1 = -300/2;
					bulletX2 = 100/2;

					for(var i = 0; i < 3; i++){
						var PlayerBulletSpread = PlayerBulletSpreads.create(Player.x, Player.y, 'sprites', 'PlayerBullet');
						PlayerBulletSpread.anchor.setTo(0.5);
						game.physics.arcade.enable(PlayerBulletSpread);
						PlayerBulletSpread.body.velocity.y = bulletY1;
						PlayerBulletSpread.body.velocity.x = bulletX1;
						bulletY1 -= 100/2;
						bulletX1 += 100/2;
					}

					var PlayerBulletSpread = PlayerBulletSpreads.create(Player.x, Player.y, 'sprites', 'PlayerBullet');
					PlayerBulletSpread.anchor.setTo(0.5);
					game.physics.arcade.enable(PlayerBulletSpread);
					PlayerBulletSpread.body.velocity.y = -700/2;
					Player_Laser.play();

					for(var i = 0; i < 3; i++){
						var PlayerBulletSpread = PlayerBulletSpreads.create(Player.x, Player.y, 'sprites', 'PlayerBullet');
						PlayerBulletSpread.anchor.setTo(0.5);
						game.physics.arcade.enable(PlayerBulletSpread);
						PlayerBulletSpread.body.velocity.y = bulletY2;
						PlayerBulletSpread.body.velocity.x = bulletX2;
						bulletY2 += 100/2;
						bulletX2 += 100/2;		
					}

					Fired = true;
				}	
			}

		}

		if(this.shoot2.isUp){

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

			GreenGunnerBullet.reset(shooter.body.x, shooter.body.y);

			GreenGunnerBullet.body.velocity.y = 140;
			Enemy_Laser.play();
			firingTimer110 = game.time.now + 545;
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

			BlueGunnerBullet.reset(shooter.body.x, shooter.body.y);

			BlueGunnerBullet.body.velocity.y = 174;
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


	BlueBomberFires: function(){

		BlueBomberBullet = BlueBomberBullets.getFirstExists(false);

		livingBlueBombers.length=0;
		BlueBombers.forEachAlive(function(BlueBomber){

			livingBlueBombers.push(BlueBomber);
		});

		if( BlueBomberBullet && livingBlueBombers.length > 0){

			var random = game.rnd.integerInRange(0, livingBlueBombers.length-1);

			var shooter = livingBlueBombers[random];

			BlueBomberBullet.reset(shooter.body.x, shooter.body.y);

			game.physics.arcade.moveToObject(BlueBomberBullet, Player, 174);
			firingTimer110 = game.time.now + 2180;
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
			firingTimer110 = game.time.now + 4360;
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
			firingTimer110 = game.time.now + 4360;
		}
	},


	createGunners: function(){

		for(var x = 1; x < 10; x++){

			var rng = game.rnd.integerInRange(0, 1);

			if(rng == 0){
				var GreenGunner = GreenGunners.create(x*60, 250, 'sprites', 'GreenGunner');
				GreenGunner.anchor.setTo(0.5, 0.5);
				EnemyCount += 1;
			} else if( rng == 1){
				var BlueGunner = BlueGunners.create(x*60, 250, 'sprites', 'BlueGunner');
				BlueGunner.anchor.setTo(0.5, 0.5);
				EnemyCount+=1;
			}
		}
	},

	createBombers: function(){

		for(var x = 1; x < 4; x++){

			var rng = game.rnd.integerInRange(0, 1);

			if(rng == 0){
				var GreenBomber = GreenBombers.create(x*150, 150, 'sprites', 'GreenBomber');
				GreenBomber.anchor.setTo(0.5, 0.5);
				EnemyCount += 1;
			} else if( rng == 1){
				var BlueBomber = BlueBombers.create(x*150, 150, 'sprites', 'BlueBomber');
				BlueBomber.anchor.setTo(0.5, 0.5);
				EnemyCount+=1;
			}
		}
	},

	createDiveBombers: function(){

		for(var x = 1; x < 7; x++){

			var rng = game.rnd.integerInRange(0, 1);

			if(rng == 0){
				var GreenDiveBomber = GreenDiveBombers.create(x*85, 350, 'sprites', 'GreenDiveBomber');
				GreenDiveBomber.anchor.setTo(0.5, 0.5);
				EnemyCount += 1;
			} else if( rng == 1){
				var BlueDiveBomber = BlueDiveBombers.create(x*85, 350, 'sprites', 'BlueDiveBomber');
				BlueDiveBomber.anchor.setTo(0.5, 0.5);
				EnemyCount += 1;
			}


		}
	},

	killGreenGunner: function(PlayerShot, GreenGunner){

		if( Tempo == 140){
			GreenGunner.kill();
			PlayerShot.kill();
			Gunner_Explosion.play();
			EnemyCount -= 1;
		}
	},


	killGreenBomber: function(PlayerShot, GreenBomber){

 	if( Tempo == 140){
			GreenBomber.kill();
			PlayerShot.kill();
			Bomber_Explosion.play();
			EnemyCount -= 1;
		}
	},

	killGreenDiveBomber: function(PlayerShot, GreenDiveBomber){

		if( Tempo == 140){
			GreenDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
			EnemyCount -= 1;
		}
	},

	killGreenDiveBomberBullets: function(PlayerShot, GreenDiveBomber){

		if( Tempo == 140){
			GreenDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
		}
	},


	killBlueGunner: function(PlayerShot, BlueGunner){

		if( Tempo == 174){
			BlueGunner.kill();
			PlayerShot.kill();
			Gunner_Explosion.play();
			EnemyCount -= 1;
		}
	},


	killBlueBomber: function(PlayerShot, BlueBomber){

 	if( Tempo == 174){
			BlueBomber.kill();
			PlayerShot.kill();
			Bomber_Explosion.play();
			EnemyCount -= 1;
		}
	},

	killBlueDiveBomber: function(PlayerShot, BlueDiveBomber){

		if( Tempo == 174){
			BlueDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
			EnemyCount -= 1;
		}
	},

	killBlueDiveBomberBullets: function(PlayerShot, BlueDiveBomber){

		if( Tempo == 174){
			BlueDiveBomber.kill();
			PlayerShot.kill();
			Diver_Explosion.play();
		}
	},



	killPlayer: function(EnemyBullet, Player){

		EnemyBullet.kill();
		Player.kill();
		Player_Death.play();
		Track1A.stop();
		Track1B.stop();
		Track2A.stop();
		Track2B.stop();
		game.state.start('GameOver');
	}
}

