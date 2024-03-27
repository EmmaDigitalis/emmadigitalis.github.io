import {collide} from './collision.js';

export default class Brick{
    constructor(game, position){
        this.image = document.getElementById("img_brick");

        this.game = game;

        this.position = position;

        this.width = 48;
        this.height = 12;

        this.markedForDeletion = false;
    }

    update(){
        if(collide(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;

            this.markedForDeletion = true;
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}