import jwt from 'jsonwebtoken'

const isAuth = (req, res, next) => {
   const { authorization } = req.headers

   if (!authorization)
      return res.status(401).json({ message: 'you must be logged in' })

   const token = authorization.replace('Bearer ', '')
   jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decode) => {
      if (err) return res.status(401).json({ message: 'Invalid token', err })
      req.user = decode
      next()
   })
}

export default isAuth
