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

 Enemy = enchant.Class.create(enchant.Sprite, {
 	initialize : function(x, y, theta) {
 		enchant.Sprite.call(this, 16, 16);
 		this.image = game.assets['../images/graphic.png'];
 		this.x = x;
 		this.y = y;
 		this.frame = 3;
 		this.theta = theta * Math.PI / 180;
 		this.direction = 0;
 		this.moveSpeed = 3;
// define enemy movement
 		this.addEventListener('enterframe', function() {
 			this.direction += this.theta;
 			this.x -= this.moveSpeed * Math.cos(this.direction);
 			this.y += this.moveSpeed * Math.sin(this.direction);
 			// Dissappear when outside of screen
 			if(this.y > 320 || this.x > 320 || this.x < -this.width|| this.y < -this.height) {
 				this.remove();
 			}else if(this.age % 10 === 0) { //fire every 10 frames
 				var s = new EnemyShoot(this.x, this.y);
 			}
 		});

 		game.rootScene.addChild(this);

 	},
 	remove : function() {
 		game.rootScene.removeChild(this);
 		delete enemies[this.key];
 		delete this;
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

/*var book has this, I tried without seeing as Shoot and Player don't use it
 */ PlayerShoot = enchant.Class.create(Shoot, { // succeeds bullet class
	initialize: function(x, y) {
		Shoot.call(this, x, y, 0);

		this.addEventListener('enterframe', function() {
			// Jusdges whether or not players bullets have hit enemy 
			for(var i in enemies) {
				if(enemies[i].intersect(this)) {
					// Eliminates enemy if hit
					this.remove();
					enemies[i].remove();
					// adds to score
					game.score += 100;
				}
			}
		});
	}
});

// Class for enemy bullets
EnemyShoot = enchant.Class.create(Shoot, { //Succeeds bullet class
	initialize : function(x, y) {
		Shoot.call(this, x, y, Math.PI);
		this.addEventListener('enterframe', function() {
			if(player.within(this, 8)) {
				game.end(game.score, "SCORE: " + game.score);
			}
		});
	}
});


window.onload = function() {
	game = new Core(320, 320);
	// In-Game Variables and properties
	game.fps = 24;
	game.preload('../images/graphic.png');
	game.touched = false;
	enemies = [];

	game.rootScene.addEventListener('enterframe', function() {
		if(Math.random() * 100 < 10) {
			var y = Math.random() * 320;
			if ( y < 160) {
				theta = 1;
			} else {
				theta = -1;
			}
			var enemy = new Enemy(320, y, theta);
			enemy.key = game.frame;
			enemies[game.frame] = enemy;
		}

		scoreLabel.score = game.score;
	});

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







































