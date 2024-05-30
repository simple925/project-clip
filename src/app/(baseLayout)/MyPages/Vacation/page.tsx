"use client";
import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import { Container, Title } from "@mantine/core";

export default function VacationPage() {
  return (
    <Container>
      <Title ta="center" mt={100}>
        휴가계
      </Title>
      <MyPageSearchBar />
      <MyContent />
    </Container>
  );
}
