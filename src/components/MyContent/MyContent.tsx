'use client';
import { Container, Title, Accordion, ScrollArea } from '@mantine/core';
import classes from './myContent.module.css';
import { MyPageSearchBar } from "@/components/MyPageSearchBar/myPageSearchBar";
import commonApi from '../../../lib/commonApi';
import { useEffect, useState } from 'react';
import { error } from 'console';
const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';


export function MyContent() {
  // fetch할 데이터
  const [student, setStudent] = useState([])
  // commonApi로 fetch할 데이터
  const [studentList, setStudentList] = useState([])
  useEffect(() => {

      //api 사용 차이 비교할 것

      // Fetch student data
        fetch('http://localhost:9999/student')
        .then(res => res.json())
        .then(student => setStudent(student))
        .catch(error => console.error('fetch student에서 오류 발생:', error))
        
      //Fetch commonApi 사용해서 student data 가져옴
      commonApi('http://localhost:9999/person')
      .then(studentList => setStudentList(studentList))
      .catch(error => console.error('fetch commonApi에서 오류 발생:', error))
  }, [])
  
  return (
    <Container size="sm" className={classes.wrapper}>
      <div>
        <MyPageSearchBar />
      </div>   
      <Title ta="center" className={classes.title}>
        휴가계
      </Title>
      <ScrollArea w={800} h={530}>
            {/* <div>불러온 데이터 조회</div>
            {
                student.map(data=>{
                  return (
                      <div className='students' key={data.id}>
                        <h4>{data.name}</h4>
                      </div>
                  )
                })
            } */}
        <Accordion w={700} variant="separated">
          {studentList.map(data => (
            <Accordion.Item className={classes.item} value={data.id} key={data.id}>
              <Accordion.Control>{data.name}</Accordion.Control>
              <Accordion.Panel>{data.email}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollArea>
    </Container>
  );
}