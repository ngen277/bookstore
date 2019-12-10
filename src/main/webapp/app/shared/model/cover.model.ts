export interface ICover {
  id?: number;
  cover?: string;
}

export class Cover implements ICover {
  constructor(public id?: number, public cover?: string) {}
}
