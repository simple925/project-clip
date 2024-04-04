"use client";
// use client 사용해야 함
import TabButtons from "@/components/TabButtons/TabButtons";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { DatePickerInput as MantineDatePickerInput } from "@mantine/dates";
import { DatePicker as MantineDatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Paper,
  Input,
  Textarea,
  ButtonProps,
  Button,
  Tabs,
  rem,
  NumberInput,
} from "@mantine/core";
import style from "./Write.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
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

// 버튼 디자인
export function ButtonItem(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}

// 유저 정보 더미 데이터
const user = {
  userUUID: 1234,
  userName: "백지연",
  userPhoneNm: "01064861568",
  userGrade: "사원",
  totalVacation: 15,
  usedVacation: 3
};

// 글쓰기 탭 정보
const writeTabBtnItems = [
  { label: "공지", value: "공지" },
  { label: "휴가계", value: "휴가계" },
  { label: "지출결의서", value: "지출결의서" },
];


/** 글쓰기 페이지 출력부  */
// export default function으로 외부 출력
export default function WritePage() {

  // #### 휴가계 변수 선언
  const [vacationTitle, setVacationTitle] = useState(""); // 휴가계 제목
  const [datesValue, setDatesValue] = useState<Date[]>([]); // 신청하는 날짜(배열 가능)
  const [writtenDate, setWrittenDate] = useState<Date | null>(new Date()); // 휴가계 작성일
  const formatttedDate = dayjs(writtenDate).format("YYYY-MM-DD");
  const [content, setContent] = useState(""); // 휴가 사유
  const [lastUsedVacation, setLastUsedVacation] = useState(user.usedVacation); // 소진 휴가일수
  // 휴가계 제목을 자동으로 업데이트하는 함수
  const updateVacationTitle = () => {
    setVacationTitle(
      `[${user.userName} ${user.userGrade}] 휴가 신청 (${formatttedDate})`
    );
  };
  
  useEffect(() => {
    updateVacationTitle();
  }, [writtenDate]);

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
            <Input readOnly value={vacationTitle} placeholder={vacationTitle} />
          </Input.Wrapper>
          <Input.Wrapper label="신청자" withAsterisk>
            <Input variant="filled" readOnly value={user.userName} />
          </Input.Wrapper>
          <Input.Wrapper
            label="신청일"
            withAsterisk
            error="자동 완성됨, 수정 가능"
          >
            <MantineDatePickerInput
              locale="ko"
              value={writtenDate}
              onChange={setWrittenDate}
            />
            {/* 입력란에서 포커스가 떠날 때 휴가계 제목 업데이트 */}
          </Input.Wrapper>
          <Input.Wrapper label="휴가 사용일" withAsterisk error="">
            <MantineDatePicker
              size="md"
              locale="ko"
              type="multiple"
              value={datesValue}
              onChange={setDatesValue}
            />
          </Input.Wrapper>
          <Input.Wrapper label="휴가 사유" withAsterisk error="자동 완성됨">
            <Input placeholder="제목을 입력하세요." />
          </Input.Wrapper>
          <Input.Wrapper
            label="소진 휴가일수 / 연차일수"
            withAsterisk
            error="자동 완성됨"
          >
            <NumberInput
              className={style["input_number_box"]}
              value={user.usedVacation}
            />
            / {user.totalVacation}
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
