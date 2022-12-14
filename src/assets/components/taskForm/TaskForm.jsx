// Libraries
import React, { useState, useEffect, useReducer } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
// Style
import 'react-toastify/dist/ReactToastify.css'
import style from './TaskForm.module.css'
// Components
import CustomSelect from '../CustomSelect.jsx'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

function TaskForm({forceUpdate, initialValues}) {
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
    
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('*El titulo es requerido'),
        priority: Yup.string()
            .required('*Seleccione la prioridad'),
        state: Yup.string()
            .required('*Seleccione el estado'),
    })
    
    const onSubmit = () => {
        const date = new Date()
        const [ day, month, year ] = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ]
        const [ hours, minutes ] = [ date.getHours(), date.getMinutes()<10 ? `0${date.getMinutes()}` : `${date.getMinutes()}` ]
        axios({
            method: 'post',
            url: `${API_ENDPOINT}api/team/tasks/${sessionStorage.getItem('teamID')}`,
            data: {
                title: values.title,
                date: `Fecha de creación: ${day}/${month}/${year} ${hours}:${minutes}hs`,
                owner: sessionStorage.getItem('userName'),
                priority: values.priority,
                state: values.state,
                description: values.description,
            }
        })
        .then(
            response => toast(response.data.message)
        )
        .finally( forceUpdate )
    }
    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { handleSubmit, handleChange, values, errors, handleBlur, touched } = formik

    return (
        <section className={ style.container }>
            <h1 className={ style.title }>Crear Tarea</h1>
            <form onSubmit={ handleSubmit } className={ style.formCard }>
                <label htmlFor="title" className={ style.labels }>
                    <h4>Titulo de tarea</h4>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={ values.title }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    />
                    { errors.title && touched.title && <span className={ style.errorMessage }>{ errors.title }</span> }
                </label>
                <label htmlFor="priority" className={ style.labels }>
                    <h4>Prioridad</h4>
                    <CustomSelect 
                        id='priority' 
                        options={ priorityOptions } 
                        value = { values.priority }
                        onChange = { value => formik.setFieldValue('priority', value.value) }
                        onBlur={ handleBlur }
                    />
                    { errors.priority && touched.priority && <span className={ style.errorMessage }>{ errors.priority }</span> }
                </label>
                <label htmlFor="state" className={ style.labels }>
                    <h4>Estado</h4>
                    <CustomSelect 
                        id='state' 
                        options={ stateOptions }
                        value = { values.state }
                        onChange = { value => formik.setFieldValue('state', value.value) }    
                        onBlur={ handleBlur }    
                    />
                    { errors.state && touched.state && <span className={ style.errorMessage }> { errors.state } </span> }
                </label>
                <div htmlFor="description" className={ style.textareaContainer }>
                    <h4>Descripción</h4>
                    <textarea 
                        name="description" 
                        id="description" 
                        cols="30" 
                        rows="10"
                        value={ values.description }
                        onChange={ handleChange }
                    ></textarea>
                </div>
                <div className={ style.buttonContainer }>
                    <button type='submit'> Crear Tarea </button>
                </div>
            </form>
            <ToastContainer />
        </section>
    )
}

export default TaskForm