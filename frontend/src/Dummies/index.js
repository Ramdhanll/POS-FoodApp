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
      name: 'Mie Goreng Mampus (1-10)',
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
      name: 'Red Valvet',
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
      name: 'Purple ',
      photo: drink3,
      weight: '17g',
      category: 'minuman',
      price: 10_000,
   },
]

export const orders = [
   {
      id: 1,
      items: [],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'pending',
      totalPrice: 0,
   },
   {
      id: 2,
      items: [
         {
            product: products[1],
            qty: 1,
            note: 'Level 10',
         },
         {
            product: products[2],
            qty: 2,
            note: 'Tidak ada catatan',
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'completed',
      totalPrice: products[1].price * 1 + products[3].price * 2,
   },
   {
      id: 3,
      items: [
         {
            product: products[4],
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: products[6],
            qty: 2,
            note: 'Tidak ada catatan',
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'preparing',
      totalPrice: products[4].price * 1 + products[6].price * 2,
   },
   {
      id: 4,
      items: [
         {
            product: products[5],
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: products[6],
            qty: 2,
            note: 'Tidak ada catatan',
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'delivered',
      totalPrice: products[5].price * 1 + products[6].price * 2,
   },
]
