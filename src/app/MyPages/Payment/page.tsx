import { MyContent } from "@/components/MyContent/MyContent"
import { Container, Title } from "@mantine/core"

export default function PaymentPage() {
  return (
    <Container>
      <Title ta="center" mt={100}>지출결의서</Title>
      <MyContent />
    </Container>
  )

}