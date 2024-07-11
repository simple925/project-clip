import { ManageAuth } from "@/components/ManageAuth/ManageAuth";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insert(){
  const createMany = await prisma.accounts.createMany({
    data: [
      {id: 'abcdefg123abefeddddd', username: 'newspring56', password: 'hello11'},
      {id: 'abcdefg123abefe12345', username: 'newspring77', password: 'hello22'},
    ],
    skipDuplicates: true,
  })
  console.log("createMany : ", createMany);
}

async function select(){
  const acnts = await prisma.accounts.findMany();
  console.log("acnts : ", acnts);
}

async function update(){
  const updateData = await prisma.accounts.update({
    where: {
      username: 'newspring56',
    },
    data: {
      comment: 'Hello Prisma!'
    },
  })
}

async function deleteData(){
  const delData = await prisma.accounts.delete({
    where : {
      username: 'newspring77',
    },
  })
}

export default function Auth(){
  // insert()
  // update()
  // deleteData()
  // select()
  return (
    <>
    <ManageAuth />
    </>
  )
}