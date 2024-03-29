import type { Run } from '@/models/run'
import type { Game } from '@/models/game'
import type { FormInstance } from 'element-plus';

export default ({
    sortAndPlaceRuns(games: Game[], runs: Run[]) {
        const sortRuns = (runsToSort: any) => {
            const timeInSeconds = (time : {hours: number, minutes: number, seconds: number}) => time.hours * 60 * 60 + time.minutes * 60 + time.seconds;
            const sortedRuns = runsToSort.sort((
                a: { time: { hours: number; minutes: number; seconds: number } },
                b: { time: { hours: number; minutes: number; seconds: number } }
                ) => timeInSeconds(a.time)-timeInSeconds(b.time));
            return sortedRuns;
        };

        let resRuns = new Array<Run>();

        if (games == undefined || runs == undefined) return;
        games.forEach((game: Game) => {
            const runList = runs.filter((run: {game: string}) => run.game == game._id);
            const sortedRuns = sortRuns(runList);        
            var i = 1;
            sortedRuns.forEach((run: Run) => {
                run.placement = i;
                i++;
                resRuns.push(run);
            })
        });
        return resRuns;
    },
    async validateFields(formEl: FormInstance | undefined): Promise<boolean> {
        let p = new Promise<boolean>( async (resolve, reject) => {
            if(!formEl) reject(false);

            await formEl?.validate((valid, fields) => {
                if(!valid) {
                    reject(false);
                }
            })
            resolve(true);
        })
        console.log(p);
        return p;
    }
});
