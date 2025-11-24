// GameScene.js (Mise à jour pour un Fond de Couleur)

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.hudText = null;
        this.statTimer = null;
    }

    preload() {
        // --- 1. Ressources du Joueur ---
        this.load.atlas(
            'ruby_walk', 
            'rubis/ruby_walk.png', 
            'rubis/ruby_walk_atlas.json'
        );
        this.load.json('ruby_walk_anim', 'rubis/ruby_walk_anim.json'); 

        // --- 2. Ressources de la Carte ---
        // Ces lignes peuvent causer une erreur si les fichiers n'existent pas encore !
        // Pour l'instant, nous laissons le code de la carte en commentaire
        // si tu n'as pas encore créé les fichiers map.json et tileset.png.
        // this.load.tilemapTiledJSON('map', 'map.json'); 
        // this.load.image('tileset', 'tileset.png'); 
    }

    create() {
        // --- 1. Création du Fond Blanc/Gris (NOUVEAU) ---
        // Ceci remplace l'écran noir si la carte Tiled n'est pas chargée.
        this.cameras.main.setBackgroundColor('#CCCCCC'); // Gris clair pour simuler le "blanc" de la carte.

        // --- 2. Création et Configuration de la Carte (Optionnel, enlever les commentaires si les fichiers sont prêts) ---
        /* const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('Map_Tileset', 'tileset'); 
        const groundLayer = map.createLayer('Ground', tileset, 0, 0); 
        const collisionLayer = map.createLayer('Collision_Layer', tileset, 0, 0); 
        collisionLayer.setCollisionByProperty({ collides: true }); 
        */

        // Si la carte n'est pas chargée, définit le monde à la taille de l'écran par défaut
        const mapWidth = 800; // À remplacer par map.widthInPixels si la carte est chargée
        const mapHeight = 600; // À remplacer par map.heightInPixels si la carte est chargée
        
        // --- 3. Création du Joueur ---
        // Position au centre de la vue (peu importe si la carte est là ou non)
        this.player = new Player(this, mapWidth / 2, mapHeight / 2, 'ruby_walk', 'tile000'); 
        
        // --- 4. Collisions (Adapter si la carte est chargée) ---
        // Si la carte est là, enlever le commentaire de la ligne ci-dessous
        // this.physics.add.collider(this.player, collisionLayer);
        
        // --- 5. Configuration de la Caméra ---
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // --- 6. L'Interface Utilisateur (HUD) ---
        this.hudText = this.add.text(10, 10, 'HUD', {
            fontSize: '20px',
            fill: '#FFFFFF',
            backgroundColor: '#00000080'
        }).setScrollFactor(0); 

        // --- 7. Le Système de Temps/Survie ---
        this.statTimer = this.time.addEvent({
            delay: 3000,
            callback: this.decreaseStats,
            callbackScope: this,
            loop: true
        });

        // Interaction pour boire (inchangée)
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.player.thirst < 100) {
                this.player.drink(30); 
                console.log("Boire! Soif : " + this.player.thirst);
            }
        });
    }
    
    // ... Le reste des méthodes update() et decreaseStats() reste inchangé ...

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