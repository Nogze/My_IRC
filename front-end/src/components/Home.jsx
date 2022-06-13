import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { socketContext } from '../context/socketContext'
import RoomsList from './RoomsList'

export default function Home() {

    const socket = useContext(socketContext)
    const username = useParams().username

    useEffect(() => {
        socket.emit('HOME_USER_CONNECT', username)
    }, [])

    socket
    .on('IRC_USERS_LIST', users => {
        console.log(users)
    })
    .on('IRC_ROOMS_LIST', rooms => {
        console.log(rooms)
    })

    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='col-span-2'>
                    <RoomsList/>
                </div>
                <div className='col-span-4'>
                    <h1 className='text-4xl'>Hi {username} !</h1>
                    <h2>Welcome to My_IRC</h2>
                    <p>Explications sur le fonctionnement :
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas vitae delectus eius temporibus error voluptatibus autem nisi, voluptate consectetur quod modi minima in cupiditate optio laudantium asperiores cumque ab.</p>
                </div>
            </div>

        </>

    )
}
