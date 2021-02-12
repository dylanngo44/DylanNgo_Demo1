var demo = {}
var centerX = 1500 / 2, centerY = 1000 / 2, nova, speed = 6, score = 0, scores, lives = 2;
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){
        game.load.image('button1', 'assets/sprites/Stage1Button.png');
    },
    create: function(){
        game.stage.backgroundColor = '#00C4CA';
        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.text(650, 200, "Menu", {fontSize: 100 + 'px', fill: '#000'});
        
        var b1 = game.add.button(600, centerY, 'button1', function(){
            changeState(null, 1);
        });
        game.add.text(200, 700, 'press "m" to get back to menu and reset score', {fontSize: 50 + 'px', fill: '#000'});
        
        game.add.text(300, 900, 'press 1-2 to get to corresponding stage', {fontSize: 50 + 'px', fill: '#000'});
        scores = game.add.text(100, 100, 'Score: ' + score, {fontSize: '30px'});
    },
    update: function(){}
}
function changeState(i, stateNum){
    if (stateNum == 'm'){
        console.log("menu");
        score = 0;
        game.state.start("menu");
    } else {
        console.log('state' + stateNum);
        lives = 2;
        game.state.start('stage' + stateNum);
    }
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.M, changeState, 'm');
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
}

function addScore(i, num){
    score += num;
    scores.setText("Score: " + score)
    console.log(score);
}
function minusScore(i, num){
    if (score > 0){
        score -= num;
        scores.setText("Score: " + score)
        console.log(score)
    }
}