"use client";
// use client 사용해야 함

import { useState, useRef } from "react";
import Image from 'next/image';
import {
  PasswordInput,
  Button,
  Autocomplete,
  Loader,
  ButtonProps,
} from "@mantine/core";
import style from "./Login.module.css";


export function LoginButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}

// export default function으로 외부 출력해주어야 합니다
export default function loginPage() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  
  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          // ["gmail.com", "outlook.com", "yahoo.com"].map(
          // 이메일 형식 자동으로 작성, 현재 cluedin.co.kr만 옵션값 세팅
            ["cluedin.co.kr"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };
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
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        label="Email"
        placeholder="이메일 주소를 입력하세요."
      />
      <PasswordInput
        placeholder="비밀번호를 입력하세요."
        id="user-password"
        label="Password"
      />
      <LoginButton className={style["login-btn"]}>로그인</LoginButton>
      </div>
    </div>
  );
}