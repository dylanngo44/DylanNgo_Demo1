var platforms, stars, counter = 0;
demo.stage1 = function(){};
demo.stage1.prototype = {
    preload: function(){
        game.load.image('nova', 'assets/sprites/Nova.png');
        game.load.image('ground', 'assets/sprites/platform.png');
        game.load.image('star', 'assets/sprites/star.png')
    },
    create: function(){
        game.stage.backgroundColor = '#7D8487';
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 1500, 1000);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        platforms = game.add.group();
        platforms.enableBody = true;
        var bottom = platforms.create(0, 975, 'ground');
        bottom.body.immovable = true;
        bottom.scale.setTo(300, 1);
        var ledge = platforms.create(0, 750, "ground");
        ledge.body.immovable = true;
        ledge.scale.setTo(3, 3)
        ledge = platforms.create(500, 500, "ground")
        ledge.body.immovable = true;
        ledge.scale.setTo(3, 3)
        ledge = platforms.create(1000, 250, "ground");
        ledge.body.immovable = true;
        ledge.scale.setTo(3, 3)
        
        stars = game.add.group();
        stars.enableBody = true;
        for (var i = 0; i < 6; i++){
            var star = stars.create(i * 250, 0, 'star');
            star.scale.setTo(0.3, 0.3);
            star.body.gravity.y = 100;
            star.body.bounce.y = 0.5;
            counter += 1;
        }
        
        nova = game.add.sprite(centerX, 800, 'nova');
        nova.anchor.setTo(0.5, 0.5);
        nova.scale.setTo(0.3, 0.3);
        game.physics.arcade.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 300;
        
        cursors = game.input.keyboard.createCursorKeys();
        
        scores = game.add.text(100, 100, 'Score: ' + score, {fontSize: '30px'});
    },
    update: function(){
        
        var hitPlatforms = game.physics.arcade.collide(nova, platforms);
        game.physics.arcade.collide(stars, platforms);
        nova.body.velocity.x = 0;
        
        game.physics.arcade.overlap(nova, stars, collectStar, null, this);
        
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
}
function collectStar(nova, star){
    star.kill();
    addScore(null, 10);
    counter -= 1;
    if (counter == 0){
        game.add.text(650, 850, 'Press 2 to play next level');
    }
}