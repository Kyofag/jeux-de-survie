// World.js

class World {
    constructor(scene) {
        this.scene = scene;
        this.map = null;
        this.collisionLayers = []; 
        
        // Configuration de la grille du monde (basée sur vos cartes Tiled de 30x20)
        this.TILE_SIZE = 64; 
        this.MAP_WIDTH_TILES = 30; 
        this.MAP_HEIGHT_TILES = 20; 
        
        // Disposition des cartes
        // [ map_gauche, map_up (test carte), map_droite ]
        // [ null,       map_center,          map_bottom ]
        this.WORLD_GRID = [
            ['map_left', 'map_up', 'map_right'], 
            [null,       'map_center', 'map_bottom'],  
        ];
        
        this.TOTAL_WIDTH_TILES = this.MAP_WIDTH_TILES * 3;
        this.TOTAL_HEIGHT_TILES = this.MAP_HEIGHT_TILES * 2;

        this.createMap();
    }

    createMap() {
        // --- 1. Créer une nouvelle carte (Vide) qui sera notre grand monde ---
        this.map = this.scene.make.tilemap({
            tileWidth: this.TILE_SIZE,
            tileHeight: this.TILE_SIZE,
            width: this.TOTAL_WIDTH_TILES,
            height: this.TOTAL_HEIGHT_TILES
        });

        // --- 2. Charger les tilesets sur la carte vide ---
        // Liste de tous les tilesets utilisés dans TOUS vos JSON
        const allTilesets = [
            this.map.addTilesetImage('Tilemap_color1', 'tileset_color1_key'),
            this.map.addTilesetImage('Tilemap_color2', 'tileset_color2_key'),
            this.map.addTilesetImage('Tilemap_color3', 'tileset_color3_key'), 
            this.map.addTilesetImage('Tilemap_color4', 'tileset_color4_key'),
            this.map.addTilesetImage('Tilemap_color5', 'tileset_color5_key'),
            this.map.addTilesetImage('Water Foam', 'tileset_water_foam_key'),
            this.map.addTilesetImage('Water Background color', 'tileset_water_bg_key'),
            this.map.addTilesetImage('Tree1', 'tileset_tree1_key'),
            this.map.addTilesetImage('Tree2', 'tileset_tree2_key'),
            this.map.addTilesetImage('Tree3', 'tileset_tree3_key'),
            // Ajoutez ici tout autre tileset si vous en avez d'autres dans vos cartes
        ];
        
        // --- 3. Créer les Couches (Layers) sur la carte vide ---
        const groundLayer = this.map.createBlankLayer('GroundLayer', allTilesets, 0, 0);
        const wallsLayer = this.map.createBlankLayer('WallsLayer', allTilesets, 0, 0);

        // --- 4. Fusionner les cartes JSON dans la carte vide ---
        for (let row = 0; row < this.WORLD_GRID.length; row++) {
            for (let col = 0; col < this.WORLD_GRID[row].length; col++) {
                const mapKey = this.WORLD_GRID[row][col];
                
                if (mapKey) {
                    const mapData = this.scene.cache.tilemap.get(mapKey).data;
                    
                    const offsetX = col * this.MAP_WIDTH_TILES;
                    const offsetY = row * this.MAP_HEIGHT_TILES;
                    
                    mapData.layers.forEach(layer => {
                        if (layer.type === 'tilelayer') {
                            const sourceMap = this.scene.make.tilemap({ key: mapKey });
                            allTilesets.forEach(ts => {
                                sourceMap.addTilesetImage(ts.name, ts.key); 
                            });
                            
                            let targetLayer = null;
                            // Assumons que le "Calque de Tuiles 1" est le sol et le "Calque de Tuiles 2" les murs
                            if (layer.name.includes('Calque de Tuiles 1')) {
                                targetLayer = groundLayer;
                            } else if (layer.name.includes('Calque de Tuiles 2')) {
                                targetLayer = wallsLayer;
                            }

                            if (targetLayer) {
                                const sourceLayer = sourceMap.createLayer(layer.name, allTilesets, 0, 0);

                                targetLayer.copy(
                                    sourceLayer, 
                                    offsetX, 
                                    offsetY, 
                                    0, 
                                    0, 
                                    this.MAP_WIDTH_TILES, 
                                    this.MAP_HEIGHT_TILES
                                );
                            }
                        }
                    });
                }
            }
        }
        
        // 5. Configurer les collisions sur la grande carte
        wallsLayer.setCollisionByExclusion([-1]);
        wallsLayer.setDepth(this.TOTAL_HEIGHT_TILES * this.TILE_SIZE); 
        this.collisionLayers.push(wallsLayer);

        // Mettre à jour les limites du monde (Taille totale)
        const totalWidthPixels = this.map.widthInPixels;
        const totalHeightPixels = this.map.heightInPixels;
        this.scene.physics.world.setBounds(0, 0, totalWidthPixels, totalHeightPixels);
        this.scene.cameras.main.setBounds(0, 0, totalWidthPixels, totalHeightPixels);
    }
    
    getCollisionLayers() {
        return this.collisionLayers;
    }
}