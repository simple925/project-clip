"use client";
import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";
import { Container, Title } from "@mantine/core";

export default function AlramPage() {
  return (
    <Container>
      <Title ta="center" mt={100}>
        알람
      </Title>
      <MyPageSearchBar />
      <MyContent />
    </Container>
  );
}
