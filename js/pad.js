Pad = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    JUMP: 4,
    SHOOT: 5,
    START: 6,
    justPressed_UP: false,
    justPressed_DOWN: false,
    justPressed_LEFT: false,
    justPressed_RIGHT: false,
    justPressed_JUMP: false,
    justPressed_SHOOT: false,
    justPressed_START: false,

    isDown_UP: false,
    isDown_DOWN: false,
    isDown_LEFT: false,
    isDown_RIGHT: false,
    isDown_JUMP: false,
    isDown_SHOOT: false,
    isDown_START: false,

    cursors: null,
    btnJUMP: null,
    btnSHOOT: null,
    btnSTART: null,
    pad: null,
    dPadLeft: null,
    dPadRight: null,
    dPadUp: null,
    dPadDown: null,
    dPadJump: null,
    dPadShoot: null,
    dPadStart: null,
    


    init: function(){
        console.log("pad init");
        this.cursors = game.input.keyboard.createCursorKeys();

        this.btnJUMP = game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.btnSTART = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.btnSHOOT = game.input.keyboard.addKey(Phaser.Keyboard.V);


        game.input.gamepad.start();
        this.pad = game.input.gamepad.pad1;

        this.dPadLeft = this.setDPadListeners(Phaser.Gamepad.PS3XC_DPAD_LEFT); 
        this.dPadRight = this.setDPadListeners(Phaser.Gamepad.PS3XC_DPAD_RIGHT);
        this.dPadUp = this.setDPadListeners(Phaser.Gamepad.PS3XC_DPAD_UP);
        this.dPadDown = this.setDPadListeners(Phaser.Gamepad.PS3XC_DPAD_DOWN);

        this.dPadJump = this.setDPadListeners(Phaser.Gamepad.PS3XC_X);
        this.dPadShoot = this.setDPadListeners(Phaser.Gamepad.PS3XC_SQUARE);
        this.dPadStart = this.setDPadListeners(Phaser.Gamepad.PS3XC_START);
    },

    isDown: function(key) {
        switch (key) {
            case this.LEFT: 
                return this.dPadLeft.value > 0.1 || this.cursors.left.isDown;
                break;
            case this.RIGHT: 
                return this.dPadRight.value > 0.1 || this.cursors.right.isDown;
                break;
            case this.UP: 
                return this.dPadUp.value > 0.1 || this.cursors.up.isDown;
                break;
            case this.DOWN: 
                return this.dPadDown.value > 0.1 || this.cursors.down.isDown;
                break;
            case this.JUMP: 
                return this.dPadJump.isDown || this.btnJUMP.isDown;
                break;
            case this.SHOOT: 
                return this.dPadShoot.isDown || this.btnSHOOT.isDown;
                break;
        }
    },

    justDown: function(key) {
        switch (key) {
            case this.LEFT: 
                return Pad.isDown_LEFT || Pad.cursors.left.justDown;
                break;
            case this.RIGHT: 
                return Pad.isDown_RIGHT || Pad.cursors.right.justDown;
                break;
            case this.DOWN: 
                return Pad.isDown_DOWN || Pad.cursors.down.justDown;
                break;
            case this.UP: 
                return Pad.isDown_UP || Pad.cursors.up.justDown;
                break;
            case this.JUMP: 
                return Pad.dPadJump.justPressed(30) || Pad.btnJUMP.justDown;
                break;
            case this.SHOOT: 
                return Pad.dPadShoot.justPressed(30) || this.btnSHOOT.justDown;
                break;
        }
    },

    setDPadListeners: function(key) {
        btn = this.pad.getButton(key);
        //btn.onDown.add(this.onDPad);
        //btn.onUp.add(this.onDPad);
        //btn.onFloat.add(this.onDPad);
        if (btn == null) {
            btn = {
                value: 0,
                justPressed: function() {return false;}
            };
        }
        return btn;
    },

    onDPad:function(btn, value) {
        var code = btn.buttonCode;
        console.log(code + ": " + value)
        switch(parseInt(code)) {
            case 14: 
                Pad.isDown_LEFT = value > 0.2;
            break;
            case 15: 
                Pad.isDown_RIGHT = value > 0.2;
            break;
        }
    
    },

    clearJustInput: function() {
        this.justDown(Pad.UP);
        this.justDown(Pad.DOWN);
        this.justDown(Pad.LEFT);
        this.justDown(Pad.RIGHT);
        this.justDown(Pad.JUMP);
        this.justDown(Pad.SHOOT);
        this.justDown(Pad.START);
        

    }
}