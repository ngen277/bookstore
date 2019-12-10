export interface IDiscount {
  id?: number;
  discount?: number;
  description?: string;
}

export class Discount implements IDiscount {
  constructor(public id?: number, public discount?: number, public description?: string) {}
}
