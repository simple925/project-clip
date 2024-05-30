'use client'
// import { Welcome } from '../components/Welcome/Welcome';
import { Modal } from "@/components/Modal/Modal";

export default function popup(props: any) {
  console.log(props);
  console.log(props.params.id);

  return (
    <>
      <div>
        <Modal id={props.params.id} clickState={true}/>
      </div>
    </>
  );
}
