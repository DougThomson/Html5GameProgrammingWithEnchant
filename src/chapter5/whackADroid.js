enchant();
// number of appearances of droid
maxDroid = 30;
totalDroid = 16;
Pit = Class.create(Sprite, {
	initialize:function(x, y) {
		// call the sprite class (super class) constructor
		enchant.Sprite.call(this, 48, 48);
		this.image = game.assets['../images/mogura.png'];
		this.x = x;
		this.y = y;
		// define event listener to run every frame
		this.addEventListener('enterframe', this.tick);
		// define event listener for when the Droid gets whacked
		this.addEventListener('touchstart', this.hit);
		// set the droid mode to 2 (waiting) to start
		this.mode = 2;
		// set the next mode as 0 (appearing)
		this.nextMode = 0;
		// wait for a random number of (0 - 99) frames
		this.waitFor = game.frame  + rand(100);
		// stores info on whether or not the droid has been whacked
		this.currentlyWhacked = false;
		this.instanceName = "x=" + x + " y=" + y;
	},
	tick:function() {
		// onle change the frame every other frame
		// the return call ends the function
		if(game.frame %2 !=0 ) return;
		switch(this.mode) {
			// droid is appearing from the hole
			case 0:
				this.frame ++;
				// change mode after completely appearing
				if(this.frame >= 4) {
					// switch to mode 2 (waiting) after appearing
					this.mode = 2;
					// the mode to go to after mode 2 is mode 2 (hide)
					this.nextMode = 1;
					// set a random waiting time for 0 - 99 frames
					this.waitFor = game.frame + rand(100)
				}
				break;
			// droid is hiding in the hole
			case 1:
				this.frame--;
				// if droid is hidden...
				if(this.frame <= 0) {
					// switch to mode 2 (waiting)
					this.mode = 2;
					// the next mode should be mode 0 (appear)
					this.nextMode = 0;
					// set a random waiting time for 0-99 frames
					this.waitFor = game.frame + rand(100);
					// reset flag as the whacked Droid disappears
					this.currentlyWhacked = false;

					// reduce maximum amount of droids
					maxDroid--;
					// if the amount is exceeded the droid should not appear
					if(maxDroid <=0) {
						this.mode = 3;
						if(maxDroid <= -1 * totalDroid + 1) {
							game.end(scoreLabel.score, scoreLabel.text);
						}
					}
				}
				break;
			// droid is waiting
			case 2:
				// if the game's current frame is greater than
				// the set frame to wait for...
				if(game.frame > this.waitFor) {
					// make a transition to the next mode
					this.mode = this.nextMode;
					
				}
				break;

		}
		// whack droid
		
		
	},
	hit:function() {
		if(this.currentlyWhacked) return;

		// only when droid has appeared at least half-way
		if(this.frame >= 2) {
			this.currentlyWhacked = true;
			// droid after being whacked
			this.frame = 5;
			// switch to waiting mode
			this.mode = 2;
			this.nextMode = 1;
			// number of frames to wait is fixed at 10
			this.waitFor = game.frame + 100;
			// add score
			scoreLabel.add(1);
		}
	}
});

// scorelable class definition, extendin label class
ScoreLabel = Class.create(Label, {
	initialize : function(x, y) {
		// Call the Label class constructor
		enchant.Label.call(this, "SCORE:0");
		this.x = x;
		this.y = y;
		this.score = 0;
	},
	// Adds points to the score
	add : function(pts) {
		this.score += pts;
		// change the displayed score
		this.text = "SCORE:" + this.score;
	}
});


window.onload = function() {
	game = new Game(320, 320);
	// load droid image
	game.preload('../images/mogura.png');
	game.onload = function() {
		// display scorelabel
		scoreLabel = new ScoreLabel(5, 5);
		game.rootScene.addChild(scoreLabel);

		// line up holes in a 4 x 4 matrix
		for(var y = 0; y < 4; y++) {
			for(var x=0; x < 4; x++) {
				var pit = new Pit(x * 48 +20, y * 48 + 20);
				game.rootScene.addChild(pit);
			}
		}

		// // random holes on the screen
		// for(var i = 0;i < 7; i++) {
		// 	var pit = new Pit(rand(300), rand(300));
		// 	game.rootScene.addChild(pit);
		// }
	}
	game.start();
};

rand = function(n) {
	return Math.floor(Math.random() * n);
};

























