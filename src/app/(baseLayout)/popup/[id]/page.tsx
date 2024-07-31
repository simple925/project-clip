'use client'
// import { Welcome } from '../components/Welcome/Welcome';
import { Modal } from "@/components/Modal/Modal";
import { trpc } from '@/server/client';

export default function popup(props: any) {
  console.log(props);
  console.log(props.params.id);
  const getUser = trpc.user.list.useQuery({ limit: 1 })
  
  return (
    <>
      <div>
        <Modal id={props.params.id} clickState={true}/>
      </div>
    </>
  );
}
