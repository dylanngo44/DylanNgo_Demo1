var finish;
demo.stage2 = function(){};
demo.stage2.prototype = {
    preload: function(){
        game.load.image('nova', 'assets/sprites/Nova.png');
        game.load.image('ground', 'assets/sprites/platform.png');
        game.load.image('danger', 'assets/sprites/enemy.png');
        game.load.image('fin', 'assets/sprites/finish.png');
        game.load.image('menuBut', 'assets/sprites/menuButton.png');
    },
    create: function(){
        game.stage.backgroundColor = "#CC99FF";
        addChangeStateEventListeners();
        lifeCount = game.add.text(1250, 100, 'Lives: ' + lives, {fontSize: '30px'});
        scores = game.add.text(100, 100, 'Score: ' + score, {fontSize: '30px'});
        game.world.setBounds(0, 0, 1500, 1000);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        platforms = game.add.group();
        platforms.enableBody = true;
        var bottom = platforms.create(0, 975, 'ground');
        bottom.body.immovable = true;
        bottom.scale.setTo(300, 1);
        var ledge = platforms.create(0, 250, "ground");
        ledge.body.immovable = true;
        ledge.scale.setTo(3, 3)
        ledge = platforms.create(500, 500, "ground")
        ledge.body.immovable = true;
        ledge.scale.setTo(3, 3)
        ledge = platforms.create(1000, 750, "ground");
        ledge.body.immovable = true;
        ledge.scale.setTo(3, 3)
        
        enemies = game.add.group();
        enemies.enableBody = true;
        var spikes = enemies.create(120, 0, 'danger');
        spikes.scale.setTo(0.25, 0.25);
        spikes.body.gravity.y = 100;
        spikes = enemies.create(600, 0, 'danger');
        spikes.scale.setTo(0.25, 0.25);
        spikes.body.gravity.y = 100;
        spikes = enemies.create(1000, 0, 'danger');
        spikes.scale.setTo(0.25, 0.25);
        spikes.body.gravity.y = 100;
        
        nova = game.add.sprite(centerX, 800, 'nova');
        nova.anchor.setTo(0.5, 0.5);
        nova.scale.setTo(0.3, 0.3);
        game.physics.arcade.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 300;
        
        finish = game.add.sprite(0, 0, 'fin');
        game.physics.arcade.enable(finish);
        finish.enableBody = true;
        finish.scale.setTo(1, 1.75)
        
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    update: function(){
        
        var hitPlatforms = game.physics.arcade.collide(nova, platforms);
        game.physics.arcade.collide(enemies, platforms);
        nova.body.velocity.x = 0;
        
        game.physics.arcade.overlap(nova, enemies, hitSpike, null, this);
        game.physics.arcade.overlap(nova, finish, endGame, null, this);
        
        if(cursors.left.isDown){
            nova.scale.setTo(-0.3, 0.3)
            nova.body.velocity.x = -200;
        }
        else if(cursors.right.isDown){
            nova.scale.setTo(0.3, 0.3)
            nova.body.velocity.x = 200;
        }
        if(cursors.up.isDown && nova.body.touching.down){
            nova.body.velocity.y = -425;
        }
    }
};
function hitSpike(nova, spikes){
    spikes.kill();
    minusScore(null, 10)
    lives -= 1;
    lifeCount.setText('Lives: ' + lives);
        if (lives <= 0){
            nova.kill();
            game.add.text(650, 850, 'You died ):');
            var b1 = game.add.button(600, 300, 'menuBut', function(){
            changeState(null, 'm');
        });
        }
}
function endGame(nova, finish){
    if (score != 0){
        enemies.kill();
        game.add.text(650, 850, 'You Win!! :)');
    } 
    else{
        game.add.text(650, 850, 'Collect Stars in stage 1');
    }
}