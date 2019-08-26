import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Content = ({text, counter}) => {
    console.log(text, counter);
    return (
        <p>{text} {counter}</p>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good+1)
    const handleNeutral = () => setNeutral(neutral+1)
    const handleBad = () => setBad(bad+1)

    return (
        <>
            <Header title='give feedback'/>
            <Button onClick={handleGood} text='good'/>
            <Button onClick={handleNeutral} text='neutral'/>
            <Button onClick={handleBad} text='bad'/>
            <Header title='statistics'/>
            <Content text='good' counter={good}/>
            <Content text='neutral' counter={neutral}/>
            <Content text='bad' counter={bad}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));