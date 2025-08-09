'use client'

import { RootState } from "@/store";
import { AddNote, EditNote, RemoveNote } from "@/store/notesSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NotesPage(){
    const [newNoteText, setNewNoteText] = useState<string>('');
    const [editNoteText, setEditNoteText] = useState<string>('');
    const [editNoteId, setEditNoteId] = useState<string>('');
    const [openEditMode, setOpenEditMode] = useState<boolean>(false);

    const notes = useSelector((state: RootState) => state.notes.notes) //read from redux slice (take data)
    const dispatch = useDispatch() //use actions from redux

    const handleAddNewNotes = () => {
        if(!newNoteText.trim()) return
        dispatch(AddNote(newNoteText))
        setNewNoteText('')
    }

    const handleRemoveNote = (id: string) => {
        dispatch(RemoveNote(id))
    }

    const handleOpenEditMode = (id: string) => {
        setEditNoteId(id)
        setOpenEditMode(true)
    }
    const handleEditNote = (id: string) => {
        dispatch(EditNote({index: id, text: editNoteText}))
        setOpenEditMode(false)
    }

    return(
        <div>
            <input 
                type="text" 
                value={newNoteText} 
                onChange={e => setNewNoteText(e.target.value)}
            />
            <button onClick={handleAddNewNotes}>
                Add Note
            </button>
            {
                notes.map((note, index) => (
                    <div key={index}>
                        {                            
                            <>
                            <p>
                                {note.text}
                            </p>
                            <button onClick={() => handleRemoveNote(note.id)}>
                                delete
                            </button>
                            <button onClick={() => handleOpenEditMode(note.id)}>
                                edit
                            </button>
                            </>
                            
                        }
                        {
                        editNoteId === note.id && openEditMode &&
                            <>
                            <input
                            type="text"
                            value={editNoteText}
                            onChange={e => setEditNoteText(e.target.value)}
                            />
                            <button onClick={() => handleEditNote(note.id)}>
                                save the edit
                            </button>
                            </>
                        }
                    </div>
                ))
            }
        </div>
    )
}