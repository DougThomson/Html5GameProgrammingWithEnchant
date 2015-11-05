enchant();

window.onload = function() {
	var game = new Core(320, 320);

	game.addLabel = function(text, font, color, x, y) {
		console.log('colour = ' + color);
		var label = new Label(text);
		label.font = font;
		label.color = color;
		label.x = x;
		label.y = y;
		game.rootScene.addChild(label);
	}
	
	game.addLabel("50 points", "16px sans-serif", "rgb(255, 0, 0)", 50, 50);
	game.addLabel("100 points", "16px sans-serif", "rgb(50, 0, 100)", 50, 200);
		game.rootScene.addEventListener(Event.ENTER_FRAME, function () {
			
			var score = rand(100);
			var r = rand(256);
			var g = rand(256);
			var b = rand(256);
			var x = rand(300);
			var y = rand(300);
			game.addLabel(score + " Points", "16px sans-serif", "rgb(" + r + ", " + g + ", " + b + ")", x, y);
		});
		

	game.start();
};

function rand(num) {
	return Math.floor(Math.random() * num);
}