import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationActions'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      state.push(action.payload)
    },
    voteAnecdote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)

      if(anecdoteToChange){
        anecdoteToChange.votes +=1
      }
    },

    setAnecdotes(state, action){
      return action.payload
    },

    updateAnecdote(state, action){
      const updateAnecdote = action.payload
      return state.map(anecdote => anecdote.id === updateAnecdote.id ? updateAnecdote : anecdote)
    }
  }
})

const {createAnecdote, setAnecdotes, voteAnecdote, updateAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const createAnecdoteWithNotification = (content) => {
  return async (dispatch) => {
    try {
      await dispatch(appendAnecdote(content))
      dispatch(showNotification(`You created: "${content}"`, 5))
    } catch (error) {
      dispatch(showNotification(`Error creating anecdote: ${error.message}`, 10))
    }
  }
}

export const voteAnecdoteInBackend = (anecdote) => {
  return async (dispatch) => {
    try {
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      
      const savedAnecdote = await anecdoteService.updateAnecdote(updatedAnecdote)
      
      dispatch(updateAnecdote(savedAnecdote))
      dispatch(showNotification(`You voted for: "${anecdote.content}"`, 5))
    } catch (error) {
      dispatch(showNotification(`Error voting: ${error.message}`, 10))
    }
  }
}

export const voteAnecdoteWithNotification = (anecdote) => {
  return async (dispatch) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`You voted for: "${anecdote.content}"`, 5))
  }
}


export default anecdoteSlice.reducer