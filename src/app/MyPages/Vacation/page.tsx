import { MyContent } from "@/components/MyContent/MyContent"
import { Container, Title } from "@mantine/core"

export default function VacationPage() {
  console.log("My Vacation Page!!!")
  return (
    <Container>
      <Title ta="center" mt={100}>휴가계</Title>
      <MyContent />
    </Container>
  )

}