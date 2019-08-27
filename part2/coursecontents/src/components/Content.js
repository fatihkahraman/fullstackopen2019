import React from 'react';
import Part from './Part';

const Content = (props) => {
    return (
        <>
            <Part course={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part course={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part course={props.parts[2].name} exercises={props.parts[2].exercises} />
            <Part course='Number of exercises' exercises={props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}/>
        </>
    )
}

export default Content