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
import { useRouter } from "next/navigation";
import { trpc } from '@/server/client'; // trpc client import
import { showNotification } from '@mantine/notifications'; // To show notifications for success/error

import { useAppDispatch } from "@/store"; // 스토어 저장을 위한 import
import { setAccountData } from "@/store/accountStore"; // 계정 uuid를 스토어에 저장하기 위한 import


export function LoginButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}

// export default function으로 외부 출력해주어야 합니다
export default function LoginInput() {
  const timeoutRef = useRef<number>(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch(); // Redux dispatch 사용

  const loginMutation = trpc.accounts.login.useMutation({
    onSuccess: (data: any) => {
      showNotification({
        title: '로그인 성공',
        message: '로그인에 성공했습니다!',
        color: 'green',
      });

      // 로그인 성공 시 UUID를 Redux 스토어에 저장
      dispatch(setAccountData(data.id)); // API로부터 반환된 id 사용

      router.push('/Calendar');
    },
    onError: (error: Error) => {
      showNotification({
        title: '로그인 실패',
        message: error.message,
        color: 'red',
      });
    },
  });

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setEmail(val);
    setData([]);

    // if (val.trim().length === 0 || val.includes("@")) {
    //   setLoading(false);
    // } else {
    //   setLoading(true);
    //   timeoutRef.current = window.setTimeout(() => {
    //     setLoading(false);
    //     setData(
    //       // ["gmail.com", "outlook.com", "yahoo.com"].map(
    //       // 이메일 형식 자동으로 작성, 현재 cluedin.co.kr만 옵션값 세팅
    //         ["cluedin.co.kr"].map(
    //         (provider) => `${val}@${provider}`
    //       )
    //     );
    //   }, 1000);
    // }
  };

  const handleLogin = () => {
    loginMutation.mutate({
      username: email,
      password: password,
    });
    console.log(email, password);
  };

  return (
    // <div className={style["input-layer"]}>
    <>
      <Autocomplete
        value={email}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        label="Email"
        placeholder="이메일 주소를 입력하세요."
      />
      <PasswordInput
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        label="Password"
      />
      <LoginButton className={style["login-btn"]} onClick={handleLogin}>로그인</LoginButton>
      {/* </div> */}
    </>
  );
}