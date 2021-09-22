function update()
{
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 50 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta * 2;   // pi/2 radians (90 degrees) per second
	var elapsed = Math.floor(clock.getElapsedTime());

	if (elapsed % Math.floor(timeDifficulty) === 0 && elapsed !== lastElapsed) {
		lastElapsed = elapsed;
		Enemy.spawn();	
	}
	
	if (elapsed % 5 === 0 && elapsed !== lastElapsedDir) {
		enemies.forEach(enemy => {
			var oldDir = enemy.direction;
			enemy.direction = Math.random() * 360
			enemy.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), enemy.direction - oldDir)
		});
		lastElapsedDir = elapsed;
	}

    if (keyboard.pressed("left"))
        player1.turnLeft(rotateAngle);
    if (keyboard.pressed("right"))
        player1.turnRight(rotateAngle);
    if (keyboard.pressed("up"))
        player1.accelerate(moveDistance);
    if (keyboard.pressed("down"))
        player1.decelerate(moveDistance);

    player1.move();
	enemies.forEach(enemy => enemy.move());
    controls.update();
}