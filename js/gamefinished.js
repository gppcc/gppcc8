

JackDanger.GameFinished = (function() {
    var Game = function(){};

    Game.prototype.init = function() {
    }

    Game.prototype.preload = function() {
    }

    //wird nach dem laden gestartet
    Game.prototype.create = function() {
        Pad.init();//nicht anfassen

        this.updateId = [];

        this.stage.backgroundColor = 0xff0000;

        this.hud = this.add.group();
        this.hud.fixedToCamera = true;
        this.world.setBounds(0,0,800,450);

           
        
        
        this.loseText = this.add.bitmapText(this.world.width / 2, - 80, "bigYellow", "GESCHAFFT!", 60, this.hud);
        this.loseText.anchor.set(0.5);
        var tween = this.game.add.tween(this.loseText).to({
            y: this.world.height / 2
        }, 700, Phaser.Easing.Back.Out, true, 2000);

       

        game.time.events.add(Phaser.Timer.SECOND * 2, this.addPushText, this);

        this.back = this.add.sprite(this.world.width / 2, this.world.height / 2, "onlose", null, this.hud);
        this.back.anchor.set(0.5);
         this.goFrame();

    }

    Game.prototype.addPushText = function() {
        this.pushText = this.add.bitmapText(this.world.width / 2, this.world.height / 2 + 50, "bigYellow", "Mit C geht's weiter!", 30, this.hud);
        this.pushText.anchor.set(0.5);
        this.updateId.push(setInterval(function(){this.visible = !this.visible}.bind(this.pushText), 1000));
    }

    Game.prototype.render = function() {
    }

    

    Game.prototype.goFrame = function() {
        var tween = this.game.add.tween(this.back).to({rotation: Math.PI * 1.9, x: 100, y: 100}, 2000, Phaser.Easing.Back.Out, true, 500);
        var tween = this.game.add.tween(this.back.scale).to({x: 0.3, y: 0.3}, 2000, Phaser.Easing.Back.InOut, true, 500);
    }

    

    //wird jeden Frame aufgerufen
    Game.prototype.update = function() {
        if (Pad.justDown(Pad.JUMP)) {
            for (var i = 0; i < this.updateId.length; i++) {
                clearInterval(this.updateId[i]);
            };
            JackDanger.reloadLevel();
        }
    }

    

    return Game;

})();





