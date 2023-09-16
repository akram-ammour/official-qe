import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "../hooks/useAuth";

const Loading = ({ setIsLoading }) => {
    // Set up a state variable to track the loading status and remaining time
    const {setAuth} = useAuth()
    const [loadingTimeout, setLoadingTimeout] = useState(null);
    const [remainingTime, setRemainingTime] = useState(5);

    useEffect(() => {
        // Set a timeout to decrement remaining time and change isLoading to true after 40 seconds
        const timeout = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
            console.log(remainingTime)
        }, 1000); // 1 second interval

        // Store the timeout ID in the state variable
        setLoadingTimeout(timeout);

        // Cleanup the interval and timeout when the component unmounts or when isLoading changes
        return () => {
            clearInterval(timeout);
            clearTimeout(timeout);
        };
    }, []);
    // }, [setIsLoading, loadingTimeout]);

    useEffect(() => {
        if (remainingTime === 0) {
            setAuth({})
            setIsLoading(false);
            clearInterval(loadingTimeout);
            clearTimeout(loadingTimeout);
        }
    }, [remainingTime, setIsLoading, loadingTimeout]);

    return (
        <>
            <p>Loading...</p>
            <p>Remaining Time: {remainingTime} seconds</p>
        </>
    );
};



const PersistLogin = () => {
    const [isLoading,setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const {auth} = useAuth()
    useEffect(()=>{
        const verifyRefreshToken = async () =>{
            try {
                await refresh()
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
            finally{
                setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    },[])


    return (
    <>
    {isLoading ? <Loading setIsLoading={setIsLoading}/>
                : <Outlet/>}
    </>
  )
}

export default PersistLogin
// import { Outlet } from "react-router-dom";
// import { useState,useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import useAuth from "../hooks/useAuth";


// const PersistLogin = () => {
//     const [isLoading,setIsLoading] = useState(true)
//     const refresh = useRefreshToken()
//     const {auth} = useAuth()
//     useEffect(()=>{
//         const verifyRefreshToken = async () =>{
//             try {
//                 await refresh()
//                 setIsLoading(false)
//             } catch (error) {
//                 console.error(error)
//                 setIsLoading(false)
//             }
//             finally{
//                 setIsLoading(false)
//             }
//         }
//         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
//     },[])

//     return (
//     <>
//     {isLoading ? <p>isLoading....</p>
//                 : <Outlet/>}
//     </>
//   )
// }

// export default PersistLogin