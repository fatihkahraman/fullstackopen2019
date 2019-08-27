import React from 'react'; 

const Total = ({exercises}) => {
    const arr = exercises.map(val => val.exercises)
    const sum = arr.reduce((sum, index) => sum += index)

    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

export default Total