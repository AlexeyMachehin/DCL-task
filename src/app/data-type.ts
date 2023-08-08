export interface CarPriceRange {
  readonly min: number;
  readonly mid: number;
  readonly max: number;
}

export interface Period {
  from: number;
  to: number;
}

export interface CarPeriod {
  readonly min: Period;
  readonly mid: Period;
  readonly max: Pick<Period, 'from'> & {
    readonly to: number | null;
  };
}

export interface Car {
  readonly name: string;
  readonly period: CarPeriod;
  readonly price: CarPriceRange;
}

export interface Category {
  readonly categoryName: string;
  readonly cars: readonly Car[];
}

export interface Data {
  readonly categories: readonly Category[];
}
