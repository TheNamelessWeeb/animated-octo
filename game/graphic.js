function init()
{
	clock.start();
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    noGround = [];
    ground = new Ground(0xffffff, 10);
    
    player1 = new Player("player1", 0xffffff, new THREE.Vector2(WIDTH/10/2, HEIGHT/10/2), 0);
    scene.add(player1.graphic);
	
	alive = true;
	enemies = [];
	lastElapsed = -1;
	lastElapsedDir = -1;
	timeDifficulty = 10;
	
    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);
}

function Ground(color, nb_tile)
{
    colors = Array(0x0f00f0, 0x0ff000, 0x0000ff, 0x000000);

    sizeOfTileX = WIDTH / nb_tile;
    minX = -(WIDTH/2);
    maxX = (WIDTH/2);
    
    sizeOfTileY = HEIGHT / nb_tile;
    minY = -(HEIGHT/2);
    maxY = (HEIGHT/2);

    for (x = minX; x < maxX; x = x+sizeOfTileX){
        for (y = minY; y < maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];
			if (x === 0 && y === 0)
				color = 0x00ff00;
       
            if (0x000000 !== color)
            {
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX - 2, sizeOfTileY - 2),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.8}));
                tmpGround.position.x = x + sizeOfTileX/2;
                tmpGround.position.y = y + sizeOfTileY/2;
                scene.add(tmpGround);
            }
            else
                noGround.push({x, y});
        }
    }
}

function Light(name, color, position)
{
    pointLight = new THREE.PointLight(color, 50, 1000000000000000);

    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}
