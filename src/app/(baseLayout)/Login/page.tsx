// "use client";
// use client 사용해야 함
import LoginInput from "@/components/LoginInput/LoginInput"
import { useState, useRef } from "react";
import Image from 'next/image';
import style from "./Login.module.css";
import { fetchAccounts } from '@/api/fetchData/account'
// export default function으로 외부 출력해주어야 합니다
export default function loginPage() {
  console.log('fetch => ',)
  fetchAccounts().then(e => {
    console.log(e)
  })
  debugger
  return (
    <div className={style.container}>
      <div className={style["logo-layer"]}>
      {/* <img
        className={style["user-input"]}
        src="/CK_td02480001297.jpg"
        alt="Logo"
      /> */}
      {/* // 위 코드 대체하여 Next.js의 Image 컴포넌트 사용 */}
      {/* https://nextjs.org/docs/app/api-reference/components/image */}
      <div className={style["logo-img"]}>
      <Image
        src="/logoImg_temp.jpg"
        alt="Logo"
        // Next.js의 Image 컴포넌트는 자동으로 이미지를 최적화하는데,
        // 렌더링하는 동안 레이아웃 시각적 이상을 방지하기 위해
        // 이미지 크기를 미리 알고 지정해주어야 합니다.

        // 다음과 같이 이미지 폭과 높이를 지정해주어야 합니다.
        // width={100} // 이미지 폭
        // height={100} // 이미지 높이

        // 이미지 원래의 폭과 높이를 자동으로 유지하려면 다음과 같이 레이아웃 속성을 적용합니다.
        // 바깥에 둘러싼 부모의 div에 position:relative 속성을 걸어주면 됩니다
        fill={true} // 이미지 레이아웃 설정
      />
      </div>
      </div>
      <div className={style["input-layer"]}>
      <LoginInput></LoginInput>
      </div>
    </div>
  );
}