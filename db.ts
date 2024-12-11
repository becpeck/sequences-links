import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Test database connection
    try {
        await prisma.$connect()
        console.log('Database connection successful')
        
        // You can add any seed data here if needed
        
    } catch (error) {
        console.error('Database connection failed:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

export { prisma }

// Run if this file is executed directly
if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error)
            process.exit(1)
        })
}