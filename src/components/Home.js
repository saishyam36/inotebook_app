import React, { useContext } from 'react'
import { noteContext } from '../context/noteContext'
import Notes from './Notes';


export const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <Notes />
    </div>
  )
}

export default Home

