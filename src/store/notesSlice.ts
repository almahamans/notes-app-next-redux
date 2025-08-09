import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//shape of a single note
export interface Note {
    id: string;
    text: string;
}
//shape of whole state
interface NoteState {
    notes: Note[]
}
//start point for slice
const initialState: NoteState = {
    notes: []
}

const notesSlice = createSlice({
    name: 'notes', //name of the slice and what will call by
    initialState, //state...
    reducers: {
        //actions(functions)
        AddNote: (state, action: PayloadAction<string>) => {
            const newNote: Note = {
                id: Date.now().toString(), //auto id
                text: action.payload
            }
            state.notes.push(newNote) //update state
        },

        RemoveNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload)
        },

        EditNote: (state, action: PayloadAction<{index: string, text:string}>) => {
            const noteObject = state.notes.find(note => note.id === action.payload.index)
            if(noteObject){
                noteObject.text = action.payload.text
            }
        }
    }
}) 
//export actions so can call them
export const {AddNote, RemoveNote, EditNote} = notesSlice.actions
//export reducer so store can use it
export default notesSlice.reducer