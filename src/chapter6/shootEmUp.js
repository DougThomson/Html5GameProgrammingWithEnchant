enchant();
// Class Definitions
Player = enchant.Class.create(enchant.Sprite, {
	initialize : function(x, y) {
		enchant.Sprite.call(this, 16, 16);
		this.image = game.assets['../images/graphic.png'];
		this.x = x;
		this.y = y;
		this.frame = 0;

		game.rootScene.addEventListener('touchstart', 
			function(e) {player.y = e.y; game.touched = true; });
		game.rootScene.addEventListener('touchend',
			function(e) { player.y = e.y; game.touched = false; });
		game.rootScene.addEventListener('touchmove',
			function(e) { player.y = e.y; });

		this.addEventListener('enterframe', function() {
			console.log('game.touched=', game.touched);
			console.log('game.frame % 3=, ', game.frame % 3 );
			 if(game.frame % 3 === 0 && game.touched) {
				var s = new PlayerShoot(this.x, this.y);
			}
		});

		game.rootScene.addChild(this);

	}
});

Shoot = enchant.Class.create(enchant.Sprite, {
	initialize : function(x, y, direction) {
		enchant.Sprite.call(this, 16, 16);
		this.image = game.assets['../images/graphic.png'];
		this.x = x;
		this.y = y;
		this.frame = 1;
		this.direction = direction;
		this.moveSpeed = 10;

		this.addEventListener('enterframe', function() {
			this.x += this.moveSpeed * Math.cos(this.direction);
			this.y += this.moveSpeed * Math.sin(this.direction);

			if(this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
				this.remove();
			}
		});

		game.rootScene.addChild(this);
	},
	remove : function() {
		game.rootScene.removeChild(this);
		delete this;
	}
});

var PlayerShoot = enchant.Class.create(Shoot, { // succeeds bullet class
	initialize: function(x, y) {
		Shoot.call(this, x, y, 0);
	}
});

window.onload = function() {
	game = new Core(320, 320);
	// game properties
	game.fps = 24;
	game.preload('../images/graphic.png');
	game.touched = false;

	game.onload  = function() {
		// in-game variable and properties
		game.rootScene.backgroundColor =  'black';
		game.score = 0;
		scoreLabel = new ScoreLabel(8, 8);
		game.rootScene.addChild(scoreLabel);
		player = new Player(0, 152);
		poo = new enchant.Sprite();

	};

	game.start();
};







































