// Libraries
import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Skeleton from 'react-loading-skeleton'
// Style
import 'react-loading-skeleton/dist/skeleton.css'
import style from './Home.module.css'
// Components
import Tasks from '../../tasks/Tasks.jsx'
import TaskForm from '../../taskForm/TaskForm'
import { object } from 'yup'


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT


function Home() {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState({new: [], inProgress: [], finished: []})
  const [reRender, forceUpdate] = useReducer( x => x + 1, 0)
  const [renderNewTasks, setRenderNewTasks] = useState(false)
  const [renderInProgressTasks, setRenderInProgressTasks] = useState(false)
  const [renderFinishedTasks, setRenderFinishedTasks] = useState(false)

  const handleReRender = () => {
    console.log("hola juan")
    forceUpdate()
  }


  const fetchAPI = async () => {
    axios({
      method: 'get',
      url: `${ API_ENDPOINT }api/team/tasks/${sessionStorage.getItem('teamID')}`,
    })
    .then( response => setTasks(response.data) )
    .catch( error => Swal.fire(error.response.data) )
    setTimeout(() => {
      setLoading(false)
    }, 400);
  }

  useEffect(() => {
    fetchAPI()
  }, [reRender])

  return (
    <main className={ style.container }>
      <section className={ style.createTasksContainer }>
        <TaskForm forceUpdate={handleReRender}/>
      </section>
      <section className={ style.tasksContainer }>
        <h2 className={ style.title }>Mis Tareas</h2>
        <div className={ style.statusList }>
          <article className={ style.articleNew }  >
            <ul className={ style.new }>
              <button className={ style.newTasksButton } onClick={ () => setRenderNewTasks(!renderNewTasks) }>Nuevas</button>
                {
                  renderNewTasks ?              
                    tasks.new.map( (task, index) => (
                    loading ? <Skeleton key={index} style={{margin:".5rem", padding: "1rem"}} width={"100%"} /> 
                    : <Tasks key={index} data={task} forceUpdate={handleReRender}/> 
                    ))
                  : <></>
                }
            </ul>
          </article>
          <article className={ style.articleInProgress }>
            <ul className={ style.process }>
              <button className={ style.inProgressTasksButton } onClick={ () => setRenderInProgressTasks(!renderInProgressTasks) } >En Proceso</button>
                {
                  renderInProgressTasks ? 
                    tasks.inProgress.map( (task, index) => (
                    loading ? <Skeleton key={index} style={{margin:".5rem", padding: "1rem"}} width={"100%"} /> : <Tasks key={index} data={task} forceUpdate={handleReRender}/>
                    ))
                  : <></>
                }
            </ul>
          </article>
          <article className={ style.articleFinished }>
            <ul className={ style.finished }>
            <button className={ style.finishedTasksButton } onClick={ () => setRenderFinishedTasks(!renderFinishedTasks) } >Terminadas</button>
                {
                  renderFinishedTasks ? 
                    tasks.finished.map( (task, index) => (
                      loading ? <Skeleton key={index} style={{margin:".5rem", padding: "1rem"}} width={"100%"} /> : <Tasks key={index} data={task} forceUpdate={handleReRender}/>
                    ))
                  : <></>
                }
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Home