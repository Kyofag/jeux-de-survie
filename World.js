// World.js

class World {
    constructor(scene) {
        this.scene = scene;
        this.backgroundGroup = this.scene.add.group(); 
        this.collisionObjects = this.scene.physics.add.staticGroup(); 
        this.invisibleWalls = this.scene.physics.add.staticGroup(); 

        this.placeEnvironment();
        this.createInvisibleWalls(this.scene.sys.game.config.width, this.scene.sys.game.config.height);
    }

    placeEnvironment() {
        const gameWidth = this.scene.sys.game.config.width;
        const gameHeight = this.scene.sys.game.config.height;

        this.scene.cameras.main.setBackgroundColor('#68b14a'); 
        
        const wallTexture = 'tileset_simu';
        
        const obstacles = [
            [gameWidth / 2, 100], 
            [150, 300],
            [gameWidth - 150, 400],
            [gameWidth / 2, gameHeight - 100]
        ];

        obstacles.forEach(pos => {
            const rockWall = this.collisionObjects.create(pos[0], pos[1], wallTexture);
            rockWall.setOrigin(0.5); 
            rockWall.setDepth(rockWall.y); 
            
            const spriteWidth = rockWall.width;
            const spriteHeight = rockWall.height;
            const bodyWidth = spriteWidth * 0.8;
            const bodyHeight = 32; 

            rockWall.body.setSize(bodyWidth, bodyHeight); 
            rockWall.body.setOffset((spriteWidth - bodyWidth) / 2, spriteHeight - bodyHeight);
        });
    }
    
    createInvisibleWalls(width, height) {
        const walls = [
            [0, 0, width, 1],       
            [0, height - 1, width, 1], 
            [0, 0, 1, height],      
            [width - 1, 0, 1, height]
        ];

        walls.forEach(wall => {
            const block = this.invisibleWalls.create(wall[0], wall[1], null);
            block.setOrigin(0, 0);
            block.body.setSize(wall[2], wall[3]);
            block.setVisible(false);
        });
    }

    getCollisionLayers() {
        return [this.collisionObjects, this.invisibleWalls];
    }
}