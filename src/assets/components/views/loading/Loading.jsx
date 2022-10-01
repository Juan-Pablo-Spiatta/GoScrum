import React from 'react'

// Style
import style from './Loading.module.css'

function Loading() {
  return (
    <div className={ style.container }>
        <div className={ style.loading }></div>
        Cargando...
    </div>
  )
}

export default Loading