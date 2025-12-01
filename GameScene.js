// La racine des assets, conforme à la structure de dossiers requise.
const ASSET_ROOT = 'assets/Tiny Swords (Free Pack)/Tiny Swords (Free Pack)';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    // ==========================================================
    // PRELOAD : Chargement de tous les assets avec les nouveaux chemins
    // ==========================================================
    preload() {
        console.log("Chargement des assets avec les chemins mis à jour...");

        // -------------------- CARTES TILED (.json) --------------------
        this.load.tilemapTiledJSON('carte_centrale', ASSET_ROOT + '/Maps/carte central.json');
        this.load.tilemapTiledJSON('carte_droite', ASSET_ROOT + '/Maps/carte droite.json');
        this.load.tilemapTiledJSON('carte_bas', ASSET_ROOT + '/Maps/carte bas.json');
        this.load.tilemapTiledJSON('carte_gauche', ASSET_ROOT + '/Maps/carte gauche.json');
        this.load.tilemapTiledJSON('test_carte', ASSET_ROOT + '/Maps/test carte.json');
        this.load.tilemapTiledJSON('test_carte_1', ASSET_ROOT + '/Maps/test carte (1).json');

        // -------------------- TILESETS et DÉCORS (Images .png) --------------------
        // Les CLÉS de chargement doivent correspondre aux noms de tilesets dans vos fichiers JSON Tiled.
        
        // Terrain
        this.load.image('Tilemap_color1', ASSET_ROOT + '/Terrain/Tilemap_color1.png');
        this.load.image('Tilemap_color4', ASSET_ROOT + '/Terrain/Tilemap_color4.png'); // Pour carte bas.json
        this.load.image('Tilemap_color5', ASSET_ROOT + '/Terrain/Tilemap_color5.png'); // Pour carte gauche.json
        this.load.image('Water Background color', ASSET_ROOT + '/Terrain/Water Background color.png');
        this.load.image('Water Foam', ASSET_ROOT + '/Terrain/Water Foam.png');
        
        // Décorations
        const DECOR_PATH = ASSET_ROOT + '/Decorations/Trees';
        this.load.image('Tree1', DECOR_PATH + '/Tree1.png');
        this.load.image('Tree2', DECOR_PATH + '/Tree2.png');
        this.load.image('Tree3', DECOR_PATH + '/Tree3.png');

        // Monstres (double imbrication)
        const MONSTER_PATH = ASSET_ROOT + '/woodland monsters sprite sheet/woodland monsters sprite sheet';
        this.load.image('slime_spritesheet', MONSTER_PATH + '/slime_spritesheet.png');
        this.load.image('vulture_spritesheet', MONSTER_PATH + '/vulture_spritesheet.png');

        // -------------------- PERSONNAGE RUBY (Atlas de Sprites) --------------------
        const RUBY_PATH = ASSET_ROOT + '/Characters/Ruby';
        
        // Chargement de l'Atlas de marche
        this.load.atlas(
            'ruby_walk_atlas',
            RUBY_PATH + '/ruby_walk.png', 
            RUBY_PATH + '/ruby_walk_atlas.json'
        );
        // Chargement de l'Atlas de course
        this.load.atlas(
            'ruby_run_atlas',
            RUBY_PATH + '/ruby_run.png', 
            RUBY_PATH + '/ruby_run_atlas.json'
        );
        
        // Chargement des données d'animation si elles sont dans un JSON séparé
        this.load.json('ruby_anim_data', RUBY_PATH + '/ruby_walk_anim.json');
    }

    // ==========================================================
    // CREATE : Création des objets et configuration de la scène
    // ==========================================================
    create() {
        // 1. Création de la carte (nous utilisons 'carte_centrale' par défaut)
        const map = this.make.tilemap({ key: 'carte_centrale' });
        
        // 2. Association des Tilesets (Les clés 'Tilemap_colorX' doivent avoir été chargées dans preload)
        // Le premier argument est le nom du tileset DANS le fichier JSON.
        // Le second argument est la CLÉ de l'image que vous avez donnée dans preload().
        const mainTileset = map.addTilesetImage('Tilemap_color1', 'Tilemap_color1');
        const treeTileset1 = map.addTilesetImage('Tree1', 'Tree1');
        const treeTileset2 = map.addTilesetImage('Tree2', 'Tree2');
        const treeTileset3 = map.addTilesetImage('Tree3', 'Tree3');

        // 3. Création des couches (Layers) de la carte
        // Les noms 'Base', 'Decors', etc., dépendent de vos noms de couches dans Tiled
        map.createLayer('Base', mainTileset, 0, 0); 
        map.createLayer('Decors', mainTileset, 0, 0); 
        
        // 4. Création du joueur et des animations
        this.player = this.physics.add.sprite(200, 200, 'ruby_walk_atlas'); 
        this.player.setCollideWorldBounds(true);
        
        // Création de l'animation de marche
        this.anims.create({
            key: 'walk',
            // Utiliser la clé de l'atlas chargé
            frames: this.anims.generateFrameNames('ruby_walk_atlas', { 
                start: 0, 
                end: 5, 
                prefix: 'walk-' // Ajustez 'walk-' si vos frames sont nommées différemment
            }),
            frameRate: 10,
            repeat: -1
        });
        
        this.player.play('walk');

        // 5. Ajout des entrées clavier
        this.cursors = this.input.keyboard.createCursorKeys();

        // 6. Configuration de la caméra pour suivre le joueur
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    // ==========================================================
    // UPDATE : Logique de jeu (mouvement, collisions, etc.)
    // ==========================================================
    update() {
        const speed = 250;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        }

        // Gestion des animations (si vous n'avez pas de script dédié)
        if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) {
            this.player.anims.play('walk', true); // Jouer l'animation de marche
        } else {
            this.player.anims.stop(); // Arrêter l'animation si immobile
        }
    }
}