import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

const Content = (props) => {
    return (
        <p>{props.courseName} {props.exercises}</p>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.exercises}</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
  
    return (
      <>
        <Header title={course}/>
        <Content courseName={part1} exercises={exercises1}/>
        <Content courseName={part2} exercises={exercises2}/>
        <Content courseName={part3} exercises={exercises3}/>
        <Total exercises={exercises1+exercises2+exercises3}/>
      </>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
