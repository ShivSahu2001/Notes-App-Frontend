import { useEffect } from "react";
import { useState } from "react";
import ListItem from "../components/ListItem";


const NotesListPage = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
            getNotes()
    }, [])

    const getNotes = async () => {
        const response = await fetch("/api/v1/notes/")
        const data = await response.json()
        setNotes(data)
        console.log("Data: ", data);
    }

    return (
        <div>
        <div className="notes-list">
            {
                notes?.map((note) => (
                    <ListItem key={note.id} note={note} />
                ))
            }
        </div>
        </div>
    )
}

export default NotesListPage
