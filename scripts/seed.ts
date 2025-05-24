import dotenv from 'dotenv'
import connect from '../pages/api/connect'
import bcrypt from 'bcryptjs'
import User from '../domain/user'

dotenv.config()

async function seed() {
  await connect()
  const existing = await User.findOne({ email: 'kalysgrain@gmail.com' })
  if (existing) {
    console.log('User already exists')
    process.exit(0)
  }
  const hashed = await bcrypt.hash('Kaly@20grain@@', 10)
  await new User({
    firstName: 'Chidimma',
    lastName: 'Imah',
    email: 'kalysgrain@gmail.com',
    password: hashed
  }).save()
  console.log('Seeded default user')
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
