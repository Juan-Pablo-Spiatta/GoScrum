// Libraries
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// Style
import style from './Register.module.css';
// Components
import CustomSelect from '../../CustomSelect';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function Register() {
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    const rolOptions = [
        { value: "leader", label: "Team Leader"},
        { value: "member", label: "Team Member"},
    ]
    const continentsOptions = [
        { value: "america", label: "America"},
        { value: "europe", label: "Europa"},
        { value: "asian", label: "Asia"},
        { value: "oceania", label: "Oceania"},
        { value: "african", label: "Africa"},
    ]
    const americaOptions = [
        { value: "america del norte", label: "America del Norte"},
        { value: "america central", label: "America Cental"},
        { value: "america sel sur", label: "America del Sur"},
    ]
    const europeOptions = [
        { value: "europa iberica", label: "Europa Ibérica"},
        { value: "europa atlantica", label: "Europa Atlántica"},
        { value: "europa mediterranea", label: "Europa Mediterránea"},
        { value: "europa central", label: "Europa Central"},
        { value: "europa oriental", label: "Europa Oriental"},
    ]
    const asianOptions = [
        { value: "asia septentrional", label: "Asia Septentrional"},
        { value: "asia centro-oriental", label: "Asia Centro-oriental"},
        { value: "asia del extremo oriente", label: "Asia del Extremo Oriente"},
        { value: "asia occidental", label: "Asia Occidental"},
        { value: "asia meridional", label: "Asia Meridional"},
        { value: "asia sureste", label: "Asia Sureste"},
    ]
    const oceaniaOptions = [
        { value: "micronesia", label: "Micronesia"},
        { value: "polinesia", label: "Polinesia"},
        { value: "melanesia", label: "Melanesia"},
        { value: "australia", label: "Australia"},
    ]
    const africanOptions = [
        { value: "africa septentrional", label: "Africa Septentrional"},
        { value: "africa occidental", label: "Africa Occidental"},
        { value: "africa central", label: "Africa Central"},
        { value: "africa oriental", label: "Africa Oriental"},
        { value: "africa meridional", label: "Africa Meridional"},
    ]

    const initialValues = {
        userName: "",
        password: "",
        email: "",
        teamID: uuidv4(),
        rol: "",
        continent: "",
        region: "",
        checked: false,
    }

    const required = "*Campo obligatorio"
    const errorMessages = {
        userName: {
            required: "*Ingrese un nombre de usuario",
            length: "*Deve contener 4 caracteres como minimo"
        },
        password: {
            required: "*Ingrese una contraseña",
            length: "*Deve contener 6 caracteres como minimo",
            format: "*Deve contener almenos una mayuscula y un numero"
        },
        email: {
            required: "*Ingrese una direccion de correo",
            format: "*Deve tener el siguiente formato example@mail.com"
        }
    }

    const validationSchema = () => 
        Yup.object().shape({
            userName: 
                Yup.string()
                .min(4, errorMessages.userName.length)
                .required(errorMessages.userName.required),
            password: 
                Yup.string()
                .min(6, errorMessages.password.length)
                .required(errorMessages.password.required)
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, errorMessages.password.format),
            email: 
                Yup.string()
                .email(errorMessages.email.format)
                .required(errorMessages.email.required),
            teamID: 
                Yup.string()
                .required(required),
            rol: 
                Yup.string()
                .required(required),
            continent: 
                Yup.string()
                .required(required),
            region: 
                Yup.string()
                .required(required)
        })


    const handleChangeTeamID = value => {
        setFieldValue("checked", !values.checked)
        if(values.checked){
            setFieldValue("teamID", uuidv4())
        }else{setFieldValue("teamID", "") }
    }

    const onSubmit = (values, { resetForm }) => {
        axios({
            method: "post",
            url: `${API_ENDPOINT}api/register`,
            data: {
                userName: values.userName,
                password: values.password,
                email: values.email,
                teamID: values.teamID,
                rol: values.rol,
                continent: values.continent,
                region: values.region
            }
        })
        .then(
            response => {
                if( response.status === 200 ){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario creado!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/login')
                }
            }
        )
        .catch( error => Swal.fire({
            icon: 'error',
            title: error.response.data,
          }) )
    }
    
    const formik = useFormik( {initialValues, validationSchema, onSubmit} )
    const { handleChange, handleSubmit, values, errors, setFieldValue, touched, handleBlur } = formik

  return (
    <main className={ style.container }>

        <form className={ style.formCard } onSubmit={ handleSubmit }>

            <h1 className={ style.title }>Registro</h1>

            <label htmlFor="userName" className={ style.labels }>
                <h4>Nombre de usuario</h4>
                <input 
                  type="text" 
                  name="userName" 
                  id='userName' 
                  value={ values.userName }
                  onChange= { handleChange }
                  onBlur={ handleBlur }
                />
                { errors.userName && touched.userName &&<span className={ style.errorMessage }>{ errors.userName }</span> }
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

            <label htmlFor="email" className={ style.labels }>
                <h4>Correo</h4>
                <input 
                  type="text" 
                  name='email' 
                  id='email' 
                  onChange= { handleChange }
                  value={ values.email }
                  onBlur={ handleBlur }
                  placeholder="example@mail.com"
                />
                { errors.email && touched.email && <span className={ style.errorMessage }>{ errors.email }</span> }
            </label>

            <label htmlFor="teamID" className={ style.labels }>
                <label htmlFor="checked" className={ style.labelChecked }>
                    <input 
                        className={ style.checkbox } 
                        type="checkbox" 
                        id='checked' 
                        value={ values.checked } 
                        onChange={ event =>  handleChangeTeamID( event.currentTarget.value ) }
                        />
                    <span id='checked'> ¿Perteneces a un equipo ya creado? </span>
                </label>
                {   values.checked && 
                    <>
                        <h4>Ingrese id del equipo</h4>
                        <input 
                        type="text" 
                        name='teamID' 
                        id='teamID' 
                        onChange= { handleChange }
                        value={ values.teamID }
                        onBlur={ handleBlur }
                        />
                        { errors.teamID && touched.teamID && <span className={ style.errorMessage }> {errors.teamID} </span> }
                    </>
                }
            </label>


            <label htmlFor="rol" className={ style.labels }>
                <h4>Rol</h4>
                <CustomSelect 
                        options = { rolOptions } 
                        value = { values.rol }
                        onChange = { value => formik.setFieldValue('rol', value.value) }
                />
                { errors.rol && touched.rol && <span className={ style.errorMessage }> {errors.rol} </span>}
            </label>
            <label htmlFor="continent" className={ style.labels }>
                <h4>Continente</h4>
                <CustomSelect 
                    options = { continentsOptions } 
                    value = { values.continent }
                    onChange = { value => formik.setFieldValue('continent', value.value) }
                />
                { errors.continent && touched.continent && <span className={ style.errorMessage }> {errors.continent} </span>}
            </label>
            {
                values.continent && 
                <label htmlFor="region" className={ style.labels }>
                    {
                        values.continent === "america" &&
                        <>
                            <h4>Region</h4>
                            <CustomSelect 
                                options={ americaOptions }
                                value = { values.region }
                                onChange = { value => formik.setFieldValue('region', value.value) }
                            />
                        </>
                    }
                    {
                        values.continent === "europe" &&
                        <>
                            <h4>Region</h4>
                            <CustomSelect 
                                options={ europeOptions }
                                value = { values.region }
                                onChange = { value => formik.setFieldValue('region', value.value) }
                            />
                        </>
                    }
                    {
                        values.continent === "asian" &&
                        <>
                            <h4>Region</h4>
                            <CustomSelect 
                                options={ asianOptions }
                                value = { values.region }
                                onChange = { value => formik.setFieldValue('region', value.value) }
                            />
                        </>
                    }
                    {
                        values.continent === "oceania" &&
                        <>
                            <h4>Region</h4>
                            <CustomSelect 
                                options={ oceaniaOptions }
                                value = { values.region }
                                onChange = { value => formik.setFieldValue('region', value.value) }
                            />
                        </>
                    }
                    {
                        values.continent === "african" &&
                        <>
                            <h4>Region</h4>
                            <CustomSelect 
                                options={ africanOptions }
                                value = { values.region }
                                onChange = { value => formik.setFieldValue('region', value.value) }
                            />
                        </>
                    }
                    { errors.region && touched.region && <span className={ style.errorMessage }> { errors.region } </span> }
                </label>
            }
            
            <div className={ style.buttonContainer }> 
              <button type='submit'> Registrarme </button> 
            </div>
            <Link className={ style.registerLink } to="/login">Iniciar sesión</Link>
        </form>
    </main>
  )
}

export default Register