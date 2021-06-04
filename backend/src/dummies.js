import bcrypt from 'bcrypt'
import User from './api/models/userModel.js'

let salt = bcrypt.genSaltSync(8)

export const usersDummy = [
   {
      name: 'Ramadhani',
      photo: 'https://bit.ly/ryan-florence',
      email: 'erdevlop@gmail.com',
      password: bcrypt.hashSync('password', salt),
      isAdmin: true,
   },
   {
      name: 'user test 1',
      photo: 'https://bit.ly/ryan-florence',
      email: 'usertest1@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      name: 'user test 2',
      photo: 'https://bit.ly/ryan-florence',
      email: 'usertest2@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
]

export const productsDummy = [
   {
      name: 'Kentang Goreng',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656055/FOOD/fast-food-1839052_ubmdfq.jpg',
      weight: '15g',
      category: ['makanan', 'cemilan'],
      qty: 20,
      price: 10_000,
   },
   {
      name: 'Donat',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656056/FOOD/berliner-17811_1920_otov6j.jpg',
      weight: '15g',
      category: ['makanan', 'cemilan'],
      qty: 18,
      price: 10_000,
   },
   {
      name: 'Steak',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656054/FOOD/food-3676796_1920_wh435z.jpg',
      weight: '15g',
      category: ['makanan'],
      qty: 18,
      price: 22_000,
   },
   {
      name: 'Jus Lemon',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656054/FOOD/glass-2605915_1920_lbnb2s.jpg',
      weight: '15g',
      category: ['minuman', 'dingin'],
      qty: 10,
      price: 10_000,
   },
   {
      name: 'Es Teh',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656053/FOOD/tea-4857512_1920_szuwnd.jpg',
      weight: '15g',
      category: ['minuman', 'dingin'],
      qty: 30,
      price: 5_000,
   },
   {
      name: 'Kentang Kari',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656053/FOOD/potatoes-6292311_1920_mlobgh.jpg',
      weight: '15g',
      category: ['makanan', 'cemilan'],
      qty: 15,
      price: 9_000,
   },
   {
      name: 'Cappucino',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656053/FOOD/cappuccino-756490_1920_r5e7jp.jpg',
      weight: '15g',
      category: ['minuman', 'panas'],
      qty: 12,
      price: 10_000,
   },
   {
      name: 'Hamburger',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656052/FOOD/hamburger-1238246_1920_xct7hu.jpg',
      weight: '15g',
      category: ['makanan', 'cemilan'],
      qty: 22,
      price: 18_000,
   },
   {
      name: 'Nasi Goreng',
      description:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut dictum lacus.',
      photo: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1622656052/FOOD/fried-rice-263882_1920_qbeuuj.jpg',
      weight: '15g',
      category: ['makanan', 'nasi'],
      qty: 22,
      price: 13_000,
   },
]

export const ordersDummy = [
   {
      items: [],
      author: '60b799ebe556500d78fdf15e',
      status: 'pending',
   },
   {
      id: 2,
      items: [
         {
            product: '60b8bce834d5e01894206248',
            qty: 1,
            note: 'Level 10',
         },
      ],
      author: '60b799ebe556500d78fdf15e',
      status: 'completed',
      totalPrice: 10000,
      cash: 12000,
      charge: 2000,
   },
   {
      id: 3,
      items: [
         {
            product: '60b8bce834d5e01894206248',
            qty: 2,
            note: 'Tidak ada catatan',
         },
         {
            product: '60b8bce834d5e01894206249',
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: '60b8bce834d5e0189420624a',
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: '60b8bce834d5e0189420624b',
            qty: 1,
            note: 'Tidak ada catatan',
         },
      ],
      author: '60b799ebe556500d78fdf15e',
      status: 'process',
      totalPrice: 10000 * 2 + 10000 * 1 + 22000 * 1 + 10000 * 1,
   },
   {
      id: 4,
      items: [
         {
            product: '60b8bce834d5e0189420624b',
            qty: 1,
            note: 'Tidak ada catatan',
         },
         {
            product: '60b8bce834d5e0189420624a',
            qty: 1,
            note: 'Tidak ada catatan',
         },
      ],
      author: '60b799ebe556500d78fdf15e',
      status: 'delivered',
      totalPrice: 10000 * 1 + 22000 * 2,
   },
]
