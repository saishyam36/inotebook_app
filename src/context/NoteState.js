import { useState } from "react";
import { noteContext } from "./noteContext";

export const NoteState = (props) => {

    const notesInitial =[
        {
          "_id": "672e398827a9294c6df214d8",
          "user": "672d233a0f2b4e5fa84e17e2",
          "title": "Shyam daily",
          "description": "I am updating notes",
          "tag": "personal",
          "date": "2024-11-08T16:17:12.117Z",
          "__v": 0
        },
        {
          "_id": "673c9e65e508b682e942de7b",
          "user": "672d233a0f2b4e5fa84e17e2",
          "title": "Deelip daily",
          "description": "I am creating new notes",
          "tag": "personal",
          "date": "2024-11-19T14:19:17.498Z",
          "__v": 0
        }, {
            "_id": "673c9e65e508b682e942de7b",
            "user": "672d233a0f2b4e5fa84e17e2",
            "title": "daily",
            "description": "I am creating new notes",
            "tag": "personal",
            "date": "2024-11-19T14:19:17.498Z",
            "__v": 0
          }, {
            "_id": "673c9e65e508b682e942de7b",
            "user": "672d233a0f2b4e5fa84e17e2",
            "title": "2 daily",
            "description": "I am creating new notes",
            "tag": "personal",
            "date": "2024-11-19T14:19:17.498Z",
            "__v": 0
          }
      ];

    const [notes, setNotes] = useState(notesInitial);


    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}