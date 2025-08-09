import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './notesSlice'

//load only notes slice from local storage
const loadState = () => {
    try{
        const loadedNote = localStorage.getItem('notesState');
        if(!loadedNote) return undefined;
        return {notes: JSON.parse(loadedNote)} // preloaded state must be an object matching reducers
    }catch(error){
        console.error('error in loading notes',error)
        return undefined
    }
}
//save only notes slice to local storage
const saveSate = (state: RootState['notes']) => {
    try{
        const newState = JSON.stringify(state)
        localStorage.setItem('notesState', newState)
    }catch(error){
        console.error('error in saving note',error)
    }
}

//redux store
export const store = configureStore({
    //key(state):value(function)
    reducer: {
        notes: notesReducer
    },
    preloadedState: typeof window !== 'undefined' ? loadState() : undefined 
})

//take notes from redux and save only notes slice
store.subscribe(()=> {
    if(typeof window !== 'undefined'){
        saveSate(store.getState().notes)
    }
})
//for typescript
export type RootState = ReturnType<typeof store.getState> //useSelectore for read
export type AppDispatch = typeof store.dispatch //update state