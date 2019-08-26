import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, counter}) => {
    if(text !== 'positive') {
        return(
            <>
                <tr>
                    <td>{text}</td>
                    <td>{counter}</td>
                </tr>
            </>
        )
    } else {
        return(
            <>
                <tr>
                    <td>{text}</td>
                    <td>{counter} %</td>
                </tr>
            </>
        )
    }
}

const Simple = ({text}) => <p>{text}</p> 

const Statistics = (props) => {
    const good = props.content[0]
    const neutral = props.content[1]
    const bad = props.content[2]

    if(good === 0 && neutral === 0 && bad === 0) {
        return (
            <>
                <Simple text='no feedback given'/>
            </>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic text='good' counter={good}/>
                    <Statistic text='neutral' counter={neutral}/>
                    <Statistic text='bad' counter={bad}/>
                    <Statistic text='all' counter={good+neutral+bad}/>
                    <Statistic text='average' counter={(good+(bad*(-1)))/(good+neutral+bad)}/>
                    <Statistic text='positive' counter={(good/(good+neutral+bad))*100}/>
                </tbody>
            </table>
        )
    }

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
            <Statistics content={[good, neutral, bad]}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));