import React, { useEffect, useState } from 'react'
import "./Progresssidelay.css"

import Photo from "../../assets/photo.png"

import {useLocation, useNavigate} from "react-router-dom"

import useFullScreen from '../../hooks/useFullScreen' 

//? Redux stuff
import { useDispatch, useSelector } from 'react-redux'

//? the Redux Actions
import { setIsSIdeBar, update } from '../../features/viewSlice'
import { loginFailure, loginSuccess, logout } from '../../features/authSlice' // i can remove this
import { next, previous, setCurrentId, setCurrentSem, setModules, setSem1, setSem2 } from '../../features/modules' // Module slice
import { setCurrent as setCurrentColor } from '../../features/themeSlice' //! color theme
import { setCurrentQuestion } from '../../features/questionsSlice' // for when the sidebar turns to Qcm

//? custom Hooks
import useAuth from "../../hooks/useAuth"
import useAxios from '../../hooks/useAxios'
import useRanking from "../../hooks/useRanking"

let activeBtnIndex = 0
const ProgressSideLay = ({children}) => {
    const {auth,setAuth} = useAuth() // auth
    const fname = auth?.Fname // user first name

    /// axios and navigation
    const axios = useAxios()
    const location = useLocation()
    const navigate = useNavigate()
    
    const {ranking,getUserGlobalRanking} = useRanking()
    //? custom Hooks
    // full Screen hook
    const { isFullScreen, enterFullScreen, exitFullScreen } = useFullScreen();

    //? Redux
    const dispatch = useDispatch()
    const {title,subTitle,isQcm} = useSelector((state) => state.view) // view
    const theme = useSelector(state => state.theme) // theme/colors

    //! setting the auth infos by grabbing the user only if Id doesn't exist in auth
    useEffect(()=>{
        const getUserInfos = async() =>{
            try{
                const response = await axios.get("/auth/user")
                setAuth(prev => ({...prev,...response?.data?.user}))
            }
            catch (error){
                if(error?.response?.status === 401){
                    navigate("/signin",{state: {from:location},replace:true})
                }

            }
        }
        !auth?.Id && getUserInfos()  // only make a request if no Id or user Id changed
        // console.log('hello world')
    },[auth])

    useEffect(()=>{
        auth?.Id && auth?.accessToken && !ranking && getUserGlobalRanking(auth.Id,navigate,location)
    },[auth?.Id,auth?.accessToken,ranking])

    const  getInitials = (fullName) => {
        if (!fullName?.trim() ) {
          return "?";
        } else {
          const names = fullName.split(" ");
          const initials = names
            .map((name) => name.charAt(0).toUpperCase())
            .join("");
          return initials;
        }
      }
    const getSemester = (Year, semester) => {
        switch (Year) {
          case "FIRST":
            return semester;
          case "SECOND":
            return 2 + semester;
          case "THIRD":
            return 4 + semester;
          case "FOURTH":
            return 6 + semester;
          case "FIFTH":
            return 8 + semester;
          default:
            throw new Error("Invalid year");
        }
      };
// the part li i need nred liha lbal
    const modules = useSelector(state => state.module) 
    const currentSemester =  modules.currentSemester
    const [userSemester,setUserSemester] = useState(1)
    useEffect(()=>{
        if(auth?.Plan){
            setUserSemester(getSemester(auth?.Plan,currentSemester + 1))
        }
    },[auth,currentSemester,dispatch])


    useEffect(()=>{
        localStorage.setItem('currentSemester', currentSemester);
    },[currentSemester])

    //* this is the sidebar styles made dynamically
    const [hoveredBtnId, setHoveredBtnId] = useState(null);
    const [btns, setbtns] = useState([{ Id: -1, Icon: "Home", color:"PURPLE", isactive: false, Title: "Home" },])
    const [color, setColor] = useState(theme.Colors[btns[0].color].primary)
    
 
        useEffect(()=>{
            if(!auth?.Id){
                return
            } 
                // if(!isRendered ||){       
                        axios.get(`/questions/progress/stats/${auth?.Id}`)
                        .then(res =>{
                            const semester1 = res?.data?.semester1
                            const semester2 = res?.data?.semester2
                            if(semester1.length === 0 ){
                                const currentSem = 1
                                dispatch(setCurrentSem(currentSem))
                            }
                            dispatch(setSem1(semester1))
                            dispatch(setSem2(semester2))
                            if (currentSemester === 0){
                                setbtns([{ Id: -1, Icon: "Home", color:"PURPLE", isactive: false, Title: "Home" },...semester1])
                            }
                            else{
                                setbtns([{ Id: -1, Icon: "Home", color:"PURPLE", isactive: false, Title: "Home" },...semester2])
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            if(err?.response?.status === 401){
                                navigate("/signin",{state: {from:location},replace:true})
                            }
                        })
                    // }
          },[auth?.Id,auth?.Email,currentSemester,dispatch])



    useEffect(() => {
        setbtns(prevbtns => prevbtns.map((btn, index) => ({ ...btn, isactive: activeBtnIndex === index ? true : false })))
    }, [activeBtnIndex])

    // handling events 
    //! handling click button
    const handleBtnClick = (id) => {
        setbtns(prevBtns => prevBtns.map(btn => ({ ...btn, isactive: btn.id == id ? true : false })));
        setColor(prev => `${theme.Colors[btns[id].color].primary}`)
        activeBtnIndex = id
        if (id === 0){
            navigate("/dashboard")
        }
        else{
            dispatch(update({
                title:btns[id].Title,
                subTitle:"check the information and the qcms regarding this module",
                isQcm:false
            }))
            dispatch(setCurrentColor(btns[id].color))
            dispatch(setCurrentId(id - 1))
            navigate("/module")
        }
    }
    //! handling hover effects
    const handleBtnEnter = (id) => {
        setHoveredBtnId(id);
    };
    const handleBtnLeave = () => {
        setHoveredBtnId(null);
    };



// end the part li nred liha lbal

    //* this is the progressbar styles made dynamically
    const {currentQuestionIndex,Questions,mode, modeId} = useSelector(state => state.questions)
    const currentQuestion = Questions[currentQuestionIndex]


    const [questions, setQuestions] = useState([])   
    const [indexes, setIndexes] = useState([])   

    
// gotta fix this one    
    // useEffect(() => {
    //     if (isQcm) {
    //       axios
    //         .get(`/questions/progress/?modeId=${modeId}&mode=${mode}&userId=${userId}`)
    //         .then((res) => {
    //           setIndexes(res.data.map((progress) => progress.questionId));
    //           // Depending on your requirements, you can update 'questions' state here.
    //           // For example, if 'Questions' is an array of objects like [{Id: 1}, {Id: 2}, ...]:
    //           const updatedQuestions = Questions.map((question, index) => ({
    //             nb: index + 1,
    //             value: indexes.includes(question.Id),
    //           }));
    //           setQuestions(updatedQuestions);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //   }, [isQcm, modeId, mode, userId,currentQuestionIndex]);







    //! changing the sidebar whenever the color changes
    useEffect(() => {
        document.documentElement.style.setProperty("--scrollbar-thumb-color", theme.Colors[theme.Current].primary)
        document.documentElement.style.setProperty("--scrollbar-thumb-color--hover", `${theme.Colors[theme.Current].primary}ef`)
    }, [color])

    
    //! Hamburger start
    const [questionMenu, setQuestionMenu] = useState(false)
    const showHideQuestion = () => {
        setQuestionMenu(prev => !prev)
        setShowSideBar(prev => false)
    }
    //! Hamburger end

    //! Sidebar start
    const isSidebar = useSelector(state => state.view.isSidebar)
    const [showSideBar, setShowSideBar] = useState(isSidebar)
    const handleSidebar = () =>{
        setShowSideBar(prev => !prev)
        dispatch(setIsSIdeBar())
        setQuestionMenu(prev => false)
    }
    //! Sidebar end

    const findClosestParentId = (index) =>{
        const ParentId = Questions[index].ParentId
        if(ParentId === null){
            return Number(index)
        }
        else{
            const ParentIndex = Object.keys(Questions).find(key => Questions[key].Id === ParentId)
            return Number(ParentIndex)
        }
    }
    
    //! handling questionClick based on question Index
    const handleQuestionChange = (index) =>{
        const questionIndex = findClosestParentId(index)
        dispatch(setCurrentQuestion(questionIndex))
      
    }


    // logout
    const handleLogout = () =>{

        //clear modules
        axios.get("/auth/logout").then(
            res =>{
                dispatch(logout())
                setAuth({})
                dispatch(setSem1([]))
                dispatch(setSem2([]))
            }
        ).catch(
            err => {
        console.log(err)
            if(err?.response?.status === 401){
                navigate("/signin",{state: {from:location},replace:true})
            }
    }
        )
    }
    const handlePrevSem = () => {
        if (currentSemester === 1){
            navigate("/dashboard")
            dispatch(previous())
        }
    }
    const handleNextSem = () => {
        if (currentSemester === 0){
            navigate("/dashboard")
            dispatch(next())
        }
    }
    return (
        <div className='app__progressSideLay'>
            {showSideBar && (
                <div className="app__progressSideLay-sidebar" >
                    <div className="app__progressSideLay-sidebar_top">
                        <p style={{color: auth?.Subscription === "PLUS" 
                                                ? "#38194E"
                                                :  auth?.Subscription === "PAID"
                                                    ?  "#34495e"
                                                    :   "#3498db"}} onClick={handleSidebar} >S{userSemester}</p>
                        <div className='app__progressSideLay-sidebar_top-rank'> 
                            <span className="material-symbols-outlined">award_star</span>
                            <p>{!ranking ? "?/?" : currentSemester === 0 ? `${ranking.semOverAllRank.sem1.userRank}/${ranking.semOverAllRank.sem1.totalUsers}` : `${ranking.semOverAllRank.sem2.userRank}/${ranking.semOverAllRank.sem2.totalUsers}` }</p>

                        </div>
                    </div>


                    <div className="app__progressSideLay-sidebar_middle">

                        {btns.map((item,index) => {
                            const style = item.isactive
                                ? { backgroundColor: `${theme.Colors[item.color].primary}70`, color: theme.Colors[item.color].secondary }
                                : hoveredBtnId === index
                                ? { backgroundColor: `${theme.Colors[item.color].primary}70`, color: theme.Colors[item.color].secondary }
                                    : { backgroundColor: "#F8F8F8", color: "#78768D" };
                            return (
                                <div className="app__progressSideLay-sidebar_middle-link" style={style} key={item.Id} onMouseEnter={() => handleBtnEnter(index)} onMouseLeave={() => handleBtnLeave(index)} onClick={() => handleBtnClick(index)}>
                                    <span className={item.Id == -1 ? "material-symbols-rounded" : "material-symbols-outlined"} >{item.Icon}</span>
                                    <span className='app__progressSideLay-sidebar_middle-link_tooltip' style={{ backgroundColor: "white", color: theme.Colors[item.color].secondary, display: item?.Title ? "block" : "none" }}>{item?.Title }</span>
                                </div>
                            )
                        })}

                    </div>


                    <div className="app__progressSideLay-sidebar_bottom">
                        {
                            auth?.Role === "ADMIN"
                            &&
                            <span title='Admin' onClick={() => navigate("/admin/home")} className="material-symbols-rounded">shield_person</span>
                        }

                        <div  className="app__progressSideLay-sidebar_bottom-link">
                            <span title='Logout' className="material-symbols-rounded" onClick={handleLogout}>logout</span>
                            <span title='Full Screen' className="material-symbols-rounded" onClick={isFullScreen ? exitFullScreen : enterFullScreen}>{isFullScreen ? "close_fullscreen" : "fullscreen"}</span>
                        </div>
                        {
                            ((modules.sem1.length !== 0) && (modules.sem2.length !== 0)) && (
                                <div  className="app__progressSideLay-sidebar_bottom-toggle">
                                    <span title='left' className="material-symbols-rounded" style={{fontSize:"3rem",opacity: modules.currentSemester === 0 && "0.5"}} onClick={handlePrevSem}>chevron_left</span>
                                    <p>{modules.currentSemester + 1}</p>
                                    <span title='right' className="material-symbols-rounded" style={{fontSize:"3rem",opacity: modules.currentSemester === 1 && "0.5"}} onClick={handleNextSem}>chevron_right</span>
                                </div>
                            )
                        }

                    </div>
                </div>
            )}

             {/* CONTENT */}
            <div className="app__progressSideLay-content">
             {/* ProgressBar */}
                <div className="app__progressSideLay-content_progressbar">
                    <div className="app__progressSideLay-content_progressbar-left">

                        {!showSideBar &&(
                            
                        //!  hamburger Menu 
                        //? only show when sidebar isn't showing

                        <button className="app__progressSideLay-content_progressbar-left_return" onClick={handleSidebar}><span className="material-symbols-rounded" style={{ color: theme.Colors[theme.Current].primary }}>menu</span></button>
                        )}

                        {isQcm && (

                        //!  left Arrow 
                        //? only show when qcm mode

                        <button className="app__progressSideLay-content_progressbar-left_return" ><span className="material-symbols-rounded" style={{ color: theme.Colors[theme.Current].primary }} onClick={() => navigate('/module')}>arrow_back</span></button>
                        )}

                        <div className="app__progressSideLay-content_progressbar-left_infos">
                            <h3>{title}</h3>
                            <p>{subTitle}</p>
                        </div>

                    </div>

                    {isQcm && (

                        <div className="app__progressSideLay-content_progressbar-middle">

                            <div className="app__progressSideLay-content_progressbar-middle_btn"  onClick={showHideQuestion}>
                                <h1>{Number(currentQuestionIndex) + 1} - {Questions.length}</h1>
                                <span className="material-symbols-outlined" style={{ color: theme.Colors[theme.Current].primary }}>arrow_drop_down</span>
                            </div>


                            {questionMenu && (
                                <div className="app__progressSideLay-content_progressbar-middle_questions scale-up-center" style={{ scrollbarColor: theme.Colors[theme.Current].primary }}>

                                    {Questions.map((item, index) => {
                                        return (
                                            <div className={`app__progressSideLay-content_progressbar-middle_questions-question ${item.value ? "correct" : ""}`} key={index} onClick={() => handleQuestionChange(index)}>
                                                {index+1}
                                            </div>)
                                    })}

                                </div>
                            )}

                        </div>
                    )}

                    <div className="app__progressSideLay-content_progressbar-right">

                        <div className="app__progressSideLay-content_progressbar-right_rank" style={{ backgroundColor: theme.Colors[theme.Current].primary }}>
                            <span className="material-symbols-outlined">award_star</span>
                            <p>{!ranking ? "?/?" : currentSemester === 0 ? `${ranking.semOverAllRank.sem1.userRank}/${ranking.semOverAllRank.sem1.totalUsers}` : `${ranking.semOverAllRank.sem2.userRank}/${ranking.semOverAllRank.sem2.totalUsers}` }</p>
                        </div>

                        <div className="app__progressSideLay-content_progressbar-right_profile">

                            <div className="app__progressSideLay-content_progressbar-right_profile-nametitle">
                                <h3>hey, {fname}</h3>
                                <p>{!ranking ? "unknown" : currentSemester === 0 ? ranking.semOverAllTitle.sem1.title : ranking.semOverAllTitle.sem2.title }</p>
                            </div>
                            {/* todo i need to remove this Photo */}
                            <div className='image' style={{backgroundColor:theme.Colors[theme.Current].primary}}>{getInitials(auth?.FullName)}</div>

                        </div>

                    </div>
                


                </div>
                {children}






            </div>



        </div>
    )
}

export default ProgressSideLay