import { useState } from "react";
import { noteContext } from "./noteContext";

export const NoteState = (props) => {
    const host = 'http://localhost:5000';

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    //get all Note
    const getAllNotes = async () => {
        const url = host + '/api/notes/fetchallnotes';
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const noteJson = await res.json();
        setNotes(noteJson)
    }


    //Add a Note
    const addNote = async (title, description, tag) => {
        const url = host + '/api/notes/addnote';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const noteJson = await res.json();
        setNotes(notes.concat(noteJson))
    }

    //Delete Note
    const deleteNote = async (id) => {
        const url = host + '/api/notes/deletenote/' + id;
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        const url = host + '/api/notes/updateNote/' + id
        await fetch(url, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (const note of newNotes) {
            if (note._id === id) {
                note.title = title;
                note.description = description;
                note.tag = tag;
                break;
            }

        }
        setNotes(newNotes)

    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}