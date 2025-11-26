const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () =>{
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('Failed to fatch anecdotes!')
    }

    return await response.json()
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdote = async (content) => {
    const response = await fetch(baseUrl, {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({content, id: getId(), votes: 0})

    })

    

    if(!response.ok){
        throw new Error('Fail to create a new note')
    }

    return await response.json()
}

const updateAnecdote = async (updatedAnecdote) => {
    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updatedAnecdote)
    })

    if(!response.ok){
        throw new Error('Fail to create a new note')
    }

    return await response.json()
}

export default {getAll, createAnecdote, updateAnecdote}