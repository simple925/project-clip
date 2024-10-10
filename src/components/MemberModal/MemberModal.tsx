import {
  TextInput,
  Title,
  Modal,
  Stack,
  Button,
  Select,
  Mark,
  ScrollArea,
  FileInput,
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from '@mantine/form';
import { useFocusWithin } from '@mantine/hooks';
import { IconUserPlus, IconPhotoPlus } from '@tabler/icons-react';
import { trpc } from '@/server/client';
import { any } from "zod";
import { useState } from "react";


export function MemberModal({opened, close}) {
  type FormData = {
    account_id: string,
    id: string,
    name: string,
    position: string,
    hire_date: string,
    birth_date: string,
    contact_number: string,
    email: string,
    address: string,
    emergency_contact_number: string,
  };

  const imageIcon = <IconPhotoPlus stroke={2} />

  const getAccounts = trpc.accounts.getUnRegisteredAccounts.useQuery()

  const accountList = getAccounts.data;
  const accountIdList = [];

  if(accountList !== undefined){
    accountList.forEach(element => {
      accountIdList.push(element.id);
    });
  }

  const form = useForm({
    initialValues: {
    account_id: '',
    id: '',
    name: '',
    position: '',
    hire_date: '',
    birth_date: '',
    contact_number: '',
    email: '',
    address: '',
    emergency_contact_number: '',
  },
    validateInputOnChange: true,

    validate: {
      account_id: (val) => (val=='' ? '접속아이디를 반드시 선택해야 합니다.' : null),
      id: (val) => (val.length < 2 ? '2글자 이상 입력해주세요.' : null),
      name: (val) => (val.length > 20 ? '20글자 이상의 이름은 사용할 수 없습니다.' : null),
      email: (val) => (val == '' || /^\S+@\S+$/.test(val) ? null : '이메일 형식으로 입력해주세요.'),
      contact_number: (val) => (val == '' || val.length == 11 && /^[0-9]*$/.test(val) ? null : '11글자 형식으로 숫자만 입력하세요.'),
      emergency_contact_number: (val) => (val == '' || val.length == 11 && /^[0-9]*$/.test(val) ? null : '11글자 형식으로 숫자만 입력하세요.'),
    },
  });

  // 포커스 컨트롤
  const [phoneNumber, setPhoneNumber] = useState('');

  const { ref, focused } = useFocusWithin();

  // ;

  // 전화번호 형식 변환 함수
  let resultNum;
  const formatPhoneNumber = (number) => {
    const match = number.match(/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/);
    if (match) {
      resultNum = number
    } else {
      let num = number.replace(/\D/g, '').match(/(\d{3})(\d{4})(\d{4})/);
      resultNum = num[1] + '-' + num[2] + '-' + num[3];
    }
    debugger
    return resultNum;
  };
  console.log(resultNum);

  // 포커스 아웃 시 포맷 적용
  const handleBlur = () => {
    if (!focused) {
      setPhoneNumber(formatPhoneNumber(phoneNumber));
    }
  };

  // 사원 등록
  const createMember = trpc.members.createMember.useMutation({
    onSuccess: (data) => {
      console.log('Member created:', data);
      alert('Member created successfully!');
      form.reset();
      close();
    },
    onError: (error) => {
      console.error('Error creating member:', error.message);
    },
  });

   // 폼이 제출될 때 실행될 함수
  const onSubmit = (data: FormData) => {
    console.log('Submitted data:', data);
    // 여기에 API 호출이나 다른 로직을 실행하면 됩니다.
    createMember.mutate(data);
  };
  
  return (
    <Modal opened={opened} 
      withCloseButton 
      onClose={close} 
      size="lg" 
      title="사원정보 등록" 
      scrollAreaComponent={ScrollArea.Autosize}
      centered
      >
      
      <Title c="dimmed" size="xs" mb="xs" fw={500}>
        <IconUserPlus/> 사원정보를 입력하고 <Mark color="gray">'저장'</Mark> 버튼을 누르세요.
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="sm">
        <Select 
          label="접속아이디"
          placeholder="접속아이디를 선택하세요"
          key={form.key('account_id')}{...form.getInputProps('account_id')}
          data={accountIdList}
          withAsterisk/>
        <TextInput 
          label="사용자아이디" 
          placeholder="clip"
          key={form.key('id')}{...form.getInputProps('id')}
          style={{ flex: 1 }} 
          withAsterisk/>
        <TextInput 
          label="이름"
          placeholder="김사원"
          key={form.key('name')}{...form.getInputProps('name')}
          style={{ flex: 1 }} />
        <Select
          label="직급"
          placeholder="직급을 선택하세요"
          key={form.key('position')}
          {...form.getInputProps('position')}
          data={['사원', '대리', '과장', '차장', '부장', '이사', '대표']}
        />
        <DateInput valueFormat="YYYY-MM-DD" 
          label="입사일" placeholder="2024-01-01" 
          key={form.key('hire_date')}
          {...form.getInputProps('hire_date')}/>
        <DateInput valueFormat="YYYY-MM-DD" 
          label="생년월일" placeholder="2024-01-01" 
          key={form.key('birth_date')}
          {...form.getInputProps('birth_date')}/>
        <TextInput ref={ref} onBlur={handleBlur}
          label="휴대폰" style={{ flex: 1 }}
          placeholder="01012345678"
          key={form.key('contact_number')}
          {...form.getInputProps('contact_number')}/>
        <TextInput 
          label="이메일" style={{ flex: 1 }}
          placeholder="clip@cluedin.co.kr"
          key={form.key('email')}
          {...form.getInputProps('email')}/>
        <TextInput 
          label="비상연락망" style={{ flex: 1 }}
          placeholder="01099999999"
          key={form.key('emergency_contact_number')}
          {...form.getInputProps('emergency_contact_number')}/>
        <TextInput 
          label="주소" style={{ flex: 1 }}
          placeholder="서울시 영등포구"
          key={form.key('address')}
          {...form.getInputProps('address')}/>
        <FileInput leftSection={imageIcon} accept="image/png,image/jpeg" label="이미지 등록" placeholder="이미지를 등록하세요."/>
        <Button type="submit">저장</Button>
      </Stack>
      </form>
    </Modal>
  );
}
