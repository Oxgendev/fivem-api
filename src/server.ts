import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/whitelist', async (_req, res) => {
  const items = await prisma.whitelistEntry.findMany({ take: 50 })
  res.json(items)
})

app.post('/whitelist', async (req, res) => {
  const { playerId, reason } = req.body
  const created = await prisma.whitelistEntry.create({ data: { playerId, reason } })
  res.status(201).json(created)
})

app.listen(process.env.PORT || 3000)