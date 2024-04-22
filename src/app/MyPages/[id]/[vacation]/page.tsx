import { MyContent } from "@/components/MyContent/MyContent"

export default function MyVacationPage(props:any) {
  console.log("My Vacation Page!!!", props.params.vacation)
  return (
    <>
      <MyContent title={props.params.vacation} />
    </>
  )

}