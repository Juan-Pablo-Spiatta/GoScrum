// Libraries
import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
// Components
import Login from './assets/components/views/login/Login.jsx'
import Register from './assets/components/views/register/Register.jsx'
import Home from './assets/components/views/home/Home.jsx'
import Loading from './assets/components/views/loading/Loading.jsx'
import EditTask from './assets/components/views/editTask/EditTask.jsx'
import Header from './assets/components/header/Header.jsx'
import Probando from '../../probando/src/Probando.jsx' 
// Lazy Imports
const Error404 = lazy( () => import('./assets/components/views/error404/Error404.jsx'))
// Style
import './App.css'

const RequireAuth = ({ children }) => {
  if(!sessionStorage.getItem('logged')){
    return <Navigate to="/GoScrum/login" replace={true} />
  } else{
    return children
  } 
}

const pageTransition = {
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  },
}
function App() {
  const location = useLocation()
  return (
    <>
      <Header />

      <AnimatePresence>
        <Routes location={ location } key={ location.pathname }>
          <Route path="/GoScrum/" element={ 
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <RequireAuth>
                <Home /> 
              </RequireAuth>
            </motion.div>
          } />
          <Route path="/GoScrum/login" element={
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <Login /> 
            </motion.div>
          }/>
          <Route path="/GoScrum/register" element={ 
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <Register /> 
            </motion.div> 
          }/>
          <Route path="/GoScrum/task/edit" element={ 
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <EditTask />
            </motion.div> 
          }/>
          <Route path="/GoScrum/*" element={ 
            <Suspense fallback={ 
              <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } >
                <Loading /> 
              </motion.div>
            }>
              <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
                <Error404 />
              </motion.div> 
            </Suspense> 
          }/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
