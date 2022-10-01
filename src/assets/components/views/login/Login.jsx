// Libraries
import React from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
// Styles
import style from './Login.module.css'
// Environment variable´s
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

function Login() {

  const navigate = useNavigate()
  
  const initialValues = {
    userName: "",
    password: "",
  }

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string().required("Ingrese su usuario"),
      password: Yup.string().required("Ingrese su contraseña")
    })


  const onSubmit = () => {
    axios({
      method: 'post',
      url: `${ API_ENDPOINT }api/users`,
      data: {
        userName: values.userName,
        password: values.password
      }
    })
    .then(
        response => {
          if (response.status === 200) {
            localStorage.setItem('logged', 'yes')
            localStorage.setItem('teamID', response.data.teamID)
            localStorage.setItem('userName', response.data.userName)
            navigate("/")
          }
        }
        )
    .catch( error => Swal.fire(error.response.data) )
  }
  
  const formik = useFormik( {initialValues, validationSchema, onSubmit} )
  const { handleChange, handleSubmit, values, errors, handleBlur, touched } = formik

  return (
    <main className={ style.container }>
        <form className={ style.formCard } onSubmit={ handleSubmit }>
            <h1 className={ style.title }>Iniciar sesión</h1>
            <label htmlFor="userName" className={ style.labels }>
                <h4>Nombre de usuario</h4>
                <input 
                  type="text" 
                  name="userName" 
                  id='userName' 
                  onChange= { handleChange }
                  value={ values.userName }
                  onBlur={ handleBlur }
                />
                { errors.userName && touched.userName && <span className={ style.errorMessage }>{ errors.userName }</span> }

            </label>
            <label htmlFor="password" className={ style.labels }>
                <h4>Contraseña</h4>
                <input 
                  type="password" 
                  name='password' 
                  id='password' 
                  onChange= { handleChange }
                  value={ values.password }
                  onBlur={ handleBlur }
                />
                { errors.password && touched.password && <span className={ style.errorMessage }>{ errors.password }</span> }
            </label>
            <div className={ style.buttonContainer }> 
              <button type='submit'> Enviar </button> 
            </div>
            <Link className={ style.registerLink } to="/register">Registrarme</Link>
        </form>
    </main>
  )
}

export default Login