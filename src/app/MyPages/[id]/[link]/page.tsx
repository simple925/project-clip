import { MyContent } from "@/components/MyContent/MyContent";
import { MyPageSearchBar } from "@/components/MyPageSearchBar/MyPageSearchBar";

export default function MyPagesDetail(props: any) {
  return (
    <>
      <MyPageSearchBar mt={20} />
      <MyContent />
    </>
  )

}