import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { socketContext, callSocket } from './context/socketContext'
import Form from './components/Form'
import Home from './components/Home'
import ChatWindow from './components/ChatWindow'
import './App.css'
import './index.css'


export default function App() {

    return (
        <socketContext.Provider value={callSocket}>
                <BrowserRouter>
                    <div className='App bg-neutral-800'>
                        <Routes>
                            <Route path='/' element={<Form />} />
                            <Route path='/:username' element={<Home />} />
                            <Route path='/:username/:room' element={<ChatWindow />} />
                        </Routes>
                    </div>
                </BrowserRouter>
        </socketContext.Provider>
    )
}
