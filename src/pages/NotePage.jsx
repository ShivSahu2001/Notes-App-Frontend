import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import  { ReactComponent as ArrowLeft} from "../assets/arrow-left.svg"

const NotePage = () => {
   const {id}  = useParams()
   const navigate = useNavigate()
   const [note, setNote] = useState(null);

   useEffect(() => {
        fetchSingleNoteById();
   }, [id])

   const fetchSingleNoteById = async () => {
    if(id === "new") return;

    const response = await fetch(`/api/v1/notes/${id}/`)
    const data = await response.json()
    setNote(data)
    console.log("Single Note: ", data)
   }

   function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var csrftoken = readCookie('csrftoken');

    const createNote = async() => {
        fetch(`/api/v1/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'X-CSRFToken':  csrftoken
            },
            body: JSON.stringify(note)    
        })
    }

   const updateNote = async () => {
     fetch(`/api/v1/notes/${id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'X-CSRFToken':  csrftoken
        },
        body: JSON.stringify(note)
    })

   }


   const deleteNote = async() => {
        fetch(`/api/v1/notes/${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'X-CSRFToken':  csrftoken
            },
        })
   }

   const handleSubmit = () => {
        // console.log("Note: ", note)
        if (id !== "new" && note.body === "") {
            deleteNote()
        } 
        else if(id !== "new") {
            updateNote()
        }
        else if(id === "new" && note.body !== null)
        {
            createNote()
        }
        navigate("/");
   }

   const handleDeleteSubmit = () => {
    deleteNote();
    navigate("/");
   }

   const handleChange = (value) => {
        setNote(note => ({...note, 'body': value}))
        console.log("Handle Change: ", note)
   }

    return (
        <div className="note">
        <div className="note-header">
        <h3>
            <ArrowLeft onClick={handleSubmit} />
           
        </h3>
        {
            id !== "new" ? (

            <button onClick={handleDeleteSubmit}>Delete</button>
            ) : (

            <button onClick={handleSubmit}>Done</button>
            )
        }
       
        </div>

       
            <textarea onChange={(e) => handleChange(e.target.value)} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
