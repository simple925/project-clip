// import { Welcome } from '../components/Welcome/Welcome';
import { Modal } from "@/components/Modal/Modal";

export default function HomePage(props) {
  // console.log(props);
  // console.log(props.params.id);

  return (
    <>
      <Modal id={props.params.id}/>
    </>
  );
}
