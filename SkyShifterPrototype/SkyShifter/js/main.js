// initialize Phaser
var game = new Phaser.Game(600, 1000);

//global vars
var Player, Bomber110, Bomber174, Gunner110, Gunner174, DiveBomber110, DiveBomber174, PlayerX, PlayerY, Tempo, Rhythm;
var Fired, shoot, FirstBomberX, FirstBomberY, FirstGunnerX, FirstGunnerY, FirstDiveBomberX, FirstDiveBomberY;
var firingTimerGunners, firingTimerBombers, firingTimerDivers, livingGreenGunner, GreenGunnerBullet, GreenDiveBomberBullet, EnemyCount;
var CurrentTrack, shoot2, spaceGreen, spaceBlue;
var Score = 0;

const PlayerLeft = Phaser.Keyboard.Left;
const PlayerRight = Phaser.Keyboard.Right;
const TempoShiftDown = Phaser.Keyboard.Down;
const TempoShiftUp = Phaser.Keyboard.Up;
const RhythmShiftDown = Phaser.Keyboard.A;
const RhythmShiftUp = Phaser.Keyboard.D;

//state management
game.state.add('Load', Load);
game.state.add('MainMenu', MainMenu);
game.state.add('Instruction1', Instruction1);
game.state.add('LevelOne', LevelOne);
game.state.add('Instruction2', Instruction2);
game.state.add('LevelTwo', LevelTwo);
game.state.add('Instruction3', Instruction3);
game.state.add('Infinite', Infinite);
game.state.add('GameOver', GameOver);
game.state.start('Load');

