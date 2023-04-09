export class Run {
  constructor(
        public _id: string,
        public game: string,
        public category: string,
        public time: { hours: number, minutes: number, seconds: number},
        public platform: string,
        public player: string,
        public placement: number,
        public videoLink: string
    ){ }
}