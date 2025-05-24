import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../connect'
import User from '../../../domain/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  await connect()
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  res.status(200).json({ token })
}
