"use client";
// use client 사용해야 함
import TabButtons from "@/components/TabButtons/TabButtons"
import { useState, useRef } from "react";
import Image from 'next/image';
import { Paper, Input, Textarea, ButtonProps, Button, Tabs, rem } from '@mantine/core';
import style from "./Write.module.css";

/**
 * @description 글쓰기 페이지
 * 
 * 공지, 휴가, 지출 3개의 type으로 탭 클릭시 해당 section 출력
 * 
 * 공지 - textarea
 * 휴가 - input을 통해 휴가계에 필요한 내용을 submit 후, 이후 표 형태로 출력
 * 지출 - input을 통해 지출결의서에 필요한 내용을 submit 후, 한글 viewer 등을 활용하여 파일 저장 후 출력
 *  
 * 탭 부분 컴포넌트화 시킬것
 */

export function ButtonItem(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}

// export default function으로 외부 출력해주어야 합니다
export default function WritePage() {

  return (
    <div className={style.container}>
      {/* TabButtons에 props로 label을 보내고, emit으로 어떤 탭인지 id를 받아와 해당 내용으로 뿌림... */}
      <TabButtons />
      <Paper className={style["input_paper"]} shadow="sm" withBorder p="xs">
        <div className={style["input_form"]}>
          {/* ############# 공지 사항 입력 폼 */}
          <Input.Wrapper label="공지 제목" withAsterisk error="작성하지 않았을 경우 에러 문구 발생">
            <Input placeholder="제목을 입력하세요." />
          </Input.Wrapper>
          <Textarea
            label="공지 내용"
            withAsterisk
            placeholder="공지사항 내용을 입력하세요."
            autosize
            minRows={20}
          />
          {/* ############# 휴가계 입력 폼 */}
          {/* <Input.Wrapper label="휴가계 제목" withAsterisk error="작성하지 않았을 경우 에러 문구 발생">
            <Input placeholder="제목을 입력하세요." />
          </Input.Wrapper> */}
          </div>
      </Paper>
      {/* 버튼 2개를 기능과 label을 받아 뿌려주게끔 추후 수정 - */}
      <div className={style["btn_area"]}>
        <ButtonItem className={style["cancel"]}>취소</ButtonItem>
        <ButtonItem className={style["confirm"]}>확인</ButtonItem>
      </div>
    </div>
  );
}