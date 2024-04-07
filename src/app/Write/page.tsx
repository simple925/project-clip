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
  NumberInput,
  PillsInput,
  Pill,
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
  userDepartment: "서비스&기획부",
  userGrade: "사원",
  totalVacation: 15,
  usedVacation: 3,
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
  // ################ Define Variables
  // 휴가계 변수 선언
  const [vacationTitle, setVacationTitle] = useState(""); // 휴가계 제목
  const [datesValue, setDatesValue] = useState<Date[]>([]); // 신청하는 날짜(배열 가능)
  const [formattedApplicatedDates, setFormattedApplicatedDates] = useState<
    string[]
  >([]); // 변환된 날짜들을 저장할 배열
  const [writtenDate, setWrittenDate] = useState<Date | null>(new Date()); // 휴가계 작성일
  const formatttedDate = dayjs(writtenDate).format("YYYY-MM-DD");
  const [content, setContent] = useState(""); // 휴가 사유
  const [lastUsedVacation, setLastUsedVacation] = useState(user.usedVacation); // 소진 휴가일수

  // 현재 선택된 datesValue의 길이에 따라 사용된 휴가일수를 계산
  const calculateUsedVacation = () => {
    const selectedDatesLength = datesValue.length;
    // 선택된 날짜의 수를 사용된 휴가일수로 설정 (최대 5일)
    const usedVacationDays = Math.min(selectedDatesLength, 5);
    return usedVacationDays;
  };

  // 선택된 날짜를 string으로 변환하여 배열에 추가하는 함수
  const updateFormattedApplicatedDates = () => {
    const formattedDates = datesValue.map((date) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    // 날짜를 오름차순으로 정렬
    formattedDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    setFormattedApplicatedDates(formattedDates);
  };

  // 휴가계 제목을 자동으로 업데이트하는 함수
  const updateVacationTitle = () => {
    setVacationTitle(
      `[${user.userName} ${user.userGrade}] 휴가 신청 (${formatttedDate})`
    );
  };

  // 신청일이 변경될 때마다 휴가게 제목 자동 변경
  useEffect(() => {
    updateVacationTitle();
  }, [writtenDate]);

  // datesValue가 변경될 때마다 formattedApplicatedDates를 업데이트
  // 해당 내용 휴가 사용일에 pill으로 출력됩니다
  useEffect(() => {
    // 1. input 화면 출력을 위한 업데이트. string[]으로 출력
    updateFormattedApplicatedDates();
    // 2. 현재 선택된 날짜로 인한 휴가 소진일수 계산
    const usedVacationDays = calculateUsedVacation();
    setLastUsedVacation(usedVacationDays);
  }, [datesValue]);

  // ################ Define Variables
  // 지출결의서 변수 선언
  // const [disbursementTitle, setDisbursementTitle] = useState(""); // 지출결의서 제목
  // const [disbursementWrittenDate, setDisbursementWrittenDate] =
  //   useState<Date | null>(new Date()); // 지급 요청일
  // const formatttedDisbursementDate = dayjs(disbursementWrittenDate).format(
  //   "YYYY-MM-DD"
  // );
  // const [content, setContent] = useState(""); // 일금
  // const [lastUsedVacation, setLastUsedVacation] = useState(user.usedVacation); // 지급 방법
  // const [disbursementContent, setDisbursementContent] = useState("");  // 지출 세부 내역(무엇을 구매했는지?)
  // const [disbursementBank, setDisbursementBank] = useState(""); // 은행 이체 명세(은행명, 수취인, 계좌번호)
  // const [] // 작성일자
  // const [] // 공급가액
  // const [] // 부가세액
  // const [] // 합계
  // const // 증빙 

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
          <Input.Wrapper label="휴가계 제목" withAsterisk>
            <Input readOnly value={vacationTitle} placeholder={vacationTitle} />
          </Input.Wrapper>
          <Input.Wrapper label="신청자" withAsterisk>
            <Input variant="filled" readOnly value={user.userName} />
          </Input.Wrapper>
          <Input.Wrapper label="신청일" withAsterisk>
            <MantineDatePickerInput
              locale="ko"
              value={writtenDate}
              onChange={setWrittenDate}
            />
            {/* 입력란에서 포커스가 떠날 때 휴가계 제목 업데이트 */}
          </Input.Wrapper>
          <Input.Wrapper
            label="휴가 사용일"
            withAsterisk
            error={
              formattedApplicatedDates.length === 0 &&
              "휴가 사용일을 선택해주세요."
            }
          >
            <MantineDatePicker
              size="md"
              locale="ko"
              type="multiple"
              value={datesValue}
              onChange={setDatesValue}
            />
            {/* 휴가 사용일 선택시 해당 내용이 pillInput으로 자동으로 추가됨 */}
            {/* datepicker 날짜 5개로 제한하는 속성있는지 확인 필요 */}
            <PillsInput>
              <Pill.Group>
                {formattedApplicatedDates.map((date, index) => (
                  <Pill key={index}>{date}</Pill>
                ))}
              </Pill.Group>
            </PillsInput>
          </Input.Wrapper>
          <Input.Wrapper
            label="휴가 사유"
            withAsterisk
            error={content.trim() == "" && "휴가 사유를 입력해주세요."}
          >
            <Input
              value={content}
              onChange={(event) => setContent(event.currentTarget.value)}
              placeholder="휴가 사유를 입력하세요."
            />
          </Input.Wrapper>
          <Input.Wrapper label="소진 휴가일수 / 연차일수" withAsterisk>
            <NumberInput
              className={style["input_number_box"]}
              value={user.usedVacation + lastUsedVacation}
            />
            / {user.totalVacation}
          </Input.Wrapper>
          {/* ############# 지출결의서 입력 폼 */}
          {/* <Input.Wrapper label="지출결의서 제목" withAsterisk>
            <Input readOnly value={vacationTitle} placeholder={vacationTitle} />
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
