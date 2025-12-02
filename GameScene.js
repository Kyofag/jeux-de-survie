// GameScene.js (maintenant à la racine du projet)

const ASSET_ROOT = 'assets/Tiny Swords (Free Pack)/Tiny Swords (Free Pack)';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    // ==========================================================
    // PRELOAD : Chargement des assets (Plus d'assets requis par carte centrale)
    // ==========================================================
    preload() {
        console.log("PRELOAD : Démarrage du chargement...");
        
        // --- CARTES ET TILESETS ---
        this.load.tilemapTiledJSON('carte_centrale', ASSET_ROOT + '/Maps/carte central.json');
        
        // Tilesets (Clés qui DOIVENT correspondre aux noms dans Tiled Map)
        this.load.image('Tilemap_color1', ASSET_ROOT + '/Terrain/Tilemap_color1.png');
        this.load.image('Water Background color', ASSET_ROOT + '/Terrain/Water Background color.png'); // Ajouté (souvent utilisé)
        this.load.image('Water Foam', ASSET_ROOT + '/Terrain/Water Foam.png'); // Ajouté (souvent utilisé)
        
        const DECOR_PATH = ASSET_ROOT + '/Decorations/Trees';
        this.load.image('Tree1', DECOR_PATH + '/Tree1.png');
        this.load.image('Tree2', DECOR_PATH + '/Tree2.png');
        this.load.image('Tree3', DECOR_PATH + '/Tree3.png');

        // --- JOUEUR ---
        const RUBY_PATH = ASSET_ROOT + '/Characters/Ruby';
        this.load.atlas('ruby_walk_atlas', RUBY_PATH + '/ruby_walk.png', RUBY_PATH + '/ruby_walk_atlas.json');
    }

    // ==========================================================
    // CREATE : Affichage de la carte et création du personnage
    // ==========================================================
    create() {
        console.log("CREATE : Démarrage de la création des éléments...");
        
        // --- 1. CARTE (DIAGNOSTIC) ---
        const map = this.make.tilemap({ key: 'carte_centrale' });
        
        if (!map) {
            console.error("ERREUR CRITIQUE 1: La carte JSON n'a pas été chargée. Vérifiez le chemin dans preload().");
            return;
        }

        // --- 2. ASSOCIATION DES TILESETS (DIAGNOSTIC) ---
        // Les noms des variables et le second argument sont les clés de preload.
        // Le premier argument ('Tilemap_color1') est le nom du tileset DANS le JSON Tiled.
        const mainTileset = map.addTilesetImage('Tilemap_color1', 'Tilemap_color1');
        const tree1 = map.addTilesetImage('Tree1', 'Tree1');
        const tree2 = map.addTilesetImage('Tree2', 'Tree2');
        const water = map.addTilesetImage('Water Background color', 'Water Background color');

        if (!mainTileset) {
            console.error("ERREUR CRITIQUE 2: Le tileset principal 'Tilemap_color1' n'a pas pu être associé. La clé est-elle correcte dans Tiled ?");
            return;
        }
        
        // --- 3. CRÉATION DES COUCHES (COUVERTURE DE L'ERREUR DE NOM DE COUCHE) ---
        // J'utilise ici un nom générique 'Calque' suivi d'un numéro pour couvrir les noms que vous avez peut-être utilisés.
        // VÉRIFIEZ LE NOM EXACT DANS VOTRE TILE MAP ! (Ex: 'Ground', 'Objects', 'Walls')
        
        // Utilisez tous les tilesets pour chaque couche pour la robustesse: [mainTileset, tree1, water, ...]
        const allTilesets = [mainTileset, tree1, tree2, water]; 

        try {
            // ESSAYEZ AVEC LES NOMS LES PLUS COURANTS POUR TINY SWORDS
            map.createLayer('Ground', allTilesets, 0, 0); 
            map.createLayer('Foliage', allTilesets, 0, 0); 
            map.createLayer('Objects', allTilesets, 0, 0); 
            
            // Si vos couches s'appellent Base et Decors
            // map.createLayer('Base', allTilesets, 0, 0); 
            // map.createLayer('Decors', allTilesets, 0, 0); 

        } catch (e) {
            console.error("ERREUR CRITIQUE 3: La création d'une couche a échoué. Cela signifie que le nom de la couche dans Tiled NE CORRESPOND PAS à celui que vous avez utilisé dans map.createLayer().");
            console.error("Vérifiez les noms des couches dans votre fichier Tiled ! (Erreur détaillée:", e.message, ")");
            return;
        }
        
        // --- 4. JOUEUR ET CONTRÔLES (reste inchangé) ---
        this.player = this.physics.add.sprite(200, 200, 'ruby_walk_atlas'); 
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // ... (Animations et Caméra) ...
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('ruby_walk_atlas', { start: 0, end: 5, prefix: 'walk-' }),
            frameRate: 10,
            repeat: -1
        });
        this.player.play('walk');

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        
        console.log("CREATE : Tous les éléments ont été créés sans erreur critique JavaScript.");
    }
    
    // ... (update() reste inchangé) ...
}