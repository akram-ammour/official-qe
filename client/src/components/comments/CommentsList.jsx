import  React from 'react'
import './comment.css'
import { useSelector } from 'react-redux'
import Comment from "./Comment"


const CommentsList = ( {onHide}) => {
  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current].primary 
  return (
    <div className='app__comments'>
        <div className="app__comments-top">
            <p>Forum</p>
            <span className="material-symbols-rounded"onClick={onHide} style={{color:currentColor}}>arrow_drop_down</span>
            <p>0 comments</p>
        </div>
        <div className="app__comments-comments">
          <Comment/>
        </div>
        <div className="app__comments-send">
          
        </div>
    </div>
  )
}

export default CommentsList