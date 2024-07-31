"use client";
// use client 사용해야 함
// 프리즈마로 fetchData 사용했을 땐 use client를 주석처리 했습니다.
import LoginInput from "@/components/LoginInput/LoginInput"
import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import style from "./Login.module.css";
//import { fetchAccounts } from '@/api/fetchData/account'
import { trpc } from '@/server/client';


// export default function으로 외부 출력해주어야 합니다
export default function LoginPage() {
  const [altText, setAltText] = useState('symbol mark'); // Initial alt value

  // const helloWorld = trpc.user.hello.useQuery({});
  
  const getUser = trpc.user.list.useQuery({ limit: 1 });
  console.log(getUser.data)

  // const utils = trpc.user.list.useQuery
  //const userName = trpc.user.list.useQuery(['getUserName', 'hello']);
  // const userData = trpc.user.list.useQuery({ limit: 1 });
  // await는 순차적으로 받고, then은 비동기로 받는다. 
  // then은 await보다 먼저 실행된다.
  
  // const prisma = new PrismaClient();
  // const result = 
  // async function selectApi(tableName: string){
  
  //   (prisma as any)[`${tableName}`].findMany()
  //     .then(
  //       (result:any) => {
  //         console.log(result)
  //       }
  //     )
  //     .catch(
  //       (e:any) => {
  //         console.error(e)
  //       }
  //     )
  // }
  // console.log(result)
  // useEffect(() => {
  //   async function fetchData(){
  //     try {
  //       const res = await fetch('@/server/api/index?tableName=Users')
  //       const data = await res.json()
  //       console.log(data);
  //       setData(data);
  //     } catch (error) {
  //       console.error('에러 발생', error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className={style.container}>
      <div className={style["logo-layer"]}>
      {/* // 위 코드 대체하여 Next.js의 Image 컴포넌트 사용 */}
      {/* https://nextjs.org/docs/app/api-reference/components/image */}
      <div className={style["logo-img"]}>
      <Image
        src="/logoImg_temp.jpg"
        alt={altText}
        // Next.js의 Image 컴포넌트는 자동으로 이미지를 최적화하는데,
        // 렌더링하는 동안 레이아웃 시각적 이상을 방지하기 위해
        // 이미지 크기를 미리 알고 지정해주어야 합니다.

        // 다음과 같이 이미지 폭과 높이를 지정해주어야 합니다.
        // width={100} // 이미지 폭
        // height={100} // 이미지 높이

        // 이미지 원래의 폭과 높이를 자동으로 유지하려면 다음과 같이 레이아웃 속성을 적용합니다.
        // 바깥에 둘러싼 부모의 div에 position:relative 속성을 걸어주면 됩니다
        fill // 이미지 레이아웃 설정
        sizes="(max-width: 768px) 100vw, 50vw"
        priority // 우선적으로 렌더링되게끔 설정
      />
      </div>
      </div>
      <div className={style["input-layer"]}>
      <LoginInput></LoginInput>
      </div>
    </div>
  );
}