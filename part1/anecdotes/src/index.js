import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({text}) => <p>{text}</p>

const Vote = ({votes, selected}) => {
    return (
        <>
            <p>has {votes[selected]} votes</p>
        </>
    )
}

const Heading = ({text}) => <h1>{text}</h1>

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
    const max = points.indexOf(Math.max(...points));

    const handleRandom = () => {
        const rand = Math.floor(Math.random() * (5 - 0 + 1)) + 0
        setSelected(rand)
    }

    const handleVote = (selected) => {
        const copy = [...points]
        copy[selected] += 1
        setPoints([...copy])
    }

    return (
      <>
        <Heading text='Anecdote of the day'/>
        <Anecdote text={props.anecdotes[selected]}/>
        <Vote votes={points} selected={selected}/>
        <Button onClick={() => handleVote(selected)} text='vote'/>
        <Button onClick={() => handleRandom()} text='next anecdote'/>
        <Heading text='Anecdote with the most votes'/>
        <Anecdote text={props.anecdotes[max]}/>
      </>
    )
}
  
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)