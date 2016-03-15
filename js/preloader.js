JackDanger.Preloader = function() {
    //variable stuff
};

JackDanger.Preloader.prototype = {
    init: function() {
        logInfo("init Preloader");
        this.generalSettings();

    },

    preload: function() {
        this.loadingAssets();
    },

    create: function() {
        startRandomGame();
    },

    generalSettings: function() {
        this.input.maxPointers = 1;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.game.renderer.renderSession.roundPixels = true;
    },

    loadingAssets: function() {
        this.load.path = 'assets/';
        game.load.bitmapFont("testfont");
        game.load.bitmapFont("bigYellow");
        game.load.bitmapFont("white");
        //this.load.image("tiles");
       this.load.image("loadingback");
       // this.load.atlas("atlas");

    }
};