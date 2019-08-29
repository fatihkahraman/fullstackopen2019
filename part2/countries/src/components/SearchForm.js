import React from 'react';

const SearchForm = ({text, value, onChange}) => {
    return (
        <>
            {text} <input value={value} onChange={onChange}/>
        </>
    )
}

export default SearchForm