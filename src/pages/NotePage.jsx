import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const NotePage = () => {
   const {id}  = useParams()
   const [note, setNote] = useState(null);

   useEffect(() => {
        fetchSingleNoteById();
   }, [id])

   const fetchSingleNoteById = async () => {
    const response = await fetch(`/api/v1/notes/${id}/`)
    const data = await response.json()
    setNote(data)
    console.log("Single Note: ", data)
   }

    return (
        <div>
            <h3>{note?.body}</h3>
        </div>
    )
}

export default NotePage
