// OptionsScene.js

class OptionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OptionsScene' });
        this.keyTextObjects = {}; 
        this.isListening = false; 
        this.currentKeyToChange = null; 
    }

    create() {
        this.cameras.main.setBackgroundColor('#333333');
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        this.add.text(screenWidth / 2, 50, 'CONFIGURATION DES CONTRÔLES', {
            fontSize: '36px',
            fill: '#E0E0E0',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        let yPos = 150;

        // Afficher chaque contrôle et créer les boutons
        for (const key in Controls) {
            const label = key; 
            const keyCode = Controls[key]; 

            // Label de l'action
            this.add.text(screenWidth / 2 - 150, yPos, label + ':', {
                fontSize: '24px',
                fill: '#FFFFFF',
                fontFamily: 'Arial'
            }).setOrigin(1, 0.5);

            // Bouton affichant la touche actuelle
            const keyChar = Phaser.Input.Keyboard.KeyCodes[keyCode] || String.fromCharCode(keyCode);
            const keyText = this.add.text(screenWidth / 2 + 50, yPos, keyChar, {
                fontSize: '24px',
                fill: '#FFD700',
                backgroundColor: '#555555',
                padding: { x: 10, y: 5 },
                fontFamily: 'Arial'
            })
            .setOrigin(0, 0.5)
            .setInteractive({ useHandCursor: true });

            this.keyTextObjects[key] = keyText;

            // Gestion du clic
            keyText.on('pointerdown', () => {
                this.startKeyListen(key, keyText);
            });

            yPos += 70;
        }

        // Message d'instruction
        this.infoText = this.add.text(screenWidth / 2, screenHeight - 100, 'Cliquez sur une touche pour la modifier.', {
            fontSize: '20px',
            fill: '#AAAAAA',
            fontFamily: 'Arial'
        }).setOrigin(0.5);


        // Bouton RETOUR
        const backButton = this.add.text(screenWidth / 2, screenHeight - 30, 'RETOUR AU MENU', {
            fontSize: '28px',
            fill: '#E0E0E0',
            backgroundColor: '#1a1a1a',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene'); 
        });
    }
    
    startKeyListen(keyName, keyTextObject) {
        if (this.isListening) return; 

        this.isListening = true;
        this.currentKeyToChange = keyName;
        keyTextObject.setText('APPUYEZ...');
        keyTextObject.setStyle({ fill: '#FF0000', backgroundColor: '#000000' });
        this.infoText.setText(`Appuyez sur la nouvelle touche pour l'action : ${keyName}`);

        this.input.keyboard.once('keydown', (event) => {
            this.updateControl(event.keyCode, event.key);
            this.isListening = false;
        });
    }

    updateControl(newKeyCode, newKeyChar) {
        if (!this.currentKeyToChange) return;

        // Mettre à jour l'objet global Controls
        Controls[this.currentKeyToChange] = newKeyCode;
        
        // Mettre à jour l'affichage
        const keyTextObject = this.keyTextObjects[this.currentKeyToChange];
        let displayChar = newKeyChar.toUpperCase();
        if (displayChar.length > 3) {
            // Tente de trouver le nom de la touche (ex: 'SPACE', 'SHIFT')
            displayChar = Phaser.Input.Keyboard.KeyCodes[newKeyCode] || displayChar.substring(0, 3);
        }
        
        keyTextObject.setText(displayChar);
        keyTextObject.setStyle({ fill: '#FFD700', backgroundColor: '#555555' });
        
        this.currentKeyToChange = null;
        this.infoText.setText('Modification effectuée !');
        
        this.time.delayedCall(1500, () => {
            this.infoText.setText('Cliquez sur une touche pour la modifier.');
        }, [], this);
    }
}