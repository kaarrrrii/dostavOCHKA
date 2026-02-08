import { hits, pizzas, sushi, drinks, combos } from './products';

export const CATALOG_SECTIONS = [
  {
    id: 'hits',
    title: 'Хиты продаж',
    subtitle: 'Самые популярные блюда',
    products: hits,
    type: 'hit',
  },
  {
    id: 'pizza',
    title: 'Пицца',
    subtitle: 'Итальянская классика с душой',
    products: pizzas,
    type: 'pizza',
  },
  {
    id: 'sushi',
    title: 'Суши и роллы',
    subtitle: 'Японская кухня от шеф-повара',
    products: sushi,
    type: 'sushi',
  },
  {
    id: 'drinks',
    title: 'Напитки',
    subtitle: 'Освежающие напитки',
    products: drinks,
    type: 'drink',
  },
  {
    id: 'combos',
    title: 'Комбо',
    subtitle: 'Готовые наборы по выгодной цене',
    products: combos,
    type: 'combo',
  },
];
