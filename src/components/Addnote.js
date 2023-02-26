import React,{useContext,useState} from 'react';
import noteContext from '../context/noteContext';


const Addnote = () => {
    const context=  useContext( noteContext);
  const {addNote} = context;
 const[note, setNote] = useState({title: "",description:"",tag: " default"})
  const onChange=(e)=>{
   setNote({...note,[e.target.name]: e.target.value})
  }
  const handleClick=(e)=>{
    e.preventDefault();
   addNote(note.title,note.description,note.tag);
  }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                </form>
            </div>
            
        </div>
    )
}

export default Addnote