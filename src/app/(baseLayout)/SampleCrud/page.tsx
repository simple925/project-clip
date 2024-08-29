"use client";
import { useState, useRef, useEffect } from "react";
import { trpc } from '@/server/client';


export default function SampleCrudPage() {
  const getAccounts = trpc.crud.getAccounts.useQuery()
  const addAccount = trpc.crud.addAccount.useMutation({
    onSettled: () => {
      getAccounts.refetch()
    }
  })

  const updateAccount = trpc.crud.updateAccount.useMutation({
    onSettled: () => {
      getAccounts.refetch()
    }
  })

  const deleteAccount = trpc.crud.deleteAccount.useMutation({
    onSettled: () => {
      getAccounts.refetch()
    }
  })

  const [id, setId] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {JSON.stringify(getAccounts.data)}
      <div className="flex flex-col gap-3">
      Id:{" "}
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        type="text"
        className="border"
      />
      userName:{" "}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="border"
      />
      password:{" "}
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        className="border"
      />
      </div>
      <button className="border" onClick={() => updateAccount.mutate({id, username, password})}>Add</button>
      <button className="border" onClick={() => deleteAccount.mutate({id})}>Delete</button>
    </main>
  );
}