import React from 'react'

export default function UsersList({props}) {

    return (
        <div className='h-screen'>
            <h3>Users</h3>
            <ul className='max-h-[90vh] overflow-y-auto'>
                {props.data && props.data.map((user, index) => {
                    return (
                        <li className='flex border-[0.1]  rounded-md m-1' key={index}>
                            <img className='h-12 w-12 rounded-md' alt={user.username + "\'s avatar"} src={user.picture}/>
                            <p className='text-md align-middle'>{user.username}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
