enchant();
window.onload = function() {
	// core object creation
	var game = new Core(320, 320);
	game.fps = 16;

	// image loading
	game.preload('../images/bg01.jpg', '../images/bg02.jpg', '../images/bg03.jpg');
	// called when pre-loading is complete
	game.onload = function() {
		// background creation
		var bg = makeBackground(game.assets['../images/bg01.jpg']);
		game.rootScene.addChild(bg);

		// message creation
		var select = makeSelect("[Move to scene 1]", 320 - 32 * 2);
		select.addEventListener(Event.TOUCH_START, function(e) {
			game.pushScene(game.makeScene1());
		});
		game.rootScene.addChild(select);
	};
		// scene 1 creation
		game.makeScene1 = function() {
			var scene = new Scene();
			// background creation
			var bg = makeBackground(game.assets['../images/bg02.jpg']);
			scene.addChild(bg);

			// message creation
			scene.addChild(makeMessage("This is Scene 1."));

			// choice button creation
			var select = makeSelect("[Move to scene 2]", 320 - 32 * 2);
			select.addEventListener(Event.TOUCH_START, function(e) {
				game.pushScene(game.makeScene2());
			});
			scene.addChild(select);
			scene.addChild(makeReturn(1));
			return scene;
		};

		// scene 2 creation
		game.makeScene2 = function() {
			var scene = new Scene();

			// background creation 
			var bg = makeBackground(game.assets['../images/bg03.jpg']);
			scene.addChild(bg);

			// label creation
			scene.addChild(makeMessage("This is scene 2"));
			scene.addChild(makeReturn(0));
			return scene;
		};

		// start game
		game.start();
	};

	// background creation
	function makeBackground(image) {
		var bg = new Sprite(320, 320);
		bg.image = image;
		return bg;
	}
	// message creation
	function makeMessage(text) {
		var label = new Label(text);
		label.font = "16px monospace";
		label.color = "rgb(255,255,255)";
		label.backgroundColor = "rgba(0,0,0,0.6)";
		label.y = 320 -32 *3;
		label.width = 320;
		label.height = 32 * 3;
		return label;
	}

	// choice button creation
	function makeSelect(text, y) {
		var label = new Label(text);
		label.font = "16px monospace";
		label.color = "rgb(255,200,0";
		label.y = y;
		label.width = 320;
		return label;
	}

	// return button creation
	function makeReturn(lineNumber) {
		var game = enchant.Game.instance;
		var returnLabel = makeSelect("[Return]", 320 -32 * (2-lineNumber));
		returnLabel.addEventListener(Event.TOUCH_START, function(e) {
			game.popScene();
		});
		return returnLabel;
	}





































