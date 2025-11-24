// La classe Player hérite des propriétés d'un Sprite Physique de Phaser
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Ajoute cet objet à la scène et active la physique
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.moveSpeed = 150; // Vitesse de déplacement

        // Initialisation des stats de survie (basée sur notre conversation précédente)
        this.health = 100;
        this.thirst = 100;
        this.hunger = 100;

        // Créer les animations une seule fois (important!)
        this.createAnimations(scene);
        this.anims.play('walk_down_anim', true); // Animation de base
    }

    createAnimations(scene) {
        // Crée les animations à partir des données JSON (ruby_walk_anim.json)
        // Vérifie si les animations existent déjà pour éviter de les recréer
        if (!scene.anims.get('walk_down_anim')) {
            const animsConfig = scene.cache.json.get('ruby_walk_anim').anims;

            animsConfig.forEach(animConfig => {
                // S'assurer que 'key' et 'frames' sont définis
                if (animConfig.key && animConfig.frames) {
                    // Les frames utilisent la clé 'ruby_walk', définie dans preload
                    animConfig.frames.forEach(frame => {
                        frame.key = 'ruby_walk';
                    });
                    
                    scene.anims.create(animConfig);
                }
            });
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); // Appel obligatoire pour le Sprite

        this.handleMovement();
        // Optionnel: this.updateStats(delta);
    }
    
    handleMovement() {
        const body = this.body;
        body.setVelocity(0); // Réinitialiser la vitesse

        let animationKey = '';

        // Déplacement et sélection de l'animation
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

        // Jouer l'animation si le joueur bouge
        if (body.velocity.x !== 0 || body.velocity.y !== 0) {
            if (this.anims.currentAnim && this.anims.currentAnim.key !== animationKey) {
                this.anims.play(animationKey, true);
            }
        } else {
            // Arrêter l'animation et afficher la première frame de la direction courante
            this.anims.stop();
        }
    }

    // Tu peux ajouter des méthodes pour gérer la consommation d'eau/nourriture ici
    drink(amount) {
        this.thirst = Phaser.Math.Clamp(this.thirst + amount, 0, 100);
    }

    eat(amount) {
        this.hunger = Phaser.Math.Clamp(this.hunger + amount, 0, 100);
    }
}