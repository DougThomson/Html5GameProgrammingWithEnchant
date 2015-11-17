enchant();
window.onload = function() {
	var game = new Core(320, 320);
	game.fps = 16;
	game.score = 0;
	game.bananaNum = 10;
	game.time = 0;
	game.preload(['../sounds/se1.wav', '../images/icon0.png', '../images/map0.png']);

	// called when the loading is complete
	game.onload = function() {
		game.se = game.assets['../sounds/se1.wav'];
		var bg = new Sprite(320, 320);
		var maptip = game.assets['../images/map0.png'];
		var image = new Surface(320, 320);
		for (var j = 0; j<320; j+=16) {
			for(var i=0; i < 320; i +=16) {	
				image.draw(maptip, 16*2, 0, 16, 16, i, j, 16, 16);
			}
		}
		bg.image= image;
		game.rootScene.addChild(bg);

		// Add bananas
		for(var k = 0; k < 10; k++) game.addBanana();

		// add skull
		game.addDokuro();

		// periodic scene processing
		game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
			game.time++;
		});
	};

	// adds a skull
	game.addDokuro = function() {
		var dokuro = new Sprite(16, 16);
		dokuro.x = rand(260) +20;
		dokuro.y = rand(260 )+20;
		dokuro.image = game.assets['../images/icon0.png'];
		dokuro.frame = 11;
		dokuro.addEventListener(Event.TOUCH_START, function(e) {
			game.end(0, "Gamer Over");
		});
		game.rootScene.addChild(dokuro);
	};

	// adds a banana
	game.addBanana = function() {
		var banana = new Sprite(16, 16);
		banana.x = rand(260) + 20;
		banana.y = rand(260) +20;
		banana.image = game.assets['../images/icon0.png'];
		banana.frame = 16;

		banana.addEventListener(Event.TOUCH_START, function(e) {
			game.se.play();
			game.rootScene.removeChild(this);


			game.babaNum--;
			if(game.banaNum ===0) {
				game.end(1000000 - game.time,
					(game.time / game.fps).toFixed(2) + " seconds to clear!");
			}
		});
		game.rootScene.addChild(banana);	
	};

	game.start();
};

function rand(num) {
	return Math.floor(Math.random() * num);
}





































