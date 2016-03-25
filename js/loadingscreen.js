JackDanger.LoadingScreen = function(gameState, skip){
	this.gameState = gameState;
	this.skip = skip;

	if (JackDanger.isReload) {
		this.skip = true;
		return;
	}

	this.hud = gameState.add.group();
	this.hud.fixedToCamera = true;
	gameState.world.setBounds(0,0,800,450);

	this.back = gameState.add.sprite(0,0, "loadingback", null, this.hud);	
	
	
	this.loadingText = gameState.add.bitmapText(gameState.world.width / 2 + 50, gameState.world.height - 40, "bigYellow", "0%", 30, this.hud);
	this.loadingText.anchor.set(0.5);

	this.gameNameText = gameState.add.bitmapText(gameState.world.width / 2 - 110, 145, "bigYellow", currentGameData.name, 60, this.hud);


	this.devText = gameState.add.bitmapText(gameState.world.width / 2 - 110, 210, "white", "von " + currentGameData.developerName, 20, this.hud);

	this.adviceText = gameState.add.bitmapText(gameState.world.width / 2 + 100, 40, "white", "" + currentGameData.tutorialText, 25, this.hud);
	this.adviceText.tint = 0x323457;
	this.adviceText.anchor.set(0.5);

	this.controlsText = gameState.add.bitmapText(gameState.world.width / 2  - 20, 296, "white", "" + currentGameData.cursorText, 20, this.hud);
	this.jumpText = gameState.add.bitmapText(gameState.world.width / 2  + 180, 272, "white", "" + currentGameData.jumpText, 20, this.hud);
	this.shootText = gameState.add.bitmapText(gameState.world.width / 2  + 180, 318, "white", "" + currentGameData.shootText, 20, this.hud);


}

JackDanger.snapShot = false;
JackDanger.isLosed = false;

JackDanger.fakeRender = function(render) {
	var r = function() {
		if (JackDanger.snapShot) {
			console.log("taka a snap");
			JackDanger.snapShot = false;
			var dataURI = this.game.canvas.toDataURL();
		    var data = new Image();
		    data.src = dataURI;

		    game.paused = true;

		    data.onload=function(){
		    	game.paused = false;
            	game.cache.addImage('onlose', dataURI, data);
	            game.state.start(JackDanger.isLosed ? 'OnLose' : 'Gamefinished', true, false);
            }

		}
		render();
	}

	return r;
}


JackDanger.LoadingScreen.prototype = {
	add: function() {
		game.paused = true;
		this.updateId = [];
	},

	update: function(progress) {
		if (this.loadingText) this.loadingText.setText(progress.toFixed(0) + "%");
		if (progress == 100) {
			if (this.skip) {
				this.remove();
			} else {
				this.updateId.push( setInterval(this.onUpdate.bind(this), 50) );
				this.loadingText.setText("Drücke C zum Starten");
				this.updateId.push(setInterval(function(){this.visible = !this.visible}.bind(this.loadingText), 1000));
			}
			
		}
		
	},

	onUpdate: function() {
		if (Pad.justDown(Pad.JUMP)) {
			this.remove();
		}
	},

	remove: function() {
		if (JackDanger.isReload == false) {
			this.hud.destroy();
		}
		

		for (var i = 0; i < this.updateId.length; i++) {
			clearInterval(this.updateId[i]);
		};

		this.gameState.mycreate();
		game.paused = false;
	}
}
