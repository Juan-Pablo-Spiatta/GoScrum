// Libraries
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Skeleton from 'react-loading-skeleton'
// Style
import 'react-loading-skeleton/dist/skeleton.css'
import style from './Home.module.css'
// Components
import Tasks from '../../tasks/Tasks.jsx'
import TaskForm from '../../taskForm/TaskForm'


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT


function Home() {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState({new: [], inProgress: [], finished: []})
  
  useEffect(() => {
    axios({
        method: 'get',
        url: `${ API_ENDPOINT }api/team/tasks/${localStorage.getItem('teamID')}`,
      })
      .then( response => setTasks(response.data) )
      .catch( error => Swal.fire(error.response.data) )
  }, [])

  return (
    <main className={ style.container }>
      <section className={ style.createTasksContainer }>
        <TaskForm />
      </section>
      <section className={ style.tasksContainer }>
        <h2 className={ style.title }>Mis Tareas</h2>
        <div className={ style.statusList }>
          <article>
            <h4>Nuevas</h4>
            <ul className={ style.new }>
                {
                  tasks.new.map( task => (
                    loading ? <Skeleton 
                      borderRadius={100}
                      sx={{ bgcolor: 'grey.900' }}
                      width={50}
                      height={50}
                    /> 
                    : <Tasks key={task.id} data={task}/> 
                  ))
                }
            </ul>
          </article>
          <article>
            <h4>En proceso</h4>
            <ul className={ style.process }>
                {
                  tasks.inProgress.map( task => (
                    loading ? <Skeleton height={100} width={350} /> : <Tasks key={task.id} data={task}/>
                  ))
                }
            </ul>
          </article>
          <article>
            <h4>Finalizadas</h4>
            <ul className={ style.finished }>
                {
                  tasks.finished.map( task => (
                    loading ? <Skeleton height={100} width={200} /> : <Tasks key={task.id} data={task}/>
                  ))
                }
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Home