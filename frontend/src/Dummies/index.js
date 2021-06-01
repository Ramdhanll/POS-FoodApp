import burger from './images/burger.jpg'
import kentangGoreng from './images/kentang-goreng.jpg'
import mieGoreng from './images/mie-goreng.jpg'
import nasiGoreng from './images/nasi-goreng.jpg'

import drink1 from './images/drink-1.jpg'
import drink2 from './images/drink-2.jpg'
import drink3 from './images/drink-3.jpg'

const today = new Date()
var date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
var time =
   today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

export const products = [
   {
      id: 1,
      name: 'Kentang Goreng',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: kentangGoreng,
      weight: '15g',
      category: 'makanan',
      qty: 20,
      price: 10_000,
   },
   {
      id: 2,
      name: 'Mie Goreng Mampus (1-10)',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: mieGoreng,
      weight: '10g',
      category: 'makanan',
      qty: 20,
      price: 12_000,
   },
   {
      id: 3,
      name: 'Burger',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: burger,
      weight: '15g',
      category: 'makanan',
      qty: 20,
      price: 18_000,
   },
   {
      id: 4,
      name: 'Nasi Goreng',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: nasiGoreng,
      weight: '17g',
      category: 'makanan',
      qty: 20,
      price: 13_000,
   },
   {
      id: 5,
      name: 'Red Valvet',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: drink1,
      weight: '17g',
      category: 'minuman',
      qty: 20,
      price: 10_000,
   },

   {
      id: 6,
      name: 'Minum 2',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: drink2,
      weight: '17g',
      category: 'minuman',
      qty: 20,
      price: 10_000,
   },

   {
      id: 7,
      name: 'Purple ',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: drink3,
      weight: '17g',
      category: 'minuman',
      qty: 20,
      price: 10_000,
   },
   {
      id: 8,
      name: 'Kentang Goreng',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: kentangGoreng,
      weight: '15g',
      category: 'makanan',
      qty: 20,
      price: 10_000,
   },
   {
      id: 9,
      name: 'Mie Goreng Mampus (1-10)',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: mieGoreng,
      weight: '10g',
      category: 'makanan',
      qty: 20,
      price: 12_000,
   },
   {
      id: 10,
      name: 'Burger',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: burger,
      weight: '15g',
      category: 'makanan',
      qty: 20,
      price: 18_000,
   },
   {
      id: 11,
      name: 'Nasi Goreng',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: nasiGoreng,
      weight: '17g',
      category: 'makanan',
      qty: 20,
      price: 13_000,
   },
   {
      id: 12,
      name: 'Red Valvet',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: drink1,
      weight: '17g',
      category: 'minuman',
      qty: 20,
      price: 10_000,
   },

   {
      id: 13,
      name: 'Minum 2',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: drink2,
      weight: '17g',
      category: 'minuman',
      qty: 20,
      price: 10_000,
   },

   {
      id: 14,
      name: 'Purple ',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: drink3,
      weight: '17g',
      category: 'minuman',
      qty: 20,
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
      date: `${date}`,
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
         {
            product: products[3],
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: products[4],
            qty: 1,
            note: 'Tidak ada catatan',
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'completed',
      totalPrice:
         products[1].price * 1 +
         products[2].price * 2 +
         products[3].price * 1 +
         products[4].price * 1,
      date: `${date}`,
      cash: 80000,
      charge: 9000,
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
            product: products[5],
            qty: 2,
            note: 'Tidak ada catatan',
         },
         {
            product: products[0],
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: products[6],
            qty: 1,
            note: 'Tidak ada catatan',
         },
      ],
      author: { name: 'Ramadhani', role: 'Super Admin' },
      status: 'preparing',
      totalPrice:
         products[4].price * 1 +
         products[5].price * 2 +
         products[0].price * 1 +
         products[6].price * 1,
      date: `${date}`,
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
      date: `${date}`,
   },
]

export const users = [
   {
      id: 1,
      photo: 'https://bit.ly/dan-abramov',
      name: 'Ramadhani',
      email: 'erdevlop@gmail.com',
      password: 'password',
      role: 'Super Admin',
   },
   {
      id: 2,
      photo: 'https://bit.ly/dan-abramov',
      name: 'Messi',
      email: 'messi@gmail.com',
      password: 'password',
      role: 'Admin',
   },
]
