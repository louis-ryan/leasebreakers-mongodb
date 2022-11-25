import { useState, useEffect } from "react";
import io from 'Socket.IO-client'
import NoteComments from "./NoteComments";

let socket

const Comments = ({ conversation, setConversation, user, comment, handleChange, handleSubmit }) => {

  const [instantMessage, setInstantMessage] = useState({})
  const [typing, setTyping] = useState({})


  /**
   * On instant message set conversation to show messages
   */
  useEffect(() => {
    if (!instantMessage.comment) return
    if (!conversation) return
    const newComments = [
      ...conversation.comments, {
        comment: instantMessage.comment,
        timeOfComment: Date.now(),
        posterId: instantMessage.user,
        posterName: instantMessage.userName,
        commentIsNew: false,
      }
    ]

    setConversation({
      ...conversation,
      comments: newComments
    })

    document.getElementsByName('comment')[0].value = "";
    document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
  }, [instantMessage])


  /**
   * Get websocket info
   */
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket')
      socket = io()

      socket.on('connect', () => {
        console.log('connected')
      })

      socket.on('update-input', msg => {
        if (!msg) return
        const msgArr = msg.split('#')
        const msgObj = {
          comment: msgArr[0],
          user: msgArr[1],
          userName: msgArr[2]
        }
        setInstantMessage(msgObj)
      })

      socket.on('typing', msg => {
        if (!msg) return
        const msgArr = msg.split('#')
        const msgObj = {
          typing: (msgArr[0] === 'true' ? true : false),
          user: msgArr[1],
          userName: msgArr[2],
          picture: msgArr[3]
        }
        setTyping(msgObj)
      })
    }
    socketInitializer()
  }, [])


  /**
   * If comment string is not empty, show b client that a is typing
   */
  useEffect(() => {
    if (comment.length > 0) {
      socket.emit('typing', `true#${user.sub}#${user.given_name}#${user.picture}`)
    } else {
      setTimeout(() => {
        socket.emit('typing', `false`)
      }, 2000)
    }
  }, [comment])


  return (
    <>
      <form>
        <div
          id="scroll-window"
          style={{ height: "calc(100vh - 400px)", overflowY: "scroll", padding: "8px" }}
        >
          <NoteComments
            conversation={conversation}
            user={user}
            typing={typing}

          />
        </div>

        <div style={{ position: "absolute", bottom: "0px", width: "100%", maxWidth: "600px", padding: "8px", backgroundColor: "white" }}>
          <div style={{ height: "24px" }} />

          <input
            id="messageBox"
            placeholder='Comment'
            value={comment ? comment : ''}
            name='comment'
            onChange={(e) => handleChange(e.target.value)}
            style={{ width: "100%", fontSize: "16px", padding: "32px 8px" }}
          />

          <div style={{ height: "24px" }} />

          <div
            id="send"
            className="button primary"
            onClick={() => {
              if (comment.length === 0) return

              socket.emit('input-change', `${comment}#${user.sub}#${user.given_name}`)
              socket.emit('typing', `false#${user.sub}`)
              handleSubmit(comment)

              document.getElementsByName('comment')[0].value = "";
              document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
            }}
          >
            Comment
          </div>
        </div>
      </form>
    </>
  )
}

export default Comments;