// GameScene.js (À placer à la racine de votre projet, à côté de main.js)

const ASSET_ROOT = 'assets/Tiny Swords (Free Pack)/Tiny Swords (Free Pack)';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    // ==========================================================
    // PRELOAD : Chargement des assets
    // ==========================================================
    preload() {
        console.log("PRELOAD : Démarrage du chargement des assets...");
        
        // --- CARTES ET TILESETS ---
        this.load.tilemapTiledJSON('carte_centrale', ASSET_ROOT + '/Maps/carte central.json');
        
        // Tilesets requis par la carte central.json
        this.load.image('Shadow', ASSET_ROOT + '/Terrain/Shadow.png');
        this.load.image('Tilemap_color1', ASSET_ROOT + '/Terrain/Tilemap_color1.png');
        this.load.image('Tilemap_color2', ASSET_ROOT + '/Terrain/Tilemap_color2.png');
        this.load.image('Tilemap_color3', ASSET_ROOT + '/Terrain/Tilemap_color3.png');
        this.load.image('Tilemap_color4', ASSET_ROOT + '/Terrain/Tilemap_color4.png');
        this.load.image('Tilemap_color5', ASSET_ROOT + '/Terrain/Tilemap_color5.png');
        this.load.image('Water Background color', ASSET_ROOT + '/Terrain/Water Background color.png');
        this.load.image('Water Foam', ASSET_ROOT + '/Terrain/Water Foam.png');
        
        // Arbres et Décorations
        const DECOR_PATH = ASSET_ROOT + '/Decorations/Trees';
        this.load.image('Tree1', DECOR_PATH + '/Tree1.png');
        this.load.image('Tree2', DECOR_PATH + '/Tree2.png');
        this.load.image('Tree3', DECOR_PATH + '/Tree3.png');
        this.load.image('Tree4', DECOR_PATH + '/Tree4.png');

        // --- JOUEUR ---
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
        console.log("CREATE : Création des éléments...");

        // --- Diagnostic Visuel ---
        this.add.text(10, 10, 'SCENE ACTIVE', { 
            fontSize: '32px', fill: '#FF0000', backgroundColor: '#FFFFFF' 
        }).setScrollFactor(0);
        
        // --- 1. CARTE ---
        const map = this.make.tilemap({ key: 'carte_centrale' });
        if (!map) return; 

        // --- 2. ASSOCIATION DES TILESETS ---
        // Les clés sont les noms des assets chargés dans preload.
        map.addTilesetImage('Shadow', 'Shadow');
        map.addTilesetImage('Tilemap_color1', 'Tilemap_color1');
        map.addTilesetImage('Tilemap_color2', 'Tilemap_color2');
        map.addTilesetImage('Tilemap_color3', 'Tilemap_color3');
        map.addTilesetImage('Tilemap_color4', 'Tilemap_color4');
        map.addTilesetImage('Tilemap_color5', 'Tilemap_color5');
        map.addTilesetImage('Water Background color', 'Water Background color');
        map.addTilesetImage('Water Foam', 'Water Foam');
        map.addTilesetImage('Tree1', 'Tree1');
        map.addTilesetImage('Tree2', 'Tree2');
        map.addTilesetImage('Tree3', 'Tree3');
        map.addTilesetImage('Tree4', 'Tree4');
        
        // On récupère tous les tilesets pour la création des couches
        const allTilesets = map.tilesets;

        // --- 3. CRÉATION DES COUCHES (avec les noms exacts de votre fichier JSON) ---
        try {
            map.createLayer('Calque de Tuiles 1', allTilesets, 0, 0); 
            map.createLayer('Calque de Tuiles 2', allTilesets, 0, 0); 
        } catch (e) {
            console.error("ÉCHEC DE CRÉATION DE COUCHE. L'un des noms de couches est incorrect.");
            return;
        }

        // --- 4. JOUEUR ---
        const centerX = map.widthInPixels / 2;
        const centerY = map.heightInPixels / 2;
        this.player = this.physics.add.sprite(centerX, centerY, 'ruby_walk_atlas'); 
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // --- ANIMATIONS ---
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('ruby_walk_atlas', { start: 0, end: 5, prefix: 'walk-' }),
            frameRate: 10,
            repeat: -1
        });
        this.player.play('walk');
        
        // --- CAMÉRA ---
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.zoom = 1.0; 
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