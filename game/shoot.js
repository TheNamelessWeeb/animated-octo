var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
		//enemy1.dead();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }
	//collision between bullet and enemies
    for (var i = 0; i < player1.bullets.length; i++)
    {
		for (var j = 0; j < enemies.length; j++) {
			var bulletx = player1.bullets[i].position.x;
			var bullety = player1.bullets[i].position.y;
			if ( bulletx < enemies[j].graphic.position.x + 10 && bulletx > enemies[j].graphic.position.x - 10
				&& bullety < enemies[j].graphic.position.y + 10 && bullety > enemies[j].graphic.position.y - 10)
			{
				enemies[j].dead();
				enemies.splice(j, 1);
				j--;
			}
		};
    }

}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( x < 0 )
        player1.graphic.position.x -= x;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;
    //collision between player and enemies
	enemies.forEach(enemy => {
		var x = player1.graphic.position.x;
		var y = player1.graphic.position.y;
		var enemyx = enemy.graphic.position.x;
		var enemyy = enemy.graphic.position.y;
		if (enemyx < x + 10 && enemyx > x - 10 && enemyy < y + 10 && enemyy > y - 10) {
			enemy.graphic.position.x = -3000;
			scene.remove(enemy);
			player1.dead();
		}
	});

}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x;
    var y = player1.graphic.position.y;
	//console.log(x,":",y);
    var length = noGround.length;
    var element = noGround[0];

    noGround.forEach(element => {

        if ((x >= element.x)
            && (x <= element.x + sizeOfTileX)
            && (y >= element.y) 
            && (y <= element.y + sizeOfTileY))
        {
            player1.dead();
        }
    });

}
