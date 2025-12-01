// GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Le plugin reste à la racine
        this.load.scenePlugin('AnimatedTiles', 'AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        
        // --- 1. Ressources du Joueur (CORRIGÉ : dans tiny/) ---
        this.load.atlas('ruby_walk', 'tiny/ruby_walk.png', 'tiny/ruby_walk_atlas.json'); 
        this.load.json('ruby_walk_anim', 'tiny/ruby_walk_anim.json'); 

        // --- 2. Ressources des Cartes Tiled (CORRIGÉ : dans tiny/) ---
        
        // Charger TOUTES les images de tileset (PNG)
        this.load.image('tileset_color1_key', 'tiny/Tilemap_color1.png'); 
        this.load.image('tileset_color2_key', 'tiny/Tilemap_color2.png'); 
        this.load.image('tileset_color3_key', 'tiny/Tilemap_color3.png'); 
        this.load.image('tileset_color4_key', 'tiny/Tilemap_color4.png'); 
        this.load.image('tileset_color5_key', 'tiny/Tilemap_color5.png'); 
        this.load.image('tileset_water_foam_key', 'tiny/Water Foam.png'); 
        this.load.image('tileset_water_bg_key', 'tiny/Water Background color.png'); 
        this.load.image('tileset_tree1_key', 'tiny/Tree1.png');
        this.load.image('tileset_tree2_key', 'tiny/Tree2.png');
        this.load.image('tileset_tree3_key', 'tiny/Tree3.png');

        // Charger les 5 fichiers JSON des cartes (Assumés à la racine)
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