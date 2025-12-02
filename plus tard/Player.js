// Player.js

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); 

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.moveSpeed = 150; 

        // Configuration de la hitbox
        const playerWidth = this.width; 
        const playerHeight = this.height; 

        const bodyWidth = 20; 
        const bodyHeight = 20; 

        this.body.setSize(bodyWidth, bodyHeight);

        const xOffset = (playerWidth - bodyWidth) / 2;
        const yOffset = playerHeight - bodyHeight; 

        this.body.setOffset(xOffset, yOffset);

        // Statistiques de Survie
        this.health = 100;
        this.thirst = 100;
        this.hunger = 100;

        this.createAnimations(scene);
        this.anims.play('walk_down_anim', true); 
    }

    createAnimations(scene) {
        // Crée les animations si elles n'existent pas déjà
        if (!scene.anims.get('walk_down_anim')) {
            const animsConfig = scene.cache.json.get('ruby_walk_anim').anims;

            animsConfig.forEach(animConfig => {
                if (animConfig.key && animConfig.frames) {
                    animConfig.frames.forEach(frame => {
                        // Assurez que la clé de l'atlas est correcte ('ruby_walk')
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

        const keyboard = this.scene.input.keyboard;

        if (keyboard.checkDown(keyboard.addKey(Controls.LEFT))) {
            body.setVelocityX(-this.moveSpeed);
            animationKey = 'walk_left_anim';
        } else if (keyboard.checkDown(keyboard.addKey(Controls.RIGHT))) {
            body.setVelocityX(this.moveSpeed);
            animationKey = 'walk_rigth_anim';
        }

        if (keyboard.checkDown(keyboard.addKey(Controls.UP))) {
            body.setVelocityY(-this.moveSpeed);
            animationKey = 'walk_up_anim';
        } else if (keyboard.checkDown(keyboard.addKey(Controls.DOWN))) {
            body.setVelocityY(this.moveSpeed);
            animationKey = 'walk_down_anim';
        }

        // Normaliser la vitesse si le joueur se déplace en diagonale
        body.velocity.normalize().scale(this.moveSpeed);

        if (body.velocity.x !== 0 || body.velocity.y !== 0) {
            if (!this.anims.isPlaying || this.anims.currentAnim.key !== animationKey) {
                 this.anims.play(animationKey, true);
            }
        } else {
            this.anims.stop();
            if(this.anims.currentAnim) {
                // Remet le sprite sur la première image de l'animation en cours (immobile)
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