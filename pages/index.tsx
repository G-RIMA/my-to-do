import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

interface FormData {
  task: string
  extra: string
  id: string
}
export default function Home() {
  const [items, setItems] = useState<FormData>({task: '', extra: '', id: ''});

  const handleAdd = () => {

  }
  return (
    <div className="text-4xl">
      <h1 className='text-center font-bold text-2xl mt-4'>To Do App</h1>
      <form onSubmit={e => {
        e.preventDefault()
      }} className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-sstretch'>
       <input type='text'
          placeholder='Enter ToDo Task'
          value={items.task}
          onChange={(e) => setItems({...items,task: e.target.value})}
          className="border-2 rounded border-gray-6 p-1" 
           ></input>
        <textarea
          placeholder='Any additional information'
          value={items.extra}
          onChange={(e) => setItems({...items,extra: e.target.value})}
          className="border-2 rounded border-gray-6 p-1" 
           ></textarea>
       <button type="submit" className='bg-red-500 text-white rounded p-1'>Add + </button>
      </form>
      <ul>
      </ul>
    </div>
  )
}
