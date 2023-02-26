import React,{useContext,useState} from 'react';
import noteContext from '../context/noteContext';

const Noteitem = (props) => {
    const { note } = props;
    const context=  useContext( noteContext);
  const {deleteNote} = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                <div className='d-flex align-items-center' >
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square ms-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                   
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem