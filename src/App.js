
import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'
import Pills from './pills';

function App() {

  const [search, setsearch] = useState('');
  const [suggestion, setsuggestion] = useState([])
  const [addedsuggestion, setaddedsuggestion] = useState([]);
  const [email, setemail] = useState(new Set())
  const active = useRef()

  useEffect(() => {
    if (search.length > 0) {
      axios(`https://dummyjson.com/users/search?q=${search}`).then((res) => { setsuggestion(res.data) })
    }
    else setsuggestion([])
  }, [search])

  const handleAdd = (sug) => {
    setaddedsuggestion([...addedsuggestion, sug])
    setemail(new Set([...email, sug.email]))
    setsearch('')
    active.current.focus()
  }

  const handledelete = (sug) => {
    const deleted = addedsuggestion.filter((fillters) => {
      return fillters.id !== sug.id
    })
    setaddedsuggestion(deleted);


    const updatetedemail = email;
    updatetedemail.delete(sug.email);
    setemail(updatetedemail)
    active.current.focus()
  }

  return (
    <div className="App">
      <div className='applist'>
      <div className='addlist'> {addedsuggestion.map((sug) => (
        <Pills
          onClick={() => handledelete(sug)}
          key={sug.email}
          firstname={sug.firstName} />))}
      </div>

      <div>
        <input
          ref={active}
          type='text'
          value={search}
          onChange={e => setsearch(e.target.value)}>
        </input>

        {suggestion.users?.map((sug) => (
          !email.has(sug.email) &&
          <div
            key={sug.email}
            onClick={() => handleAdd(sug)}> {sug.firstName} </div>
        )
        )}
      </div>
      </div>
    </div>
  );
}

export default App;
