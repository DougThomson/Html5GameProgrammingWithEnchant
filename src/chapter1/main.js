enchant();
//var game;
window.onload = function() {
	game = new Core(320, 320);
	game.preload('../images/chara1.png')
	game.onload = function() {
		var bear = new Sprite(32, 32);
		bear.image = game.assets['../images/chara1.png'];
		bear.frame=4;
		bear.addEventListener(Event.ENTER_FRAME, function() {
			this.x += 2;
		});
		game.rootScene.addChild(bear);
	};
	
	game.start();
};