import burger from './images/burger.jpg'
import kentangGoreng from './images/kentang-goreng.jpg'
import mieGoreng from './images/mie-goreng.jpg'
import nasiGoreng from './images/nasi-goreng.jpg'

import drink1 from './images/drink-1.jpg'
import drink2 from './images/drink-2.jpg'
import drink3 from './images/drink-3.jpg'

export const products = [
   {
      id: 1,
      name: 'Kentang Goreng',
      photo: kentangGoreng,
      weight: '15g',
      category: 'makanan',
      price: 10_000,
   },
   {
      id: 2,
      name: 'Mie Goreng',
      photo: mieGoreng,
      weight: '10g',
      category: 'makanan',
      price: 12_000,
   },
   {
      id: 3,
      name: 'Burger',
      photo: burger,
      weight: '15g',
      category: 'makanan',
      price: 18_000,
   },
   {
      id: 4,
      name: 'Nasi Goreng',
      photo: nasiGoreng,
      weight: '17g',
      category: 'makanan',
      price: 13_000,
   },
   {
      id: 5,
      name: 'Minum 1',
      photo: drink1,
      weight: '17g',
      category: 'minuman',
      price: 10_000,
   },

   {
      id: 6,
      name: 'Minum 2',
      photo: drink2,
      weight: '17g',
      category: 'minuman',
      price: 10_000,
   },

   {
      id: 7,
      name: 'Minum 3',
      photo: drink3,
      weight: '17g',
      category: 'minuman',
      price: 10_000,
   },
]

export const orders = [
   {
      id: 1,
      items: [
         {
            product: products[0],
            qty: 1,
         },
         {
            product: products[3],
            qty: 2,
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'pending',
      totalPrice: products[0].price * 1 + products[3].price * 2,
   },
   {
      id: 2,
      items: [
         {
            product: products[1],
            qty: 1,
         },
         {
            product: products[2],
            qty: 2,
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'success',
      totalPrice: products[1].price * 1 + products[3].price * 2,
   },
]
