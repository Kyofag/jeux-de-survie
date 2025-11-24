// GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.hudText = null;
        this.statTimer = null;
    }

    preload() {
        // --- 1. Ressources du Joueur (INTACTES) ---
        this.load.atlas(
            'ruby_walk', 
            'ruby_walk.png', 
            'ruby_walk_atlas.json'
        );
        this.load.json('ruby_walk_anim', 'ruby_walk_anim.json');

        // --- 2. Ressources de la Carte (NOUVEAU) ---
        // Charger le fichier JSON de la carte créé par Tiled
        this.load.tilemapTiledJSON('map', 'map.json'); 
        // Charger le tileset (l'image des tuiles)
        this.load.image('tileset', 'tileset.png'); 
    }

    create() {
        // --- 1. Création et Configuration de la Carte (NOUVEAU) ---
        const map = this.make.tilemap({ key: 'map' });

        // IMPORTANT: Le nom 'tileset' ici doit correspondre au nom que tu as donné
        // à l'image du tileset dans Tiled.
        const tileset = map.addTilesetImage('Map_Tileset', 'tileset'); 
        
        // Créer les calques (Layers) de la carte
        const groundLayer = map.createLayer('Ground', tileset, 0, 0); // Ex: Herbe
        const collisionLayer = map.createLayer('Collision_Layer', tileset, 0, 0); // Ex: Arbres, murs
        
        // Définir les tuiles qui provoquent une collision
        // Tiled: Tu dois cocher 'Collision' sur les tuiles concernées dans Tiled.
        collisionLayer.setCollisionByProperty({ collides: true }); 
        
        // --- 2. Création du Joueur ---
        this.player = new Player(this, 100, 100, 'ruby_walk', 'tile000');
        
        // --- 3. Collisions (NOUVEAU) ---
        this.physics.add.collider(this.player, collisionLayer);

        // --- 4. Configuration de la Caméra ---
        // Adapte les limites du monde à la taille de la carte
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // --- 5. L'Interface Utilisateur (HUD) ---
        this.hudText = this.add.text(10, 10, 'HUD', {
            fontSize: '20px',
            fill: '#FFFFFF',
            backgroundColor: '#00000080'
        }).setScrollFactor(0); 

        // --- 6. Le Système de Temps/Survie ---
        this.statTimer = this.time.addEvent({
            delay: 3000,
            callback: this.decreaseStats,
            callbackScope: this,
            loop: true
        });

        // Exemple: Ajouter une interaction simple (touche ESPACE pour boire)
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.player.thirst < 100) {
                this.player.drink(30); 
                console.log("Boire! Soif : " + this.player.thirst);
            }
        });
    }

    update() {
        // Mise à jour de l'affichage du HUD
        this.hudText.setText([
            `Santé: ${Math.max(0, this.player.health).toFixed(0)}`,
            `Soif: ${Math.max(0, this.player.thirst).toFixed(0)}`,
            `Faim: ${Math.max(0, this.player.hunger).toFixed(0)}`
        ]);

        if (this.player.health <= 0) {
            this.scene.pause();
            this.statTimer.remove();
            this.add.text(400, 300, 'GAME OVER', {
                fontSize: '64px',
                fill: '#FF0000'
            }).setOrigin(0.5).setScrollFactor(0);
        }
    }

    decreaseStats() {
        this.player.thirst -= 5;
        this.player.hunger -= 3;

        if (this.player.thirst <= 0) {
            this.player.health -= 2;
        }
        if (this.player.hunger <= 0) {
            this.player.health -= 1;
        }
        
        this.player.thirst = Phaser.Math.Clamp(this.player.thirst, 0, 100);
        this.player.hunger = Phaser.Math.Clamp(this.player.hunger, 0, 100);
    }
}