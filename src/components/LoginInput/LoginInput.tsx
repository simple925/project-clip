"use client";
// use client 사용해야 함

import { useState, useRef } from "react";
import {
  PasswordInput,
  Button,
  Autocomplete,
  Loader,
  ButtonProps,
} from "@mantine/core";
import style from "./LoginInput.module.css";


export function LoginButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}

// export default function으로 외부 출력해주어야 합니다
export default function LoginInput() {
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
  );
}