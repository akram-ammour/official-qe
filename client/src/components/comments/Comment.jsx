import React, { useState } from 'react'
import './comment.css'
import { toast } from "react-toastify";

const Comment = () => {
    const [liked, setLiked] = useState(false)
    const [Likes, setLikes] = useState(0)

    const likeComment = () =>{
        if(liked){
            setLiked(false)
            setLikes(prev => prev - 1)
        }
        else{
            setLiked(true)
            setLikes(prev => prev + 1) 
        }
        toast.info("coming soon")
    }
    const editComment = () =>{
        toast.info("coming soon")
    }

    const deleteComment = () =>{
        toast.info("coming soon")

    }


  return (
    <div className='app__comment'>
        <div className="infos">
            <div className="username">Admin</div>
            <div className="date">sep 15 2022, 20:37 PM</div>
        </div>
        <div className="comment">
            Coming Soon
        </div>
        <div className="reaction">
            <div className='icon-number'>
                <span className='material-symbols-outlined' style={{fontVariationSettings: liked ? "'FILL' 1" : null}} onClick={likeComment}>favorite</span>
                {Likes !== 0 ? (<p>{Likes}</p>) : (<></>)}
            </div>
            <div className="icon" onClick={editComment}>
                <span className="material-symbols-outlined">edit_square</span>
            </div>
            <div className="icon" onClick={deleteComment}>
                <span class="material-symbols-outlined">delete</span>
            </div>  
        </div>
    </div>
  )
}

export default Comment