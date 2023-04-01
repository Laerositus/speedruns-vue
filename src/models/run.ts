import type { Game } from'./game'
import type { Category } from './category'
import type { Platform } from './platform'
import type { Player } from './player'

export class Run {
    game: Game;
    category: Category;
    time: Date;
    platform: Platform;
    player: Player;
    placement: number;
    videoLink: string;


    constructor(
        _id: string,
        game: Game,
        category: Category,
        time: Date,
        platform: Platform,
        player: Player,
        placement: number,
        videoLink: string
    ){
        this.game = game;
        this.category = category;
        this.time = time;
        this.platform = platform;
        this.player = player;
        this.placement = placement;
        this.videoLink = videoLink;        
    }
}