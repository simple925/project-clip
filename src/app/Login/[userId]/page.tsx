import type { Metadata } from "next"
import { Suspense } from "react"
import getData from "../../../../lib/commonApi"

type Props = {
    promise: Promise<Users>
}

export async function generateMetadata( {params:{userId}}: Params): Promise<Metadata> {
    const userData: Promise<Users> = getData(`http://localhost:9999/Users?id=${userId}`)
    const user: Users = await userData
    // console.log('데이터 확인 : ', user)
    // 메타데이터 : 예약어

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

export async function UserInput({promise}:Props) {
    const userData = await promise

    const content = (
            <article key={userData.id}>
                <h2>{userData.username}</h2>
                <p>{userData.email}</p>
                <br />
            </article>
    )

    return content
}

export default async function UserPage( {params: { userId} }: Params) {
    const userData: Promise<Users> = getData(`http://localhost:9999/Users?id=${userId}`)
    const user = await userData
    console.log('Login/[userId] 의 데이터 확인 :', user)

   return (
   <>
    <h2>{user.name}</h2>
    <br/>
    <Suspense fallback={<h2>Loading...</h2>}>
        <UserInput promise={userData}></UserInput>
    </Suspense>
   </>
  )
}