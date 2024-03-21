"use client";
import type { Metadata } from "next"
import { Suspense, useEffect, useState } from "react"
import getData from "../../../../lib/commonApi"

type Props = {
    promise: Promise<Users>
}

export default function UserPage( {params: { userId} }: Params) {

    const [ member, setMember ] = useState(null);

    useEffect(() => {
         getData(`http://localhost:9999/Users?id=${userId}`)
        .then(member1 => setMember(member1))
        .catch(error => console.error('fetch commonApi에서 오류 발생:', error))
    }, [])
    
    // console.log('*** 데이터 확인 : ', member)
    const memberName = member[0].name

    return (
   <>
    <h2>환영합니다, {memberName} 님!</h2>
    <br/>
    <Suspense fallback={<h2>Loading...</h2>}>
        {/* <UserInput promise={member}></UserInput> */}
    </Suspense>
   </>
  )
}