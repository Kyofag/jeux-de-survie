// GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // --- Configuration des Tuiles Animées (Plugin) ---
        // Fichier AnimatedTiles.js à la racine
        this.load.scenePlugin('AnimatedTiles', 'AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        
        // --- 1. Ressources du Joueur (à la racine) ---
        this.load.atlas('ruby_walk', 'ruby_walk.png', 'ruby_walk_atlas.json'); 
        this.load.json('ruby_walk_anim', 'ruby_walk_anim.json'); 

        // --- 2. Ressources des Cartes Tiled (à la racine) ---
        
        // Charger TOUTES les images de tileset utilisées:
        this.load.image('tileset_color1_key', 'Tilemap_color1.png'); 
        this.load.image('tileset_color2_key', 'Tilemap_color2.png'); 
        this.load.image('tileset_color3_key', 'Tilemap_color3.png'); 
        this.load.image('tileset_color4_key', 'Tilemap_color4.png'); 
        this.load.image('tileset_color5_key', 'Tilemap_color5.png'); 
        this.load.image('tileset_water_foam_key', 'Water Foam.png'); 
        this.load.image('tileset_water_bg_key', 'Water Background color.png'); 
        this.load.image('tileset_tree1_key', 'Tree1.png');
        this.load.image('tileset_tree2_key', 'Tree2.png');
        this.load.image('tileset_tree3_key', 'Tree3.png');

        // Charger les 5 fichiers JSON des cartes (à la racine)
        this.load.tilemapTiledJSON('map_up', 'test carte.json'); 
        this.load.tilemapTiledJSON('map_center', 'carte central.json'); 
        this.load.tilemapTiledJSON('map_right', 'carte droite.json'); 
        this.load.tilemapTiledJSON('map_bottom', 'carte bas.json'); 
        this.load.tilemapTiledJSON('map_left', 'carte gauche.json');
    }

    create() {
        // 1. Création du Monde
        this.world = new World(this); 
        
        // Activation des Tuiles Animées
        this.animatedTiles.init(this.world.map); 

        // 2. Création du Joueur au centre de la carte centrale
        const map_width_tiles = this.world.MAP_WIDTH_TILES;
        const map_height_tiles = this.world.MAP_HEIGHT_TILES;
        const tile_size = this.world.TILE_SIZE;
        
        // Position au milieu de la carte centrale (col 1, ligne 1)
        const startX = (1 * map_width_tiles + (map_width_tiles / 2)) * tile_size;
        const startY = (1 * map_height_tiles + (map_height_tiles / 2)) * tile_size;
        
        this.player = new Player(this, startX, startY, 'ruby_walk', 'tile000'); 
        
        // 3. Collisions
        const collisionLayers = this.world.getCollisionLayers();
        collisionLayers.forEach(layer => {
            this.physics.add.collider(this.player, layer);
        });

        // 4. Caméra
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // 5. Interface/Inventaire (Prochaine étape)
    }

    update() {
        // Logique de jeu (le mouvement du joueur est géré dans Player.js)
    }
}