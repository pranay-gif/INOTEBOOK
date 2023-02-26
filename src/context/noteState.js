import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:2000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const getNotes = async() => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: { 'content-Type': 'application/json' ,
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlN2JlMWQ4MTY4NGFhZGIyYjEzMmU2In0sImlhdCI6MTY3NjEzMTg2OX0.YQ9vezws6bJqeqNx6IsDff8dMEJorUcv5kIMmUQJOqw"
    },

           
        });

        const json= response.json();
        setNotes(json)
        console.log(notes);

    }
    
    
    //add note
    const addNote = async(title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' ,
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlN2JlMWQ4MTY4NGFhZGIyYjEzMmU2In0sImlhdCI6MTY3NjEzMTg2OX0.YQ9vezws6bJqeqNx6IsDff8dMEJorUcv5kIMmUQJOqw"
    },

            body: JSON.stringify({title,description,tag})
        });
        //const json= response.json();
        const note = {

            "_id": "63f5c1137be708314a55714547",
            "user": "63e7be1d81684aadb552b132e6",
            "title": title,
            "description": description,
            "tag": tag,
            "__v": 0
        };
        setNotes(notes.concat(note))

    }
    //delete note
    const deleteNote = (id) => {
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);

    }
    //edit note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenode/${id}`, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' ,
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlN2JlMWQ4MTY4NGFhZGIyYjEzMmU2In0sImlhdCI6MTY3NjEzMTg2OX0.YQ9vezws6bJqeqNx6IsDff8dMEJorUcv5kIMmUQJOqw"
    },

            body: JSON.stringify({title,description,tag})
        });
        const json= response.json();
    
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;

        }


    }
}
console.log(notes)
    return (
        <NoteContext.Provider value={{ notes , addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )


}
export default NoteState;