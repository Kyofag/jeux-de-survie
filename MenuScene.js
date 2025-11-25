// MenuScene.js (Dernière version)

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Obtenir la taille actuelle de la fenêtre
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        this.cameras.main.setBackgroundColor('#1a1a1a'); 

        // --- Titre du Jeu (Positionné plus haut) ---
        this.add.text(screenWidth / 2, screenHeight * 0.25, 'JEU DE SURVIE RAPIDE', {
            fontSize: '48px',
            fill: '#E0E0E0', 
            fontFamily: 'Arial' 
        })
        .setOrigin(0.5);

        // --- Bouton "COMMENCER LA SURVIE" (CENTRÉ, au milieu) ---
        const playButton = this.add.text(screenWidth / 2, screenHeight * 0.5, 'COMMENCER LA SURVIE', {
            fontSize: '32px',
            fill: '#FFD700', 
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); 
        });
        
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#FFD700', backgroundColor: '#333333' });
        });

        // --- BOUTON "OPTIONS" ---
        const optionsButton = this.add.text(screenWidth / 2, screenHeight * 0.5 + 80, 'OPTIONS', {
            fontSize: '32px',
            fill: '#E0E0E0',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        // Confirmer que le clic fonctionne bien (Regardez la console F12)
        optionsButton.on('pointerdown', () => {
            console.log("-> Clic OPTIONS détecté. La scène d'options n'est pas encore créée.");
            
            // Affichage temporaire (vérifiez si vous voyez ce texte apparaître)
            const tempText = this.add.text(screenWidth / 2, screenHeight * 0.5 + 160, 
                'Options non disponibles. Regardez la console F12!', 
                {
                    fontSize: '18px',
                    fill: '#FFFFFF'
                }).setOrigin(0.5);
            
            this.time.delayedCall(3000, () => { tempText.destroy(); }, [], this);
        });

        optionsButton.on('pointerover', () => {
            optionsButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        optionsButton.on('pointerout', () => {
            optionsButton.setStyle({ fill: '#E0E0E0', backgroundColor: '#333333' });
        });
    }
}