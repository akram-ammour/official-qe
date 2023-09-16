import React from 'react'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import {Home,Signin,Signup,Main,Module,Qcm,
  Edit,Signal,Users,HomeAdmin,Empty} from "./pages"
import "./App.css"


import axios from 'axios'
import { useSelector } from 'react-redux'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'
const App = () => {
  axios.defaults.withCredentials = true
  const { mode, modeId } = useSelector((state) => state.questions);
  const noCurrentQuestion = !mode && !modeId;
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
              
              
              {/* index page / home page */}
              <Route path='' index element={<Home/>}/>


              {/* sign in and signup pages */}
              <Route path='/signin' element={<Signin/>}/>

              <Route path='/signup' element={<Signup/>}/>



              {/* admin page where i have access to multiple stuff */}
              {/* <Route path='/admin'   element={<Admin/>}/>
              <Route path='/admin/add-exam'   element={<AddExam/>}/> */}
              <Route element={<PersistLogin/>}>

              {/* qcm page where i have access to all qmcs */}
              <Route element={<RequireAuth Role='USER'/>}>
                  <Route path='/dashboard' element={<Main/>}/>
                  <Route path='/module' element={<Module/>}/>
                  <Route path='/question' element={noCurrentQuestion ? <Navigate to={"/module"}/> : <Qcm/>}/>
                </Route>
                {/* kent dayr f module /module/ hwa w question*/}

                {/* admin page where i have access to all data*/}
                <Route element={<RequireAuth Role='ADMIN'/>}>
                  <Route path='/admin/home' element={<HomeAdmin/>} />
                  <Route path='/admin/edit' element={<Edit/>} />
                  <Route path='/admin/users'  element={<Users/>}/>
                  <Route path='/admin/signals'  element={<Signal/>}/>
                </Route>
              </Route>

              {/* made me have weird issues */}
              {/* <Route path='/test'  element={<Empty/>}/> */}
              
              
              
              
              
              
              
{/* solve the requireAuth for later */}
                {/* <Route path='/test' element={<Test/>}/>

              <Route element={<RequireAuth Role='ADMIN'/>}>
                <Route path='/admin/test' element={<Test/>}/>
              </Route> */}
              <Route path='*' element={<Home/>}/>




          </Routes>

        </BrowserRouter>
    </div>
  )
}

export default App