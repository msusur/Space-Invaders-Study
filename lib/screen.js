(function (window) {
	// constructor for screen.

	var loopTimer = 15;

	var Screen = window.Screen = function (ctx, gameState) {
		this.ctx = ctx;
		this.gameState = gameState;
	};

	// Game loop for rendering purpose. If the algorithm parameter is set as a function then execute it with context.
	Screen.prototype.render = function (algorithm) {
		var ctx = this.ctx,
			gameState = this.gameState,
			elements = this.gameState.getElements();
		setInterval(function () {
			ctx.fillStyle = "#000000"
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			// iterate all elements in the collection.
			for (var idx = 0; idx < elements.length; idx += 1) {
				var sprite = elements[idx];
				sprite.Move();
				// if the current element has a location & sprite to display start rendering.
				if (sprite.Sprite) {//removed && sprite.X && sprite.Y because starting alien from 0
					if (sprite.DrawState === 0 || sprite.DrawState === 1) {
						ctx.drawImage(sprite.Sprite, sprite.DrawState * sprite.width, 0, sprite.width, sprite.height, sprite.X, sprite.Y, sprite.width, sprite.height);
					}
					else {
						ctx.drawImage(sprite.Sprite, sprite.X, sprite.Y);
					}
					if (sprite.sprite && sprite.x && sprite.y) {
						ctx.drawImage(sprite.sprite, sprite.x, sprite.y);
						// if sprite is a disposable one then start counting for it.
						if (sprite.disposable) {
							sprite.displayTime += loopTimer;
							if (sprite.displayTime > sprite.totalTime) {
								// if the countdown finishes then remove the element from collection.
								gameState.remove(idx);
							}
						}
					}
				}
			}
		}, loopTimer);
	};

})(window);