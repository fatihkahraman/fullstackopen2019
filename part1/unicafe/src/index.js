import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Content = ({text, counter}) => <p>{text} {counter}</p>

const Positive = (props) => {
    const good = props.counter[0]
    const neutral = props.counter[1]
    const bad = props.counter[2]
    let pos = (good/(good+neutral+bad))*100

    if(isNaN(pos)) {
        pos = 0
    }

    return (
        <p>{props.text} {pos} %</p>
    )
}

const Average = (props) => {
    const good = props.counter[0]
    const neutral = props.counter[1]
    const bad = props.counter[2]
    let avg = (good+(bad*(-1)))/(good+neutral+bad)

    if(isNaN(avg)) {
        avg = 0
    }

    return (
        <p>{props.text} {avg}</p>
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
            <Content text='all' counter={good+neutral+bad}/>
            <Average text='average' counter={[good,neutral,bad]}/>
            <Positive text='positive' counter={[good,neutral,bad]}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));