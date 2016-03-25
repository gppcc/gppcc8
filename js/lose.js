

JackDanger.OnLose = (function() {
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

        this.back = this.add.sprite(0,0, "onlose", null, this.hud);

        console.log(this.back.width);   
        
        
        this.loseText = this.add.bitmapText(this.world.width / 2, - 80, "bigYellow", "VERLOREN!", 60, this.hud);
        this.loseText.anchor.set(0.5);
        var tween = this.game.add.tween(this.loseText).to({
            y: this.world.height / 2
        }, 700, Phaser.Easing.Back.Out, true);

        this.turnDown();

        game.time.events.add(Phaser.Timer.SECOND * 1, this.addPushText, this);


    }

    Game.prototype.addPushText = function() {
        this.pushText = this.add.bitmapText(this.world.width / 2, this.world.height / 2 + 50, "bigYellow", "Mit C geht's weiter!", 30, this.hud);
        this.pushText.anchor.set(0.5);
        this.updateId.push(setInterval(function(){this.visible = !this.visible}.bind(this.pushText), 1000));
    }

    Game.prototype.render = function() {
    }

    Game.prototype.fallDown = function() {
        var tween = this.game.add.tween(this.back).to({
            y: this.world.height + 10
        }, 700, Phaser.Easing.Cubic.In, true, 500);
        //tween.onComplete.add(this.fallDown, this);
    }

    Game.prototype.turnDown = function() {
        var tween = this.game.add.tween(this.back).to({
            rotation: 1
        }, 5000, Phaser.Easing.Elastic.Out, true, 500);
        tween.onComplete.add(this.fallDown, this);
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





