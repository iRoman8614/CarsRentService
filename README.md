This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Сделать next проект с двумя страницами.
Список элементов и карточка элемента по id.

1) Список элементов с фильтрацией и постраничным разбиением.
   Возможные фильтры можно забрать из апи https://test.taxivoshod.ru/api/test/?w=catalog-filter
   Там описаны 3 выпадающий списка с маркой, моделью и тарифом. В каждом списке одновременно могут быть выбраны несколько элементов

Список моделей сгруппирован по марке. При выборе марки список моделей сокращается, в нем остаются только модели выбранных марок.

2) Сам список запрашивается в апи https://test.taxivoshod.ru/api/test/?w=catalog-cars
   В списке элементов нужно выводить все поля, которые есть в апи. Картинку, бренд, модель, регистрационный номер, цену и тариф.

При фильтрации к урлу апи добавляются выбранные параметры в виде массива
https://test.taxivoshod.ru/api/test/?w=catalog-cars&brand[]=BMW&brand[]=Chery
Страница выбирается параметром page
https://test.taxivoshod.ru/api/test/?w=catalog-cars&brand[]=BMW&brand[]=Chery&page=2

3) При клике на элемент попадаем в карточку
   https://test.taxivoshod.ru/api/test/?w=catalog-car&id=1489
   Поля там те же, что и в списке, но картинки это массив. Нужно сделать любой стандартный слайдер картинок.

Сделать кнопку "назад", возвращающую в список в том же состоянии, в котором он был, т.е. с сохранением фильтров и страницы
