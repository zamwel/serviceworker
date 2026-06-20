import { PrismaClient } from '@prisma/client'

// Supabase routes POSTGRES_PRISMA_URL through PgBouncer (port 6543, transaction
// mode). Prisma uses prepared statements by default, which PgBouncer drops,
// causing "prepared statement s0 does not exist". Appending pgbouncer=true
// disables prepared statements on the Prisma side without needing to touch env vars.
function buildUrl(): string {
  const raw = process.env.POSTGRES_PRISMA_URL ?? ''
  if (!raw || raw.includes('pgbouncer=true')) return raw
  return raw + (raw.includes('?') ? '&' : '?') + 'pgbouncer=true'
}

const prismaClientSingleton = () =>
  new PrismaClient({ datasources: { db: { url: buildUrl() } } })

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma