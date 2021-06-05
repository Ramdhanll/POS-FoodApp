import express from 'express'
import {
   login,
   register,
   seed,
   userDetail,
} from '../controllers/userController.js'
import { body } from 'express-validator'
import User from '../models/userModel.js'
import isAuth from '../middlewares/isAuth.js'
const userRouter = express.Router()

userRouter.get('/seed', seed)
userRouter.get('/:id', isAuth, userDetail)

userRouter.post(
   '/login',
   body('email').notEmpty().withMessage('the email field is required!'),
   body('password').notEmpty().withMessage('the password field is required!'),
   login
)

userRouter.post(
   '/register',
   body('name').notEmpty().withMessage('the name field is required!'),
   body('email').notEmpty().withMessage('the email field is required!'),
   body('email').isEmail().withMessage('not an email!'),
   body('email').custom((value) => {
      return User.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject('E-mail already in use')
      })
   }),
   body('password').notEmpty().withMessage('the password field is required!'),
   body('photo').notEmpty().withMessage('the photo field is required!'),
   register
)

export default userRouter
