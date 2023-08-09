import { Component, OnInit, inject } from '@angular/core';
import { data } from './mock-data';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Car, Category } from './data-type';

const ONE_DAY = 1;
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly formBuild = inject(NonNullableFormBuilder);

  public rentPrice = 0;

  protected readonly data = data;

  protected cars: readonly Car[] = [];

  protected readonly form = this.formBuild.group({
    category: this.formBuild.control<Category['categoryName'] | null>(
      null,
      Validators.required,
    ),
    datePicker: this.formBuild.group({
      start: this.formBuild.control<string | null>(null, Validators.required),
      end: this.formBuild.control<string | null>(null, Validators.required),
    }),
    car: this.formBuild.control<string | null>(
      {
        disabled: true,
        value: null,
      },
      Validators.required,
    ),
  });

  public ngOnInit(): void {
    this.subscribeToCategoryFormControlChanges();
    this.subscribeToFormControlsChanges();
  }

  private getRentPrice(
    category: Category['categoryName'],
    datePicker: Partial<{
      start: string | null;
      end: string | null;
    }>,
    car: Car['name'],
  ): number {
    const choosedCar = this.getCarsList(category).find(
      currentCar => currentCar.name === car,
    );

    if (!choosedCar) {
      return 0;
    }

    if (datePicker.start == null || datePicker.end == null) {
      return 0;
    }

    if (datePicker.start > datePicker.end) {
      return 0;
    }

    const startDay = new Date(datePicker.start);
    const endDay = new Date(datePicker.end);

    const countRentDays =
      Math.round(
        (endDay.getTime() - startDay.getTime()) / MILLISECONDS_IN_DAY,
      ) + ONE_DAY;

    const { min, mid, max } = choosedCar.period;
    if (
      countRentDays <= min.from ||
      (countRentDays >= min.from && countRentDays <= min.to)
    ) {
      return countRentDays * choosedCar.price.min;
    }
    if (countRentDays >= mid.from && countRentDays <= mid.to) {
      return countRentDays * choosedCar.price.mid;
    }
    if (countRentDays >= max.from && countRentDays <= (max.to ?? Infinity)) {
      return countRentDays * choosedCar.price.max;
    }

    return 0;
  }

  private updateCarsList(categoryName: Category['categoryName']): void {
    this.cars = this.getCarsList(categoryName);
  }

  private getCarsList(categoryName: Category['categoryName']): readonly Car[] {
    return (
      this.data.categories.find(
        category => category.categoryName === categoryName,
      )?.cars ?? []
    );
  }

  private subscribeToCategoryFormControlChanges(): void {
    this.form.controls.category.valueChanges.subscribe(value => {
      if (value != null) {
        this.form.controls.car.enable();
        this.updateCarsList(value);
      }
    });
  }

  private subscribeToFormControlsChanges(): void {
    this.form.valueChanges.subscribe(value => {
      this.form.markAllAsTouched();

      const { category, datePicker, car } = value;

      if (this.form.valid && category && datePicker && car) {
        this.rentPrice = this.getRentPrice(category, datePicker, car);
      }
    });
  }
}
