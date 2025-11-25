// GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.hudText = null;
        this.statTimer = null;
        this.world = null;
    }

    preload() {
        this.load.atlas('ruby_walk', 'ruby_walk.png', 'ruby_walk_atlas.json'); 
        this.load.json('ruby_walk_anim', 'ruby_walk_anim.json'); 

        this.load.image('tileset_simu', 'Tilemap_color1.png'); 
    }

    create() {
        const mapWidth = this.sys.game.config.width;
        const mapHeight = this.sys.game.config.height;

        this.world = new World(this); 
        
        this.player = new Player(this, mapWidth / 2, mapHeight / 2, 'ruby_walk', 'tile000'); 
        
        const collisionLayers = this.world.getCollisionLayers();
        collisionLayers.forEach(layer => {
            this.physics.add.collider(this.player, layer);
        });

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        this.hudText = this.add.text(10, 10, 'HUD', {
            fontSize: '20px',
            fill: '#FFFFFF',
            backgroundColor: '#00000080'
        }).setScrollFactor(0); 

        this.statTimer = this.time.addEvent({
            delay: 3000, callback: this.decreaseStats, callbackScope: this, loop: true
        });

        const dollarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOLLAR);
        dollarKey.on('down', () => {
            this.physics.world.debugGraphic.visible = !this.physics.world.debugGraphic.visible;
            const state = this.physics.world.debugGraphic.visible ? 'ACTIVÉ' : 'DÉSACTIVÉ';
            console.log(`Mode Debug (Hitboxes) : ${state}`);
        });

        const actionKey = this.input.keyboard.addKey(Controls.ACTION);
        
        actionKey.on('down', () => {
            if (this.player.thirst < 100) {
                this.player.drink(30); 
                console.log("Boire! Soif : " + this.player.thirst);
            }
        });
    }

    update() {
        this.player.setDepth(this.player.y); 

        this.hudText.setText([
            `Santé: ${Math.max(0, this.player.health).toFixed(0)}`,
            `Soif: ${Math.max(0, this.player.thirst).toFixed(0)}`,
            `Faim: ${Math.max(0, this.player.hunger).toFixed(0)}`
        ]);

        if (this.player.health <= 0) {
            this.scene.pause();
            this.statTimer.remove();
            this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'GAME OVER', {
                fontSize: '64px',
                fill: '#FF0000'
            }).setOrigin(0.5).setScrollFactor(0);
        }
    }

    decreaseStats() {
        this.player.thirst -= 5;
        this.player.hunger -= 3;

        if (this.player.thirst <= 0) { this.player.health -= 2; }
        if (this.player.hunger <= 0) { this.player.health -= 1; }
        
        this.player.thirst = Phaser.Math.Clamp(this.player.thirst, 0, 100);
        this.player.hunger = Phaser.Math.Clamp(this.player.hunger, 0, 100);
    }
}