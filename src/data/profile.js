export const PROFILE_TABS = [
  { id: 'data', label: 'Данные' },
  { id: 'addresses', label: 'Адреса' },
  { id: 'orders', label: 'Заказы' },
];

export const PROFILE_INFO = [
  { label: 'Имя', value: 'Гость' },
  { label: 'Email', value: 'example@mail.com' },
  { label: 'Телефон', value: '+7 (594) 324-21-29' },
];

export const PROFILE_DATA = {
  name: 'Гость',
  email: 'example@mail.com',
  phone: '+7 (594) 324-21-29',
};

export const DELIVERY_ADDRESSES = [
  {
    id: 'addr-1',
    street: 'ул. Примерная',
    house: '12',
    apartment: '34',
    entrance: '2',
    intercomCode: '2580',
  },
  {
    id: 'addr-2',
    street: 'пр. Центральный',
    house: '7',
    apartment: '21',
    entrance: '1',
    intercomCode: '',
  },
];

export const ORDERS_HISTORY = [
  {
    id: '1524',
    dateTime: '04.02.2026, 19:35',
    total: '2 190 ₽',
    deliveryAddress: 'ул. Примерная, 12, кв. 34',
    positions: ['Пицца Пепперони x1', 'Ролл Филадельфия x2', 'Лимонад x1'],
  },
  {
    id: '1498',
    dateTime: '30.01.2026, 14:10',
    total: '1 450 ₽',
    deliveryAddress: 'пр. Центральный, 7, БЦ Шурикен, офис 21',
    positions: ['Сет Калифорния x1', 'Вок с курицей x1'],
  },
];
