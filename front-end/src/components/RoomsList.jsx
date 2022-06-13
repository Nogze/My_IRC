import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { socketContext } from '../context/socketContext'
import plusBtn from '../assets/icons/plus.png'

export default function RoomsList() {

	const currentURL = useParams().username
	const socket = useContext(socketContext)
	const [roomsList, setRoomsList] = useState([])

	useEffect(() => {
		socket.on('FETCH_ROOMS_LIST', data => {
			setRoomsList(data)
		})
	})

	const handleClick = () => {
			let iWidth = 0
			const input = document.getElementById('createServerInput')
			input.style.display = 'inline'
		// function grow setI() {
		// 	const callback = () => {
		// 		iWidth++
		// 		input.style.width = `${iWidth}%`
		// 	}
		// 	callback()
		// 	window.setInterval(callback, 50)
		// }

		const grow = setInterval(function fn() {
			console.log(iWidth)
			iWidth++
			input.style.width = `${iWidth * 0.5}vw`
			if (iWidth == 20) {
				clearInterval(grow)
			}
		}, 10);

		// if (input.classList.contains('hidden')) {
		// 	input.animate([
		// 		{
		// 			width: '0%',
		// 			display: 'none'
		// 		},
		// 		{
		// 			width: '100%',
		// 			display: 'block'
		// 		}
		// 	], {
		// 		duration: 200,
		// 		iterations: 1
		// 	})
		// }
	}

	return (
		<div className='h-screen bg-neutral-800'>
			<h3 className='text-4xl'>Rooms</h3>
			<div>
				<input id='createServerInput' type='text' className='bg-neutral-700 rounded-md mx-2 hidden'/>
				<button onClick={handleClick}>
					<img className='h-4 w-4' src={plusBtn}/>
				</button>
			</div>
			{roomsList.map((room, index) => {
				return (
					<Link to={"/" + currentURL + "/" + room} key={index}>
							<p className='text-lg hover:text-stone-400' key={index}>{room}</p>
					</Link>
				)
			})}
		</div>
	)
}