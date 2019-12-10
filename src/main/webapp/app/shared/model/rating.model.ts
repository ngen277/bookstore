export interface IRating {
  id?: number;
  rating?: number;
}

export class Rating implements IRating {
  constructor(public id?: number, public rating?: number) {}
}
