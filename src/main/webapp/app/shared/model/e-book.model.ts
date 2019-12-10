export interface IEBook {
  id?: number;
  format?: string;
}

export class EBook implements IEBook {
  constructor(public id?: number, public format?: string) {}
}
