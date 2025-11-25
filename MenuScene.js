// MenuScene.js

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    // ... (preload inchangé)

    create() {
        // Récupérer les dimensions de la scène (qui correspondent à la fenêtre)
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        // Fond d'écran du Menu
        this.cameras.main.setBackgroundColor('#1a1a1a'); 

        // --- Titre du Jeu (CENTRÉ) ---
        this.add.text(screenWidth / 2, screenHeight / 4, 'JEU DE SURVIE RAPIDE', {
            fontSize: '48px',
            fill: '#E0E0E0', 
            fontFamily: 'Arial' 
        }).setOrigin(0.5); // setOrigin(0.5) centre le texte sur son point de coordonnées

        // --- Bouton "COMMENCER LA SURVIE" ---
        const playButton = this.add.text(screenWidth / 2, screenHeight / 2, 'COMMENCER LA SURVIE', {
            fontSize: '32px',
            fill: '#FFD700', 
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        // Gestion du clic : démarrer la GameScene
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); 
        });
        
        // Effets de survol
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#FFD700', backgroundColor: '#333333' });
        });

        // --- NOUVEAU : Bouton "OPTIONS" ---
        const optionsButton = this.add.text(screenWidth / 2, screenHeight / 2 + 80, 'OPTIONS', {
            fontSize: '32px',
            fill: '#E0E0E0',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        // Action Options : Pour l'instant, affiche un message
        optionsButton.on('pointerdown', () => {
            console.log("Ouvrir le menu d'options (Contrôles)");
            // Dans un vrai jeu, on lancerait ici une nouvelle scène: this.scene.start('OptionsScene');
            
            // Pour l'instant, on lance un petit texte temporaire
            const tempText = this.add.text(screenWidth / 2, screenHeight / 2 + 150, 'Options non disponibles. Utiliser les flèches.', {
                fontSize: '18px',
                fill: '#FFFFFF'
            }).setOrigin(0.5);
            // Faire disparaître le texte après 2 secondes
            this.time.delayedCall(2000, () => { tempText.destroy(); }, [], this);
        });

        // Effets de survol Options
        optionsButton.on('pointerover', () => {
            optionsButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        optionsButton.on('pointerout', () => {
            optionsButton.setStyle({ fill: '#E0E0E0', backgroundColor: '#333333' });
        });
    }
}