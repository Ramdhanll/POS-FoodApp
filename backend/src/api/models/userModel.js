import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      photo: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: [true, 'hahahah'],
      },
      password: {
         type: String,
         required: true,
      },
      isAdmin: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   }
)

const User = mongoose.model('User', userSchema)

export default User
/**
 * id: 1,
      photo: 'https://bit.ly/dan-abramov',
      name: 'Ramadhani',
      email: 'erdevlop@gmail.com',
      password: 'password',
      role: 'Super Admin',
 */
