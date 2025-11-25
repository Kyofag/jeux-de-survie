// Player.js

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); 

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.moveSpeed = 150; 

        // --- Configuration de la Hitbox (Body) ---
        const playerWidth = this.width; // 46 pixels (largeur du sprite d'après l'atlas)
        const playerHeight = this.height; // 61 pixels (hauteur du sprite d'après l'atlas)

        const bodyWidth = 20; 
        const bodyHeight = 20; 

        this.body.setSize(bodyWidth, bodyHeight);

        // Centrer la Hitbox en bas du personnage (pour une vue top-down)
        const xOffset = (playerWidth - bodyWidth) / 2;
        const yOffset = playerHeight - bodyHeight; 

        this.body.setOffset(xOffset, yOffset);
        // ------------------------------------------

        // Initialisation des stats de survie
        this.health = 100;
        this.thirst = 100;
        this.hunger = 100;

        this.createAnimations(scene);
        this.anims.play('walk_down_anim', true); 
    }

    createAnimations(scene) {
        if (!scene.anims.get('walk_down_anim')) {
            // Utilise les données de l'atlas que vous avez fournies
            const animsConfig = scene.cache.json.get('ruby_walk_anim').anims;

            animsConfig.forEach(animConfig => {
                if (animConfig.key && animConfig.frames) {
                    animConfig.frames.forEach(frame => {
                        // La clé de l'atlas est 'ruby_walk'
                        frame.key = 'ruby_walk';
                    });
                    scene.anims.create(animConfig);
                }
            });
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); 
        this.handleMovement();
    }
    
    handleMovement() {
        const body = this.body;
        body.setVelocity(0); 
        let animationKey = '';

        // Déplacement
        if (this.cursors.left.isDown) {
            body.setVelocityX(-this.moveSpeed);
            animationKey = 'walk_left_anim';
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(this.moveSpeed);
            animationKey = 'walk_rigth_anim';
        }

        if (this.cursors.up.isDown) {
            body.setVelocityY(-this.moveSpeed);
            animationKey = 'walk_up_anim';
        } else if (this.cursors.down.isDown) {
            body.setVelocityY(this.moveSpeed);
            animationKey = 'walk_down_anim';
        }

        // Jouer l'animation
        if (body.velocity.x !== 0 || body.velocity.y !== 0) {
            if (!this.anims.isPlaying || this.anims.currentAnim.key !== animationKey) {
                 this.anims.play(animationKey, true);
            }
        } else {
            // Arrêter l'animation et afficher la frame de "repos"
            this.anims.stop();
            if(this.anims.currentAnim) {
                this.setFrame(this.anims.currentAnim.frames[0].frame.name);
            }
        }
    }

    drink(amount) {
        this.thirst = Phaser.Math.Clamp(this.thirst + amount, 0, 100);
    }

    eat(amount) {
        this.hunger = Phaser.Math.Clamp(this.hunger + amount, 0, 100);
    }
}