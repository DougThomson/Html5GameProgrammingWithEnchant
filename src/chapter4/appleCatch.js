enchant();
window.onload = function() {
	// game object creation
	var game = new Core(320, 320);
	game.fps = 16;
	game.score = 0;
	var label;
	var bear;

	// image loading
	game.preload('../images/chara1.png', '../images/map0.png', '../images/icon0.png')

	// called when loading is complete
	game.onload = function() {
		// background creation
		var bg = new Sprite(320, 320);
		bg.backgroundColor = "rgb(0, 200, 255)";
		var maptip = game.assets['../images/map0.png'];
		var image = new Surface(320, 320);
		for(var i = 0; i < 320; i += 16) {
			image.draw(maptip, 7 * 16, 0, 16, 16, i, 320 - 16, 16, 16);
		}
		bg.image = image;
		game.rootScene.addChild(bg);
		// virtual pad creation
		var pad = new Pad();
		pad.x = 0;
		pad.y = 220;
		game.rootScene.addChild(pad);

		// label creation
		label = new Label("");
		game.rootScene.addChild(label);

		// bear creation
		bear = new Sprite(32, 32);
		bear.image = game.assets['../images/chara1.png'];
		bear.x = 160 - 16;
		bear.y = 320 - 16 -32;
		bear.anim = [10, 11,10,12];
		bear.frame = bear.anim[0];
		game.rootScene.addChild(bear);

		// periodic processing of the bear sprite
		bear.addEventListener(Event.ENTER_FRAME, function() {
			// left
			if(game.input.left) {
				bear.x -= 3;
				bear.scaleX = -1;
			}
			// right
			else if(game.input.right) {
				bear.x +=3;
				bear.scaleX = 1;
			}

			// frame settings 
			if(!game.input.left && !game.input.right) {
				bear.frame = bear.anim[0];
			} else {
				bear.frame = bear.anim[bear.age % bear.anim.length];
			}
		});
	};

	// adds an apple
	game.addApple = function(x, speed) {
		// create apple
		var apple = new Sprite(16, 16);
		apple.image = game.assets['../images/icon0.png'];
		apple.x = x;
		apple.y = -16;
		apple.frame = 15; 
		apple.speed  = speed;
		game.rootScene.addChild(apple);

		// periodic processing of the sprite
		apple.addEventListener(Event.ENTER_FRAME, function() {
			apple.y += apple.speed;
			// collision with bear
			// if(bear.within(apple, 16)) {
			if(bear.intersect(apple)) {
				game.score += 30;
				game.rootScene.removeChild(apple);
			}
			// collision with ground
			else if(apple.y > 320 - 32) {
				game.rootScene.removeChild(apple);
			}
		});
	};
	//Periodic processing of the scene
	game.framesLeft = 10 * game.fps; //10 seconds
	game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		game.framesLeft--;
		if(game.framesLeft > 0){
			// apple creation
			if(game.frame % 10 === 0) {
				var x = rand(300);
				var speed = 3 + rand(6);
				game.addApple(x, speed);
			}
			label.text = "Time left:" + Math.floor(game.framesLeft / game.fps) +
				"<BR />Score:" + game.score;
		} else {
			// display game over
			 
			console.log(game.score, "Your score is " + game.score);
			 // game.end(game.score, "Your score is " + game.score);
			 game.end(game.score, "Your score is " + game.score);
		}
	});

	// start game
	game.start();
};

function rand(num) {
	return Math.floor(Math.random() * num);
}









































