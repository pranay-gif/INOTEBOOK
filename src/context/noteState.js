import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial =[
        {
           
     "_id": "63f5c1137be708314a714545",
    "user": "63e7be1d81684aadb2b132e6",
    "title": "my title3",
    "description": "please wake up early3",
    "tag": "personal",
    "__v": 0

        }
]
const[notes,setnotes]= useState(notesInitial);
return(
    <NoteContext.Provider value={{notes,setnotes}}>
        {props.children}
    </NoteContext.Provider>
)


}
export default NoteState;