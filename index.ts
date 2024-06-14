import {PrismaClient} from '@prisma/client'
import { link } from 'fs'

const prisma = new PrismaClient()
const data = require('./schema.prisma')

/*
const express = require('express')
const api =  express()

const HOST = 'localhost'
const PORT = 8888

api.listen(PORT, () => { console.log(data) })
*/

//Metodo para criar um novo usuario
async function main() {
    await prisma.user.create({
        data: {
          name: 'Roberto',
          email: 'roebejf@gmail.com',
          posts: {
            create: {
              filme: 'Dragon Ball Evolution',
              nota: -10,
              resenha: 'Simplesmente o pior filme que há!',
            },
          },
        },
      })
      

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(allUsers, { depth: null })
}


//Metodo para atualizar um post
async function mainup() {
    await prisma.user.update({
        where: {
          email: 'luca@gmail.com',
        },
        data: {
          posts: {
            updateMany: {
                where: {
                    filme: 'Matrix',
                },
                data: {
                    nota: 8,
                    resenha: 'Excelente filme!',
                },
                },
          },
        },
      })
      

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(allUsers, { depth: null })
}
  //


mainup()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })