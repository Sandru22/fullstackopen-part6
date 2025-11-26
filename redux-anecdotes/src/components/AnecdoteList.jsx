import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteInBackend } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filter = state.filter ? state.filter.toLowerCase() : ''
        const allAnecdotes = state.anecdotes

        if(filter === 'all' || !filter){
            return allAnecdotes
        }

        return allAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdoteInBackend(anecdote))
    }

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {sortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList