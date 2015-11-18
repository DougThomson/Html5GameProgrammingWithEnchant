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
		this.mode = 0;
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
				if(this.frame >= 4) this.mode = 1;
				break;
			// droid is hiding in the hole
			case 1:
				this.frame--;
				// change mode after complely hiding
				if(this.frame <=0) this.mode = 0;
				break;

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