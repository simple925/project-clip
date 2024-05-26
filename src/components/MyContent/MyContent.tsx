"use client";
import {
  Container,
  Accordion,
  ScrollArea,
  ActionIcon,
  Group,
} from "@mantine/core";
import classes from "./MyContent.module.css";
import commonApi from "../../../lib/commonApi";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { UserInfo } from "@/components/UserInfo/UserInfo";

export function MyContent(props: any) {
  /*
  // fetch할 데이터
  const [student, setStudent] = useState([]);
  // commonApi로 fetch할 데이터
  const [studentList, setStudentList] = useState<any>([]);
  useEffect(() => {
    // Fetch student data
    fetch("http://localhost:9990/login")
      .then((res) => res.json())
      .then((student) => setStudent(student))
      .catch((error) => console.error("fetch student에서 오류 발생:", error));

    //Fetch commonApi 사용해서 student data 가져옴
    commonApi("http://localhost:9990/posts")
      .then((studentList) => setStudentList(studentList))
      .catch((error) => console.error("fetch commonApi에서 오류 발생:", error));
  }, []);
*/
  return (
    <Container mt={20} size="md" className={classes.wrapper}>
      <ScrollArea w={900} h={530} variant="default">
        <Group justify="center" h={50}>
          {/* <Accordion w={650} variant="separated">
            {studentList.map((data: any) => (
              <Accordion.Item
                className={classes.item}
                value={data.title}
                key={data.id}
              >
                <Accordion.Control>{data.title}</Accordion.Control>
                <Accordion.Panel>{data.author}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion> */}
          <Accordion chevronPosition="left" w={650} variant="separated">
            {props.userInfo}
          </Accordion>
        </Group>
      </ScrollArea>
    </Container>
  );
}
