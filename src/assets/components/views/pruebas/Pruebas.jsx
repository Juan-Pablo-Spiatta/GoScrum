import React, { useState, useEffect } from 'react'
import style from './Pruebas.module.css'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

import Tasks from '../../tasks/Tasks'

function Pruebas() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      
    
      return () => {
        
      }
    }, [])
    
  return (
    <div className={ style.container }>

        <Skeleton height={100} width={300} />
        <Tasks />
    </div>
  )
}

export default Pruebas