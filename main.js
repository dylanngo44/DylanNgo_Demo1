var game = new Phaser.Game(1500, 1000, Phaser.AUTO);
game.state.add("menu", demo.menu);
game.state.add("stage1", demo.stage1);
game.state.add("stage2", demo.stage2);
game.state.start("menu");