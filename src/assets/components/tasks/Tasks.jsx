// Libraries
import React from 'react'
import Skeleton from 'react-loading-skeleton'
// Style
import 'react-loading-skeleton/dist/skeleton.css'
import style from './Tasks.module.css'



function Tasks({data = {}, loading}) {
    const text = String(data.description)
    return (
        <li className={ style.taskCard }>
            <div className={ style.titleContainer }>
                { loading ? <Skeleton /> : <h3 className={ style.title }>{data.title}</h3>}
                <button className={ style.deleteButton }>x</button>
            </div>
            <h5 className={ style.date }>Fecha de creación: {data.date}</h5>
            <h6 className={ style.owner }>Creada por: {data.owner}</h6>
            <div className={ style.statusContainer }>
                <button className={ style.state }>{data.state}</button>
                <button className={ style.priority }>{data.priority}</button>
            </div>
            <p className={ style.description }>
                 {text.substring(0, 120)} ...
            </p>
        </li>
    )
}

export default Tasks