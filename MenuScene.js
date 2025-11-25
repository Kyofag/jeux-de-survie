// MenuScene.js

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    // Pas de preload nécessaire pour le menu
    // ...

    create() {
        // Récupérer les dimensions de la scène (qui sont dynamiques grâce à main.js)
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        // Fond d'écran du Menu
        this.cameras.main.setBackgroundColor('#1a1a1a'); 

        // --- Titre du Jeu (CENTRÉ : Coordonnée X: screenWidth/2, Coordonnée Y: screenHeight/4) ---
        this.add.text(screenWidth / 2, screenHeight / 4, 'JEU DE SURVIE RAPIDE', {
            fontSize: '48px',
            fill: '#E0E0E0', 
            fontFamily: 'Arial' 
        })
        .setOrigin(0.5); // setOrigin(0.5) centre le point d'ancrage du texte

        // --- Bouton "COMMENCER LA SURVIE" (CENTRÉ) ---
        const playButton = this.add.text(screenWidth / 2, screenHeight / 2 - 40, 'COMMENCER LA SURVIE', {
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
        
        // Effets de survol (Play)
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#FFD700', backgroundColor: '#333333' });
        });

        // --- BOUTON "OPTIONS" (CENTRÉ, décalé de 80 pixels vers le bas) ---
        const optionsButton = this.add.text(screenWidth / 2, screenHeight / 2 + 40, 'OPTIONS', {
            fontSize: '32px',
            fill: '#E0E0E0',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        // Action Options : Pour l'instant, affiche un message (structure future pour les contrôles)
        optionsButton.on('pointerdown', () => {
            console.log("Ouvrir le menu d'options pour changer les contrôles.");
            
            // Affichage temporaire :
            const tempText = this.add.text(screenWidth / 2, screenHeight / 2 + 120, 
                'Contrôles par défaut: Flèches pour le mouvement, ESPACE pour l\'action.', 
                {
                    fontSize: '18px',
                    fill: '#FFFFFF'
                }).setOrigin(0.5);
            
            this.time.delayedCall(3000, () => { tempText.destroy(); }, [], this);
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