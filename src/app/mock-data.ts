import { Data } from './data-type';

export const data: Data = {
  categories: [
    {
      categoryName: 'B',
      cars: [
        {
          name: 'BMW X5',
          period: {
            min: { from: 1, to: 1 },
            mid: { from: 2, to: 5 },
            max: { from: 6, to: null },
          },
          price: {
            min: 10000,
            mid: 8000,
            max: 5000,
          },
        },
        {
          name: 'Nissan Quashkai',
          period: {
            min: { from: 1, to: 1 },
            mid: { from: 2, to: 5 },
            max: { from: 6, to: null },
          },
          price: {
            min: 9000,
            mid: 7000,
            max: 4500,
          },
        },
        {
          name: 'Ford Focus',
          period: {
            min: { from: 1, to: 1 },
            mid: { from: 2, to: 5 },
            max: { from: 6, to: null },
          },
          price: {
            min: 8000,
            mid: 6500,
            max: 4000,
          },
        },
      ],
    },
    {
      categoryName: 'C',
      cars: [
        {
          name: 'Ford Transit',
          period: {
            min: { from: 1, to: 1 },
            mid: { from: 2, to: 5 },
            max: { from: 6, to: null },
          },
          price: {
            min: 12000,
            mid: 10000,
            max: 8000,
          },
        },
        {
          name: 'Mercedes-Benz Sprinter',
          period: {
            min: { from: 1, to: 1 },
            mid: { from: 2, to: 5 },
            max: { from: 6, to: null },
          },
          price: {
            min: 13000,
            mid: 11000,
            max: 9000,
          },
        },
      ],
    },
  ],
};
