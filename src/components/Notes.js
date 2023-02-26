import React ,{useContext, useEffect , useState} from 'react'
import noteContext from '../context/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';


const Notes = () => {
  const context=  useContext( noteContext);
  const {notes,getNotes} = context;
  console.log(notes)
  const [fetchedNotes, setFetchedNotes] = useState([]);
  
  useEffect(()=>{
    getNotes();
    setFetchedNotes(notes);
  },[])
  return (
    <>
    <Addnote/>
    
    <div className='row my-3'>
      <h2>Your notes</h2>
       {fetchedNotes.map((note)=>{
        return <Noteitem id={note._id} note={note}/>
      })} 
    </div>
    </>
  )
}

export default Notes
