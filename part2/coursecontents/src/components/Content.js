import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({parts}) => {
    const contentParts = () => parts.map(val => <Part course={val.name} exercises={val.exercises} key={val.id}/>)
    return (
        <>
            {contentParts()}
            <Total exercises={parts}/>
        </>
    )
}

export default Content