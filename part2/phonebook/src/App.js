import React, {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonDetail from './components/PersonDetail';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ allPersons, setAllPersons ] = useState([])
  const [ message, setMessage ] = useState(null)
  const [ color, setColor ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
        setAllPersons(data)
      })
  },[])

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

    const stringAllPersons = allPersons.map(p => p.name)  // Array of Strings containing only Person names

    /* Checks if inserted name exists in persons array; adds Person to person and allPerson array if not already in phonebook, else alerts message */
    if(stringAllPersons.indexOf(newPerson.name) < 0) {
      personService
        .create(newPerson)
        .then(data => {
          setAllPersons(allPersons.concat(data))
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setColor('green')
          setMessage(`Added ${data.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(stringAllPersons.indexOf(newPerson.name)+1, newPerson)
          .then(() => {
            personService
              .getAll()
              .then(data => {
                console.log(data);
                setAllPersons(data)
                setPersons(data)
                setNewName('')
                setNewNumber('')
              })
          })
          .catch(error => {
            setColor('red')
            setMessage(`Information of ${newPerson.name} has already been removed from server`)
            setTimeout(() => {
            setMessage(null)
          }, 3000)
          })
      }
    }
  }

  const deletePerson = (name, id) => {
    if(window.confirm(`Delete ${name} ?`)) {
        personService
            .deletes(id)
            .then(() => {
              personService
                .getAll()
                .then(data => {
                  setAllPersons(data)
                  setPersons(data)
                })
            })
        
    }
}

  const row = () => persons.map(p => <PersonDetail name={p.name} number={p.number} deletePerson={() => deletePerson(p.name, p.id)} key={p.id}/>)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <div>
        <Filter text='filter shown with' value={search} onChange={handleSearchChange}/>
      </div>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      {row()}
    </div>
  )
}

export default App