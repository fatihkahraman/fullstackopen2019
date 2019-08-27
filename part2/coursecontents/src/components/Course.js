import React from 'react';
import Header from './Header';
import Content from './Content';
import Subheader from './Subheader';

const Course = ({courses}) => {
    return (
        <>
            <Header course='Web Development curriculum'/>
            <Subheader course={courses[0].name}/>
            <Content parts={courses[0].parts}/>
            <Subheader course={courses[1].name}/>
            <Content parts={courses[1].parts}/>
        </>
    )
}

export default Course