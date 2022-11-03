import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { prisma } from '../lib/prisma'
import { useRouter } from 'next/router'

interface Task{
  tasks: {
    id: string
    title: string
    content: string
  }[]
}
interface FormData {
  title: string
  content: string
  id: string
}
const Home = ({ tasks }: Task) => {
  const [items, setItems] = useState<FormData>({title: '', content: '', id: ''});
  const [newItems, setNewItems] = useState<Boolean>(true)
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function handleSubmit(data: FormData){
    try {
      if (newItems) {
        // Check input is not blank
        if (data.title) {
          // CREATE
          fetch('api/create', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }).then(() => {
            setItems({title: '', content: '', id: ''})
            refreshData()
          })
        }
        else {
          alert("Title can not be blank")
        }
      }
      else {
        // UPDATE
          fetch('api/task/${data.id}', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT'
          }).then(() => {
            setItems({title: '', content: '', id: ''})
            setNewItems(true)
            refreshData()
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function updateItem(title:" ", content: '', id:'') {
    //console.log(title, content, id)
    setItems({title, content, id})
    setNewItems(false)
  }

  async function deleteItem(id: string) {
    try {
      fetch('api/task/${id}', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }).then(() => {
        refreshData()
      })
    } catch (error) {
      console.log(error)
    }    
  }

  function handleCancel() {
    setItems({title: '', content: '', id: ''})
    setNewItems(true)
  }

  
  return (
    <div className="text-4xl">
      <h1 className='text-center font-bold text-2xl mt-4'>To Do App</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleSubmit(items)
      }} className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-sstretch'>
       <input type='text'
          placeholder='Enter ToDo Task'
          value={items.title}
          onChange={(e) => setItems({...items,title: e.target.value})}
          className="border-2 rounded border-gray-6 p-1" 
           ></input>
        <textarea
          placeholder='Any additional information'
          value={items.content}
          onChange={(e) => setItems({...items,content: e.target.value})}
          className="border-2 rounded border-gray-6 p-1" 
           ></textarea>
        {newItems ? (
        <button type="submit" className='bg-red-500 text-white rounded p-1'>Add + </button>
        ): (
          <>
            <button type="submit" className="bg-blue-500 text-white rounded p-1">Update</button>
            <button onClick={handleCancel} className="bg-red-500 text-white rounded p-1">Cancel</button> 
          </>
        )}
      </form>

      
      <div  className='w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-start'>
        <h2>Tasks To Be Done</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className='border-b botder-gray-600 p-2'>
              <div className='flex justify-between '>
                <div className='flex-1'>
                  <h3>{task.title}</h3>
                  <p>{task.content}</p>

                </div>
                <button onClick={() => updateItem(task.title, task.content, task.id)} className="bg-blue-500 px-3 text-white rounded">Edit</button>
                <button onClick={() => deleteItem(task.id)} className="bg-red-500 px-3 text-white rounded">X</button>          
              </div>
            </li>
          ) )}
        </ul>
    </div>
  </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany({
    select: {
      title: true,
      id: true,
      content: true,
    }
  })

  return {
    props: {
      tasks
    }
  }
}