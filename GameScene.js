// GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.hudText = null;
        this.statTimer = null;
    }

    preload() {
        // 🚨 ATTENTION : C'est ici que le problème se situe très souvent !
        // Assurez-vous que le chemin 'rubis/' est exact (minuscules/majuscules)
        
        // --- 1. Ressources du Joueur (RUBY) ---
        this.load.atlas(
            'ruby_walk', 
            'rubis/ruby_walk.png', 
            'rubis/ruby_walk_atlas.json' 
        );
        this.load.json('ruby_walk_anim', 'rubis/ruby_walk_anim.json'); 

        // --- 2. Ressources de la Carte (Laissées désactivées) ---
        // Si ces fichiers sont manquants, le jeu continue sans la carte, mais peut planter si les lignes ne sont pas commentées.
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
        // 'ruby_walk' est la clé d'atlas définie dans preload()
        // 'tile000' est la première frame de votre atlas de marche (ruby_walk_atlas.json)
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
        }).setScrollFactor(0); 

        // --- 5. Le Système de Temps/Survie ---
        this.statTimer = this.time.addEvent({
            delay: 3000,
            callback: this.decreaseStats,
            callbackScope: this,
            loop: true
        });

        // Interaction pour boire 
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
            this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'GAME OVER', {
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