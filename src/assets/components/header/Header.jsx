import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
// Style
import style from './Header.module.css'

function Header() {
  const navigate = useNavigate()

  const handleLogOut = () => {
    if( sessionStorage.getItem("logged")){
      Swal.fire({
        title: 'Estas seguro que quieres cerrar sesión?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Cerrar Sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.removeItem('logged')
          sessionStorage.removeItem('teamID')
          sessionStorage.removeItem('userName')
          sessionStorage.removeItem('teamTasks')
          navigate('/GoScrum/login')
        }
      })
    }
  }

  return (
    <div className={ style.container }>
      <div className={ style.logoContainer }>
        <h1 className={ style.leftSide }> Go </h1>
        <h1 className={ style.rightSide }> Scrum </h1>
      </div>
      <button className={ style.logOutButton } onClick={ handleLogOut } > x </button>
    </div>
  )
}

export default Header