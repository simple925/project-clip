"use client"; // use client 사용해야 함

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { DatePickerInput as MantineDatePickerInput } from "@mantine/dates";
import { DatePicker as MantineDatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import { Paper, Input, Textarea, ButtonProps, Button, NumberInput, PillsInput, Pill, Tabs } from "@mantine/core";
import style from "./Write.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { trpc } from '@/server/client'; // trpc 클라이언트 임포트

/**
 * @description 글쓰기 페이지
 * 공지, 휴가, 지출 3개의 type으로 탭 클릭시 해당 section 출력
 *
 * 공지 - textarea
 * 휴가 - input을 통해 휴가계에 필요한 내용을 submit 후, 이후 표 형태로 출력
 * 지출 - input을 통해 지출결의서에 필요한 내용을 submit 후, viewer 등을 활용하여 파일 저장 후 출력
 */

/** 유저 정보 더미 데이터 */
const member = {
  id: "12341234", // 회원 고유 ID (Char(32))
  account_id: "dianapaik", // 계정 고유 ID (Char(32))
  created_at: new Date(), // 생성일시 (DateTime)
  updated_at: new Date(), // 업데이트일시 (DateTime)
  name: "백지연", // 이름 (VarChar(255))
  position: "사원", // 직급 (VarChar(100))
  hire_date: new Date("2020-01-01"), // 입사일 (Date)
  birth_date: new Date("1990-05-15"), // 생년월일 (Date)
  contact_number: "01064861568", // 연락처 (VarChar(20))
  image: null, //
  email: "baekjy@example.com", // 이메일 (VarChar(255))
  emergency_contact_number: "01012345678", // 비상 연락처 (VarChar(20))
  address: "서울시 강남구", // 주소 (Text)
  notes: "기획부", // 비고 (Text)
  // ** 해당 내용 db내 추가 필요
  usedVacation: 4, // 사용된 휴가일수 (Int)
  totalVacation: 15, // 연차일수 (Int)
};

/** 버튼 디자인 */
export function ButtonItem(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}


/** 글쓰기 탭 정보 */
const writeTabBtnItems = [
  { label: "공지", value: "공지" },
  { label: "휴가계", value: "휴가계" },
  { label: "지출결의서", value: "지출결의서" },
];

// 공지사항 작성 컴포넌트
function NoticeWrite({ title, setTitle, content, setContent }) {
  return (
    <>
      <Input.Wrapper
        label="공지 제목"
        withAsterisk
        error={!title && "제목을 입력하세요."}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="제목을 입력하세요."
        />
      </Input.Wrapper>
      <Textarea
        label="공지 내용"
        withAsterisk
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        placeholder="공지사항 내용을 입력하세요."
        autosize
        minRows={20}
      />
    </>
  );
}


// 휴가계 작성 컴포넌트
function VacationWrite({
  vacationTitle,
  setVacationTitle,
  datesValue,
  setDatesValue,
  formattedApplicatedDates,
  writtenDate,
  setWrittenDate,
  reasonVacation,
  setReasonVacation,
  lastUsedVacation,
}) {
  return (
    <>
      <Input.Wrapper label="휴가계 제목" withAsterisk>
        <Input readOnly value={vacationTitle} placeholder={vacationTitle} />
      </Input.Wrapper>
      <Input.Wrapper label="신청자" withAsterisk>
        <Input variant="filled" readOnly value={member.name} />
      </Input.Wrapper>
      <Input.Wrapper label="신청일" withAsterisk>
        <MantineDatePickerInput
          locale="ko"
          value={writtenDate}
          onChange={setWrittenDate}
        />
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
        error={reasonVacation.trim() === "" && "휴가 사유를 입력해주세요."}
      >
        <Input
          value={reasonVacation}
          onChange={(event) => setReasonVacation(event.currentTarget.value)}
          placeholder="휴가 사유를 입력하세요."
        />
      </Input.Wrapper>
      <Input.Wrapper label="소진 휴가일수 / 연차일수" withAsterisk>
        <NumberInput
          className={style["input_number_box"]}
          value={member.usedVacation + lastUsedVacation}
        />
        / {member.totalVacation}
      </Input.Wrapper>
    </>
  );
}

// 지출결의서 작성 컴포넌트
function DisbursementWrite({
  disbursementTitle,
  setDisbursementTitle,
  disbursementWrittenDate,
  setDisbursementWrittenDate,
  expense,
  setExpense,
  wayOfDisbursementContent,
  setWayOfDisbursementContent,
  disbursementContent,
  setDisbursementContent,
  disbursementBank,
  setDisbursementBank,
  dateOfWrittenDisbursement,
  setDateOfWrittenDisbursement,
  supplyValue,
  setSupplyValue,
  tax,
  setTax,
  totalDisbursement,
  setTotalDisbursement,
  evidence,
  setEvidence,
}) {
  return (
    <>
      <Input.Wrapper label="지출결의서 제목" withAsterisk>
        <Input
          value={disbursementTitle}
          onChange={(event) => setDisbursementTitle(event.currentTarget.value)}
        />
      </Input.Wrapper>
      <Input.Wrapper label="지급 요청일" withAsterisk>
        <MantineDatePickerInput
          locale="ko"
          value={disbursementWrittenDate}
          onChange={setDisbursementWrittenDate}
        />
      </Input.Wrapper>
      <Input.Wrapper label="일금" withAsterisk>
        <Input
          value={expense}
          onChange={(event) => setExpense(event.currentTarget.value)}
        />
      </Input.Wrapper>
      <Input.Wrapper label="지급 방법" withAsterisk>
        <Input
          value={wayOfDisbursementContent}
          onChange={(event) =>
            setWayOfDisbursementContent(event.currentTarget.value)
          }
        />
      </Input.Wrapper>
      <Input.Wrapper label="지출 세부 내역" withAsterisk>
        <Input
          value={disbursementContent}
          onChange={(event) =>
            setDisbursementContent(event.currentTarget.value)
          }
        />
      </Input.Wrapper>
      <Input.Wrapper label="은행 이체 명세" withAsterisk>
        <Input
          value={disbursementBank}
          onChange={(event) => setDisbursementBank(event.currentTarget.value)}
        />
      </Input.Wrapper>
      <Input.Wrapper label="작성일자" withAsterisk>
        <MantineDatePickerInput
          locale="ko"
          value={dateOfWrittenDisbursement}
          onChange={setDateOfWrittenDisbursement}
        />
      </Input.Wrapper>
      <Input.Wrapper label="공급가액" withAsterisk>
        <Input
          value={supplyValue}
          onChange={(event) => setSupplyValue(event.currentTarget.value)}
        />
      </Input.Wrapper>
      <Input.Wrapper label="부가세액" withAsterisk>
        <Input
          value={tax}
          onChange={(event) => setTax(event.currentTarget.value)}
        />
      </Input.Wrapper>
      <Input.Wrapper label="합계" withAsterisk>
        <Input
          value={totalDisbursement}
          onChange={(event) =>
            setTotalDisbursement(event.currentTarget.value)
          }
        />
      </Input.Wrapper>
      <Input.Wrapper label="증빙" withAsterisk>
        <Input
          value={evidence}
          onChange={(event) => setEvidence(event.currentTarget.value)}
        />
      </Input.Wrapper>
    </>
  );
}

// 유틸리티 함수들
const calculateUsedVacation = (datesValue) => {
  const selectedDatesLength = datesValue.length;
  return Math.min(selectedDatesLength, 5);
};

const updateFormattedApplicatedDates = (datesValue) => {
  const formattedDates = datesValue.map((date) =>
    dayjs(date).format("YYYY-MM-DD")
  );
  formattedDates.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  return formattedDates;
};

/** 글쓰기 페이지 출력부  */
// export default function으로 외부 출력

// 메인 컴포넌트
export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedWrite, setSelectedWrite] = useState(writeTabBtnItems[0].value);
  const [vacationTitle, setVacationTitle] = useState("");
  const [datesValue, setDatesValue] = useState<Date[]>([]);
  const [formattedApplicatedDates, setFormattedApplicatedDates] = useState<
    string[]
  >([]);
  const [writtenDate, setWrittenDate] = useState<Date | null>(new Date());
  const [reasonVacation, setReasonVacation] = useState("");
  const [lastUsedVacation, setLastUsedVacation] = useState(member.usedVacation);
  const [disbursementTitle, setDisbursementTitle] = useState("");
  const [disbursementWrittenDate, setDisbursementWrittenDate] =
    useState<Date | null>(new Date());
  const [expense, setExpense] = useState("");
  const [wayOfDisbursementContent, setWayOfDisbursementContent] = useState("");
  const [disbursementContent, setDisbursementContent] = useState("");
  const [disbursementBank, setDisbursementBank] = useState("");
  const [dateOfWrittenDisbursement, setDateOfWrittenDisbursement] =
    useState<Date | null>(new Date());
  const [supplyValue, setSupplyValue] = useState("");
  const [tax, setTax] = useState("");
  const [totalDisbursement, setTotalDisbursement] = useState("");
  const [evidence, setEvidence] = useState("");

  useEffect(() => {
    setVacationTitle(
      `[${member.name} ${member.position}] 휴가 신청 (${dayjs(writtenDate).format(
        "YYYY-MM-DD"
      )})`
    );
  }, [writtenDate]);

  useEffect(() => {
    setFormattedApplicatedDates(updateFormattedApplicatedDates(datesValue));
    setLastUsedVacation(calculateUsedVacation(datesValue));
  }, [datesValue]);

  const createNotification = trpc.notifications.createNotification.useMutation();
  const createLeaveRequest = trpc.leaveRequests.createLeaveRequest.useMutation(); 

  const handleCreateNotification = async () => {
    const input = {
      id: Date.now().toString(),
      created_by: member.account_id,
      title,
      content,
      type: "01",
    };
    console.log("데이터:", input); // input 내용 콘솔에 출력

    try {
      await createNotification.mutateAsync(input);
      alert("공지사항이 작성되었습니다.");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("공지사항 작성 중 오류 발생:", error);
      alert("공지사항 작성에 실패했습니다.");
    }
  };

  const handleCreateVacation = async () => {
    const input = {
      start_date: datesValue[0], // 첫 번째 날짜를 시작일로 설정
      end_date: datesValue[datesValue.length - 1], // 마지막 날짜를 종료일로 설정
      reason: reasonVacation, // 휴가 사유
      created_by: member.id, // 생성자 (회원 ID)
      resolved_by: null, // 처리자가 아직 없으므로 null로 설정
    };

    console.log("휴가계 데이터:", input);

    try {
      await createLeaveRequest.mutateAsync(input);

      alert("휴가계가 제출되었습니다.");
      setVacationTitle("");
      setDatesValue([]);
      setReasonVacation("");
    } catch (error) {
      console.error("휴가계 작성 중 오류 발생:", error);
      alert("휴가계 제출에 실패했습니다.");
    }
  };

  const handleButtonClick = () => {
    if (selectedWrite === "공지") {
      handleCreateNotification();
    } else if (selectedWrite === "휴가계") {
    handleCreateVacation();
    }
  };

  const renderWriteContent = () => {
    switch (selectedWrite) {
      case "공지":
        return (
          <NoticeWrite
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        );
      case "휴가계":
        return (
          <VacationWrite
            vacationTitle={vacationTitle}
            setVacationTitle={setVacationTitle}
            datesValue={datesValue}
            setDatesValue={setDatesValue}
            formattedApplicatedDates={formattedApplicatedDates}
            writtenDate={writtenDate}
            setWrittenDate={setWrittenDate}
            reasonVacation={reasonVacation}
            setReasonVacation={setReasonVacation}
            lastUsedVacation={lastUsedVacation}
          />
        );
      case "지출결의서":
        return (
          <DisbursementWrite
            disbursementTitle={disbursementTitle}
            setDisbursementTitle={setDisbursementTitle}
            disbursementWrittenDate={disbursementWrittenDate}
            setDisbursementWrittenDate={setDisbursementWrittenDate}
            expense={expense}
            setExpense={setExpense}
            wayOfDisbursementContent={wayOfDisbursementContent}
            setWayOfDisbursementContent={setWayOfDisbursementContent}
            disbursementContent={disbursementContent}
            setDisbursementContent={setDisbursementContent}
            disbursementBank={disbursementBank}
            setDisbursementBank={setDisbursementBank}
            dateOfWrittenDisbursement={dateOfWrittenDisbursement}
            setDateOfWrittenDisbursement={setDateOfWrittenDisbursement}
            supplyValue={supplyValue}
            setSupplyValue={setSupplyValue}
            tax={tax}
            setTax={setTax}
            totalDisbursement={totalDisbursement}
            setTotalDisbursement={setTotalDisbursement}
            evidence={evidence}
            setEvidence={setEvidence}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={style.container}>
      <Tabs
        variant="pills"
        radius="xl"
        defaultValue="공지"
        onChange={setSelectedWrite}
      >
        <Tabs.List>
          {writeTabBtnItems.map((items, index) => (
            <Tabs.Tab key={index} value={items.value}>
              {items.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <Paper className={style["input_paper"]} shadow="sm" withBorder p="xs">
        <div className={style["input_form"]}>{renderWriteContent()}</div>
      </Paper>
      <div className={style["btn_area"]}>
        <ButtonItem className={style["cancel"]}>취소</ButtonItem>
        <ButtonItem className={style["confirm"]} onClick={handleButtonClick}>
          확인
        </ButtonItem>
      </div>
    </div>
  );
}