// Libraries
import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import CustomSelect from '../CustomSelect.jsx'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
// Style
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import style from './Tasks.module.css'

import editIcon from '../../img/icons/edit.svg'
import trashIcon from '../../img/icons/trash-2.svg'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT


function Tasks({data = {}, forceUpdate}) {
    const [editingTask, setEditingTask] = useState(false)

    const initialValues = {
        state: data.state,
        newState: "",
        priority: data.priority,
        description: data.description,
        title: data.title,
        owner: data.owner,
        date: data.date,
        id: data.id,
    }

    const onSubmit = () => {
        editTask()
        axios({
            method: 'put',
            url: `${API_ENDPOINT}api/team/tasks`,
            data: {
                userName: sessionStorage.getItem('userName'),
                teamID: sessionStorage.getItem('teamID'),
                taskData: {
                    state: values.state,
                    newState: values.newState,
                    priority: values.priority,
                    description: values.description,
                    title: values.title,
                    owner: values.owner,
                    date: values.date,
                    id: values.id,
                }
            }
        })
        .then( response => toast(response.data.message) )
        .finally( forceUpdate )
    }
    const formik = useFormik({ initialValues, onSubmit })
    const { handleSubmit, handleChange, values } = formik

    const priorityOptions = [
        { value: "Alta", label: "Alta"},
        { value: "Media", label: "Media"},
        { value: "Baja", label: "Baja"},
    ]
    const stateOptions = [
        { value: "Nueva", label: "Nueva"},
        { value: "En proceso", label: "En proceso"},
        { value: "Terminada", label: "Finalizada"},
    ]
    
    const deleteTask = () => {
        Swal.fire({
            title: '¿Estas seguro que quieres borrar esta tarea?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'delete',
                    url: `${API_ENDPOINT}api/team/tasks`,
                    data: {
                        userName: sessionStorage.getItem('userName'),
                        teamID: sessionStorage.getItem('teamID'),
                        taskData: values
                    }
                })
                .then( response =>  toast(response.data.message) )
                .finally( forceUpdate )
            }
          })
        
    }

    const editTask = () => {
        setEditingTask(false)
    }

    if(editingTask === true){
        return(
            <>
                <form onSubmit={ handleSubmit } className={ style.taskCard }>
                    <div className={ style.firstLineContainer }>
                        <input 
                            type="text"
                            id='title'
                            name='title' 
                            value={ values.title }
                            onChange={ handleChange }
                        />
                        <button type='submit' > Guardar </button>
                    </div>
                    <h5 className={ style.date }>Fecha de creación: {data.date}</h5>
                    <h6 className={ style.owner }>Creada por: {data.owner}</h6>
                    <div className={ style.statusContainer }>
                        <CustomSelect 
                            id='newState'
                            options={ stateOptions } 
                            value = { values.newState }
                            onChange = { value => formik.setFieldValue('newState', value.value) }
                            def={ values.state }
                        />
                        <CustomSelect 
                            id='priority'
                            options={ priorityOptions } 
                            value = { values.priority }
                            onChange = { value => formik.setFieldValue('priority', value.value) }
                        />
                    </div>
                    <div className={ style.description }>
                        <textarea 
                            name="description" 
                            id="description" 
                            cols="30" 
                            rows="10" 
                            value={ values.description }
                            onChange={ handleChange }
                        ></textarea>
                    </div>
                </form>
                <ToastContainer />
            </>
        )
    } else{
        return (
            <li className={ style.taskCard }>
                <div className={ style.firstLineContainer }>
                    <div className={ style.titleContainer }>
                        <h3 className={ style.title }>{ data.title }</h3>
                    </div>
                    {
                        sessionStorage.getItem('userName') === data.owner? 
                        <div className={ style.buttonsContainer }>
                            <button className={ style.editButton } onClick={ () => setEditingTask(true)}>
                                <img className={ style.editIcon } src={editIcon} alt="edit-icon" />
                            </button>
                            <button onClick={ deleteTask } className={ style.deleteButton }>
                                <p>x</p>
                            </button>
                        </div>
                        : <></>
                    }
                </div>
                <h5 className={ style.date }>Fecha de creación: {data.date}</h5>
                <h6 className={ style.owner }>Creada por: {data.owner}</h6>
                <div className={ style.statusContainer }>
                    <button className={ style.state }>{ data.newState? data.newState : data.state }</button>
                    <button className={ style.priority }>{data.priority}</button>
                </div>
                <p className={ style.description }>
                    {String(data.description).substring(0, 120)}...
                </p>
            </li>
        )
    }
}

export default Tasks