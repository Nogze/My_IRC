import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import RoomsList from './RoomsList'
import UsersList from './UsersList'
import Chat from './Chat'
import { socketContext } from '../context/socketContext'


export default function ChatWindow() {

	const [usersList, setUsersList] = useState([])
	const [msgHistory, setMsgHistory] = useState([])

	const socket = useContext(socketContext)
	const username = useParams().username
	const room = useParams().room

	useEffect(() => {
        socket.on('CHAT_MESSAGE', data => {
            setMsgHistory([...msgHistory, data])
        })
	})

	useEffect(() => {
		if (!socket.connected) {
			console.log('pas co rabane');
			socket.connect()
		}

		socket.emit('ROOM_USER_CONNECT', {
			'username': username,
			'room': room
		})

		socket.on('ROOM_USERS_LIST', data => setUsersList({...usersList, data}))

		socket.on('ROOM_UPDATE_DATA', data => {
			setUsersList({...usersList, data})
		})

		return () => {
			socket.disconnect()
			setMsgHistory([])
		  }
	}, [room])

	return (
		<div className='grid grid-cols-12'>
			<div className='col-span-2'>
				<RoomsList />
			</div>
			<div className='col-span-8'>
				<Chat props={{usersList, msgHistory}}/>
			</div>
			<div className='col-span-2'>
				<UsersList props={usersList} />
			</div>
		</div>
	)
}
