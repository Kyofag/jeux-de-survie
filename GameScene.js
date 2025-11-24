// GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.hudText = null;
        this.statTimer = null;
    }

    preload() {
        // --- 1. Ressources du Joueur (À LA RACINE) ---
        // Les fichiers ruby_walk.png, ruby_walk_atlas.json et ruby_walk_anim.json
        // sont chargés à partir du dossier racine (même niveau que GameScene.js)
        this.load.atlas(
            'ruby_walk', 
            'ruby_walk.png', 
            'ruby_walk_atlas.json' 
        );
        this.load.json('ruby_walk_anim', 'ruby_walk_anim.json'); 

        // --- 2. Ressources de la Carte (Désactivées pour l'instant) ---
        // Laissez ces lignes commentées tant que vous n'avez pas créé 'map.json' et 'tileset.png'
        // this.load.tilemapTiledJSON('map', 'map.json'); 
        // this.load.image('tileset', 'tileset.png'); 
    }

    create() {
        // Récupère les dimensions actuelles de la fenêtre (pour le redimensionnement plein écran)
        const mapWidth = this.sys.game.config.width;
        const mapHeight = this.sys.game.config.height;

        // --- 1. Création du Fond (Carte Blanche/Grise) ---
        this.cameras.main.setBackgroundColor('#CCCCCC'); 

        // --- 2. Création du Joueur ---
        this.player = new Player(this, mapWidth / 2, mapHeight / 2, 'ruby_walk', 'tile000'); 
        
        // --- 3. Configuration de la Caméra et du Monde ---
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // --- 4. L'Interface Utilisateur (HUD) ---
        this.hudText = this.add.text(10, 10, 'HUD', {
            fontSize: '20px',
            fill: '#FFFFFF',
            backgroundColor: '#00000080'
        }).setScrollFactor(0); // setScrollFactor(0) garde le HUD fixe à l'écran

        // --- 5. Le Système de Temps/Survie ---
        this.statTimer = this.time.addEvent({
            delay: 3000, // Toutes les 3 secondes
            callback: this.decreaseStats,
            callbackScope: this,
            loop: true
        });

        // --- 6. Debugging : Affichage des Hitboxes ($) ---
        const dollarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOLLAR);
        
        dollarKey.on('down', () => {
            // Basculer la visibilité du graphique de débogage du moteur physique
            this.physics.world.debugGraphic.visible = !this.physics.world.debugGraphic.visible;
            
            const state = this.physics.world.debugGraphic.visible ? 'ACTIVÉ' : 'DÉSACTIVÉ';
            console.log(`Mode Debug (Hitboxes) : ${state}`);
        });

        // --- 7. Interaction : Boire (ESPACE) ---
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

        // Logique de défaite
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
        // Diminution de base
        this.player.thirst -= 5;
        this.player.hunger -= 3;

        // Pénalités
        if (this.player.thirst <= 0) {
            this.player.health -= 2;
        }
        if (this.player.hunger <= 0) {
            this.player.health -= 1;
        }
        
        // S'assurer que les stats sont dans les limites 0-100
        this.player.thirst = Phaser.Math.Clamp(this.player.thirst, 0, 100);
        this.player.hunger = Phaser.Math.Clamp(this.player.hunger, 0, 100);
    }
}