"use client";
// use client 사용해야 함
import TabButtons from "@/components/TabButtons/TabButtons";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { DatePickerInput as MantineDatePickerInput } from "@mantine/dates";
import { DatePicker as MantineDatePicker } from "@mantine/dates";
import { useState, useRef } from "react";
import Image from "next/image";
import {
  Paper,
  Input,
  Textarea,
  ButtonProps,
  Button,
  Tabs,
  rem,
} from "@mantine/core";
import style from "./Write.module.css";

/**
 * @description 글쓰기 페이지
 *
 * 공지, 휴가, 지출 3개의 type으로 탭 클릭시 해당 section 출력
 *
 * 공지 - textarea
 * 휴가 - input을 통해 휴가계에 필요한 내용을 submit 후, 이후 표 형태로 출력
 * 지출 - input을 통해 지출결의서에 필요한 내용을 submit 후, viewer 등을 활용하여 파일 저장 후 출력
 *
 */

export function ButtonItem(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}

function DatesPicker() {
  const [value, setValue] = useState<Date[]>([]);
  return (
    <MantineDatePicker type="multiple" value={value} onChange={setValue} />
  );
}
// export default function으로 외부 출력해주어야 합니다
export default function WritePage() {
  // 유저 정보 더미 데이터
  const user = {
    userUUID: 1234,
    userName: "백지연",
    userPhoneNm: "01064861568",
    userGrade: "사원",
  };

  // 글쓰기 탭 정보
  const writeTabBtnItems = [
    { label: "공지", value: "공지" },
    { label: "휴가계", value: "휴가계" },
    { label: "지출결의서", value: "지출결의서" },
  ];

  // 상태 변수 선언
  const [applicationDate, setApplicationDate] = useState(""); // 신청일
  const [vacationTitle, setVacationTitle] = useState(""); // 휴가계 제목

  // 신청자 입력란 값이 변경될 때 호출되는 함수
  const handleApplicantChange = (event) => {
    setApplicant(event.target.value);
  };

  // 신청일 입력란 값이 변경될 때 호출되는 함수
  const handleApplicationDateChange = (event) => {
    setApplicationDate(event.target.value);
  };

  // 휴가계 제목을 자동으로 업데이트하는 함수
  const updateVacationTitle = () => {
    setVacationTitle(
      `[${user.userName} ${user.userGrade}] 휴가 신청 (${applicationDate})`
    );
  };

  return (
    <div className={style.container}>
      {/* TabButtons에 props로 label을 보내고, 어떤 탭인지 value를 받아와 해당 내용으로 뿌림... */}
      <TabButtons tabItems={writeTabBtnItems} />
      <Paper className={style["input_paper"]} shadow="sm" withBorder p="xs">
        <div className={style["input_form"]}>
          {/* ############# 공지 사항 입력 폼 */}
          {/* <Input.Wrapper
            label="공지 제목"
            withAsterisk
            error="작성하지 않았을 경우 에러 문구 발생"
          >
            <Input placeholder="제목을 입력하세요." />
          </Input.Wrapper>
          <Textarea
            label="공지 내용"
            withAsterisk
            placeholder="공지사항 내용을 입력하세요."
            autosize
            minRows={20}
          /> */}
          {/* ############# 휴가계 입력 폼 */}
          <Input.Wrapper label="휴가계 제목" withAsterisk error="자동 완성됨">
            <Input
              readOnly
              value={vacationTitle}
              placeholder="[백지연 사원] 휴가 신청 (2024-03-30)"
            />
          </Input.Wrapper>
          <Input.Wrapper label="신청자" withAsterisk>
            <Input variant="filled" readOnly value={user.userName} />
          </Input.Wrapper>
          <Input.Wrapper
            label="신청일"
            withAsterisk
            error="자동 완성됨, 수정 가능"
          >
            <Input
              value={applicationDate}
              onChange={handleApplicationDateChange}
              placeholder="YYYY-MM-DD 형식으로 입력하세요."
              onBlur={updateVacationTitle} // 입력란에서 포커스가 떠날 때 휴가계 제목 업데이트
            />
          </Input.Wrapper>
          <Input.Wrapper label="휴가 사용일" withAsterisk error="">
            <DatesPicker />
          </Input.Wrapper>
          <Input.Wrapper label="휴가 사유" withAsterisk error="자동 완성됨">
            <Input placeholder="제목을 입력하세요." />
          </Input.Wrapper>
          <Input.Wrapper
            label="소진 휴가일수 / 연차일수"
            withAsterisk
            error="자동 완성됨"
          >
            <Input placeholder="제목을 입력하세요." />
          </Input.Wrapper>
          {/* ############# 지출결의서 입력 폼 */}
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
