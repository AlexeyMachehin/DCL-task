import { Component, OnInit, inject } from '@angular/core';
import { data } from './mock-data';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Car, CarPeriod, Category, Period } from './data-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly formBuild = inject(NonNullableFormBuilder);

  public rentPrice: number | undefined;

  protected readonly data = data;

  protected cars: readonly Car[] = [];

  protected readonly form = this.formBuild.group({
    category: this.formBuild.control<Category['categoryName'] | null>(
      null,
      Validators.required,
    ),
    datePicker: this.formBuild.group({
      start: this.formBuild.control<Date | null>(null, Validators.required),
      end: this.formBuild.control<Date | null>(null, Validators.required),
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
    this.form.controls.category.valueChanges.subscribe(value => {
      if (value != null) {
        this.form.controls.car.enable();
        this.updateCarsList(value);
      }
    });

    this.form.valueChanges.subscribe(value => {
      this.form.markAllAsTouched();

      const { category, datePicker, car } = value;

      if (this.form.valid && category && datePicker && car) {
        this.getRentPrice(category, datePicker, car);
      }
    });
  }

  private getRentPrice(
    category: Category['categoryName'],
    datePicker: Partial<{
      start: Date | null;
      end: Date | null;
    }>,
    car: Car['name'],
  ): number | undefined {
    const choosedCar = this.getCarsList(category).find(
      currentCar => currentCar.name === car,
    );
  
    if (!choosedCar) {
      return;
    }
  
    const startDay = datePicker.start ? datePicker.start.getDate() : 0;
    const endDay = datePicker.end ? datePicker.end.getDate() : 0;
    const countRentDays = endDay - startDay === 0 ? 1 : endDay - startDay;
  
    let price: number;
  
    if (
      countRentDays <= choosedCar.period.min.from ||
      (countRentDays >= choosedCar.period.min.from &&
        countRentDays <= choosedCar.period.min.to)
    ) {
      price = countRentDays * choosedCar.price.min;
    } else if (
      countRentDays >= choosedCar.period.mid.from &&
      countRentDays <= choosedCar.period.mid.to
    ) {
      price = countRentDays * choosedCar.price.mid;
    } else if (
      countRentDays >= choosedCar.period.max.from &&
      countRentDays <= (choosedCar.period.max.to ?? Infinity)
    ) {
      price = countRentDays * choosedCar.price.max;
    } else {
      return;
    }
  
    this.rentPrice = price;
    return price;
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
}
