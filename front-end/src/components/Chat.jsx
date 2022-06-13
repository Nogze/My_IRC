import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { socketContext } from '../context/socketContext'


export default function Chat({props}) {
    const socket = useContext(socketContext)
    const room = useParams().room
    const [currentMsg, setCurrentMsg] = useState('')

    const handleFormSubmit = event => {
        event.preventDefault()
        if (currentMsg.length > 0) {
            socket.emit('CHAT_MESSAGE', {text: currentMsg, room: room})
            setCurrentMsg('')
        }
    }

    const handleChange = event => {
        setCurrentMsg(event.target.value)
    }

    const handleKeyPress = event => {
        if (event.keyCode == 13 && event.ctrlKey == false) {
            event.preventDefault()
            if (currentMsg.length > 0) {
                socket.emit('CHAT_MESSAGE', {text: currentMsg, room: room})
                setCurrentMsg('')
            }
        }
        else if (event.keyCode == 13 && event.ctrlKey == true) {
            event.target.value += '\n'
        }
    }

    const handleMessageType = type => {
        switch(type) {
            case 'SERVER_MESSAGE_JOIN':
                return 'text-green-400'

            case 'SERVER_MESSAGE_LEAVE':
                return 'text-red-400'

            default:
                return 'text-white'
        }
    }

    useEffect(() => {
        var messagesLists = document.getElementById('messages')
        messagesLists.scrollTop = messagesLists.scrollHeight
    }, [props.msgHistory])

    return (
        <>
            <div id="messages" className='scroll-smooth h-90vh overflow-y-scroll'>
                <div className='sticky top-0 bg-neutral-800'>
                    <h1 className='text-3xl'>{room}</h1>
                </div>
                <ul>
                    {props.msgHistory.map((data, index) => {
                        return data.user?.username && (
                            <li className={'my-5 ' + handleMessageType(data.type)} key={index}>
                                <div className='flex hover:bg-neutral-900'>
                                    <img alt={`${data.user?.username}\'s avatar`} className='max-h-8 max-w-8 mr-2 rounded-full' src={data.user?.picture} />
                                    <h5 className='text-md font-bold text-center'>{data.user?.username}</h5>
                                    <p className='ml-2 break-words'>{data.text}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <form id='chatForm' autoComplete='off' onSubmit={handleFormSubmit} className='h-full'>
                <textarea className='px-1 bg-neutral-700 w-full resize-none rounded-md' value={currentMsg} onKeyDown={handleKeyPress} onChange={handleChange} />
                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 text-center mr-2 mb-2 w-24'>Send</button>
            </form>
        </>
    )
}