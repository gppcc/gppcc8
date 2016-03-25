/*
Hallo!
Das hier ist deine Spielevorlage!
Ich hoffe, ich habe alles gut genug dokumentiert.

Alles was hier MyGame heißt musst du umbenennen in etwas sehr
individuelles. So wie KotzeMannGRKDM
Die wirren Buchstaben können wichtig sein, falls jemand anderes
auch KotzeMann entwickelt!

WICHTIG

Wenn dein Spiel geschafft ist, dann rufe

onVictory();

auf! Später wird da dann ein richtiger Gewonnen-Bildschrim erscheinen!

Wenn man in deinem Spiel verliert, dann rufe

onLose();

auf. Dardurch wird dein Spiel neugestartet.

Während du an deinem Spiel arbeitest, arbeite ich am Drumherum,
sodass es dann alles auch supi aussieht!
*/

JackDanger.MyGame = function() {

};

//hier musst du deine Eintragungen vornhemen.
addMyGame("mygame", "My Game", "Spaßbringer08", "30 Sekunden ausweichen!","Ausweichen","-","-", JackDanger.MyGame);


JackDanger.MyGame.prototype.init = function() {
    logInfo("init Game");
    addLoadingScreen(this,false);//nicht anfassen
}

JackDanger.MyGame.prototype.preload = function() {
    this.load.path = 'games/' + currentGameData.id + '/assets/';//nicht anfassen
    
    //füge hie rein was du alles laden musst.
    this.load.atlas("mygame");
}

//wird nach dem laden gestartet
JackDanger.MyGame.prototype.create = function() {
    Pad.init();//nicht anfassen
}

JackDanger.MyGame.prototype.mycreate = function() {
    Pad.init();//nicht anfassen
    //removeLoadingScreen();//nicht anfassen

    this.addStuff();
}

//wird jeden Frame aufgerufen
JackDanger.MyGame.prototype.update = function() {
    var dt = this.time.physicsElapsedMS * 0.001;

    this.playerControlls(dt);
    this.updateBall(dt);
    this.bounding();
    this.collision();
    this.updateTime(dt);
}

/////////////////////////////////////////////////////////
// Zeug das zum Spiel gehört, das kannst du alles /////// 
// Löschen oder ändern oder was weiß ich ////////////////
/////////////////////////////////////////////////////////

JackDanger.MyGame.prototype.addStuff = function(dt) {
    this.speed = 200;
    this.player = this.add.sprite(20,50, "mygame", "face");

    this.ball = this.add.sprite(600,Math.random() * 300, "mygame", "ball");
    this.ball.dir = {x: 1, y:1};
    this.ball.speed = 200;

    this.timeText = game.add.bitmapText(game.width / 2, 20, "white", "", 30);
    this.timeText.anchor.set(0.5);

    this.timeLeft = 10;
}

JackDanger.MyGame.prototype.updateTime = function(dt) {
    this.timeLeft -= dt;
    this.timeText.setText("noch " + this.timeLeft.toFixed(1) + " Sekunden durchhalten!");

    if (this.timeLeft <= 0) onVictory();
}

JackDanger.MyGame.prototype.updateBall = function(dt) {
        this.ball.x += this.ball.dir.x * dt * this.ball.speed * 1.1;
        this.ball.y += this.ball.dir.y * dt * this.ball.speed;

        this.ball.speed += 30 * dt;

        if (this.ball.x < 0) this.ball.dir.x *= -1;
        if (this.ball.x > (this.game.width - this.ball.width)) this.ball.dir.x *= -1;
        if (this.ball.y < 0) this.ball.dir.y *= -1;
        if (this.ball.y > (this.game.height - this.ball.height)) this.ball.dir.y *= -1;
}

JackDanger.MyGame.prototype.playerControlls = function(dt) {
    var isMoved = false;

    if (Pad.isDown(Pad.LEFT)) {
        this.player.x -= this.speed * dt;
        isMoved = true;
    }

    if (Pad.isDown(Pad.RIGHT)) {
        this.player.x += this.speed * dt;
        isMoved = true;
    }

    if (Pad.isDown(Pad.UP)) {
        this.player.y -= this.speed * dt;
        isMoved = true;
    }

    if (Pad.isDown(Pad.DOWN)) {
        this.player.y += this.speed * dt;
        isMoved = true;
    }

    this.speed += 100 * dt;
}

JackDanger.MyGame.prototype.collision = function() {
        var difX = this.player.x - this.ball.x;
        var difY = this.player.y - this.ball.y;
        if (Math.sqrt(difX * difX + difY * difY) < this.ball.width * 0.8) {
            //LOST
            onLose();
        }
}

JackDanger.MyGame.prototype.bounding = function() {
    if (this.player.x < 0) this.player.x = 0;
    if (this.player.x > (this.game.width - this.player.width)) this.player.x = this.game.width - this.player.width;
    if (this.player.y < 0) this.player.y = 0;
    if (this.player.y > (this.game.height - this.player.height)) this.player.y = this.game.height - this.player.height;
}

JackDanger.MyGame.prototype.render = function() {
    
}