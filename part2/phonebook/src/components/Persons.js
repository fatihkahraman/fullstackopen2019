import React from 'react';
import PersonDetail from './PersonDetail';

const Persons = ({persons}) => {
    const row = () => persons.map(p => <PersonDetail name={p.name} number={p.number} key={p.name}/>)

    return (
        <div>
            {row()}
        </div>
    )
}

export default Persons