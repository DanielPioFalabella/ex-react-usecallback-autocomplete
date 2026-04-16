import { useEffect, useState, useCallback } from "react"

const App = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const debounce = (callback, delay) => {
    let timeout
    return(value) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(value);
      }, delay)
    }
  }
  console.log(suggestions)

  const fetchData = useCallback((search) => {
    if(search.trim() === "") {
      setSuggestions([])
      return 
    }
    
    fetch(`http://localhost:3333/products?search=${search}`)
    .then(res => res.json())
    .then(data => setSuggestions(data))
    .catch(err => console.error(err))
  }, [])

  const debouncedFetch = useCallback(
    debounce(fetchData, 700), [fetchData]
  )

  useEffect(() => {
    debouncedFetch(search)
  }, [search, debouncedFetch])

  return (
    <>
      <h2>app</h2>

      <input type="text" 
      placeholder="cerca qualcosa"
      value={search}
      onChange={(e) => setSearch(e.target.value)}/>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((s) => (
            <p key={s.id}>{s.name}</p>
          ))}
        </div>
      )}
      </>
  )
}

export default App