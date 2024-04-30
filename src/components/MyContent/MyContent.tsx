'use client';
import { Container, Title, Accordion, ScrollArea } from '@mantine/core';
import classes from './MyContent.module.css';
import commonApi from '../../../lib/commonApi';
import { useEffect, useState } from 'react';

export function MyContent(props: any) {
  // fetch할 데이터
  const [student, setStudent] = useState([])
  // commonApi로 fetch할 데이터
  const [studentList, setStudentList] = useState<any>([])
  useEffect(() => {
    // Fetch student data
    fetch('http://localhost:9990/login')
      .then(res => res.json())
      .then(student => setStudent(student))
      .catch(error => console.error('fetch student에서 오류 발생:', error))

    //Fetch commonApi 사용해서 student data 가져옴
    commonApi('http://localhost:9990/posts')
      .then(studentList => setStudentList(studentList))
      .catch(error => console.error('fetch commonApi에서 오류 발생:', error))
  }, [])

  const [title, setTitle] = useState([])

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        {props.title}
      </Title>
      <ScrollArea w={800} h={530}>
        <Accordion w={700} variant="separated">
          {studentList.map((data: any) => (
            <Accordion.Item className={classes.item} value={data.title} key={data.id}>
              <Accordion.Control>{data.title}</Accordion.Control>
              <Accordion.Panel>{data.author}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollArea>
    </Container>
  );
}