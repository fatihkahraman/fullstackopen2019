import React, {useState} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ allPersons, setAllPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)

    const arr = allPersons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    
    setPersons(arr)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    let alert = false         // Alert flag
    let copy = persons        // Contains all Persons
    let copyAll = allPersons  // Only contains Persons to show
    const stringAllPersons = allPersons.map(p => p.name)  // Array of Strings containing only Person names


    /* Checks if inserted name exists in persons array; adds Person to person array if not already in phonebook, else alerts message */
    if(stringAllPersons.indexOf(newPerson.name) < 0) {
      copy = persons.concat(newPerson)
      copy = copy.filter(p => p.name !== '')
    } else {
      alert = true
      window.alert(`${newName} is already added to phonebook`)
    }

    /* Checks if inserted name exists in allPersons array; adds Person to allPerson array if not already in phonebook, else alerts message */
    if(stringAllPersons.indexOf(newPerson.name) < 0) {
      if(!alert) {
        copyAll = allPersons.concat(newPerson)
        copyAll = copyAll.filter(p => p.name !== '')
      }
    } else if(!alert){
      window.alert(`${newName} is already added to phonebook`)
    }

    // ---- Outdated+buggy ----
    //
    // // New object-array with new person
    // const tmpp = persons.concat(newPerson)

    // // Filters empty strings
    // const tmp = tmpp.filter(p => p.name !== '')

    // // This is not an object-array, simply strings with names
    // const namesArr = tmp.map(p => p.name)

    // // Filtering unique names; namesArr.indexOf checks for duplicates
    // const uniq = tmp.filter((person, index) => {
    //   index++;
    //   if(namesArr.indexOf(person.name, index) < 0){
    //     return true
    //   } else {
    //     // window.alert(`${newName} is already added to phonebook`)
    //     return false
    //   }
    // })

    setPersons(copy)
    setAllPersons(copyAll)
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter text='filter shown with' value={search} onChange={handleSearchChange}/>
      </div>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons}/>
    </div>
  )
}

export default App