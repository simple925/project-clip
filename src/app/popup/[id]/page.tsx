// import { Welcome } from '../components/Welcome/Welcome';
import { Demo } from "@/components/Modal";

export default function HomePage(props) {
  // console.log(props);
  // console.log(props.params.id);

  return (
    <>
      <Demo id={props.params.id}/>
    </>
  );
}
