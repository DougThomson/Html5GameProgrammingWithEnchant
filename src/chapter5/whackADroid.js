enchant();
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
				// change mode after complely hiding
				if(this.frame <= 0) {
					// switch to mode 2 (waiting)
					this.mode = 2;
					// the next mode should be mode 0 (appear)
					this.nextMode = 0;
					// set a random waiting time for 0-99 frames
					this.waitFor = game.frame + rand(100);
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
			// only when droid has appeared at least half-way
			if(this.frame >= 2) {
				// droid after being whacked
				this.frame = 5;
				// switch to waiting mode
				this.mode = 2;
				this.netMode = 1;
				// number of frames to wait is fixed at 10
				this.waitFor = game.frame + 10;
			}
	}
});

window.onload = function() {
	game = new Game(320, 320);
	// load droid image
	game.preload('../images/mogura.png');
	game.onload = function() {
		var pit = new Pit(100, 100);
		game.rootScene.addChild(pit);
	}
	game.start();
};

rand = function(n) {
	return Math.floor(Math.random() * n);
};

























