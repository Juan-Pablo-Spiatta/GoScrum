// Libraries
import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
// Components
import Login from './assets/components/views/login/Login.jsx'
import Register from './assets/components/views/register/Register.jsx'
import Home from './assets/components/views/home/Home.jsx'
import Loading from './assets/components/views/loading/Loading.jsx'
import Pruebas from './assets/components/views/pruebas/Pruebas.jsx'
import Header from './assets/components/header/Header.jsx'
// Lazy Imports
const Error404 = lazy( () => import('./assets/components/views/error404/Error404.jsx'))
// Style
import './App.css'

const RequireAuth = ({ children }) => {
  if(!localStorage.getItem('logged')){
    return <Navigate to="/login" replace={true} />
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
          <Route path="/" element={ 
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <RequireAuth>
                <Home /> 
              </RequireAuth>
            </motion.div>
          } />
          <Route path="/pruebas" element={ 
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <RequireAuth>
                <Pruebas /> 
              </RequireAuth>
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <Login /> 
            </motion.div>
          }/>
          <Route path="/register" element={ 
            <motion.div className='page' initial='out' animate='in' exit='out' variants={ pageTransition } > 
              <Register /> 
            </motion.div> 
          }/>
          <Route path="*" element={ 
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
