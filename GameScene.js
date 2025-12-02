// GameScene.js (maintenant à la racine du projet)

// La racine des assets, qui reste 'assets/Tiny Swords (Free Pack)/Tiny Swords (Free Pack)'
const ASSET_ROOT = 'assets/Tiny Swords (Free Pack)/Tiny Swords (Free Pack)';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    // ==========================================================
    // PRELOAD : Chargement des assets (les chemins d'assets sont inchangés)
    // ==========================================================
    preload() {
        console.log("Chargement des cartes et du joueur...");
        
        // Chargement de la carte et des tilesets nécessaires
        this.load.tilemapTiledJSON('carte_centrale', ASSET_ROOT + '/Maps/carte central.json');
        this.load.image('Tilemap_color1', ASSET_ROOT + '/Terrain/Tilemap_color1.png');
        this.load.image('Tree1', ASSET_ROOT + '/Decorations/Trees/Tree1.png');
        this.load.image('Tree2', ASSET_ROOT + '/Decorations/Trees/Tree2.png');
        this.load.image('Tree3', ASSET_ROOT + '/Decorations/Trees/Tree3.png');

        // Chargement du personnage Ruby (Atlas)
        const RUBY_PATH = ASSET_ROOT + '/Characters/Ruby';
        this.load.atlas(
            'ruby_walk_atlas',
            RUBY_PATH + '/ruby_walk.png', 
            RUBY_PATH + '/ruby_walk_atlas.json'
        );
    }

    // ==========================================================
    // CREATE : Affichage de la carte et création du personnage
    // ==========================================================
    create() {
        console.log("Affichage de la carte et création du joueur...");
        
        // --- CARTE ---
        const map = this.make.tilemap({ key: 'carte_centrale' });
        
        // Association des Tilesets
        const mainTileset = map.addTilesetImage('Tilemap_color1', 'Tilemap_color1');
        map.addTilesetImage('Tree1', 'Tree1'); // Les autres tilesets sont associés ici
        
        // Création des couches
        map.createLayer('Base', mainTileset, 0, 0); 
        map.createLayer('Decors', mainTileset, 0, 0); 
        
        // --- JOUEUR ---
        this.player = this.physics.add.sprite(200, 200, 'ruby_walk_atlas'); 
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // --- ANIMATIONS ---
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('ruby_walk_atlas', { start: 0, end: 5, prefix: 'walk-' }),
            frameRate: 10,
            repeat: -1
        });
        
        // --- CAMÉRA ---
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    }

    // ==========================================================
    // UPDATE : Logique de Mouvement
    // ==========================================================
    update() {
        const speed = 250;
        this.player.setVelocity(0); 
        let isMoving = false;

        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
            isMoving = true;
        }

        if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.player.setVelocityX(speed);
        if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.player.setVelocityY(speed);

        if (isMoving) {
            this.player.anims.play('walk', true); 
        } else {
            this.player.anims.stop(); 
        }
    }
}