export class Player {
    playername: string;
    totalRuns: number;
    creationDate: Date;
    discord: string;
    steam: string;
    twitch: string;
    youtube: string;
    
    constructor(
        playername: string,
        totalRuns: number = 0,
        creationDate: Date = new Date(),
        discord: string = "",
        steam: string = "",
        twitch: string = "" ,
        youtube: string = ""
    ){
        this.playername = playername;
        this.totalRuns = totalRuns;
        this.creationDate = creationDate;
        this.discord = discord;
        this.steam = steam;
        this.twitch =twitch;
        this.youtube =youtube;        
    }
}