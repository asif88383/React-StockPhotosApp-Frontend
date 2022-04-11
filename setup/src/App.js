import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'

import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

// remove current scroll code
// set default page to 1
// setup two useEffects
// don't run second on initial render
// check for query value
// if page 1 fetch images
// otherwise setPage(1)
// fix scroll functionality

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const mounted = useRef(false)
  const [newImages, setNewImages] = useState(false)

  const fetchImages = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()  
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhotos, ...data.results]  // spread operator
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setNewImages(false)
      setLoading(false)
    } catch (error) {
      setNewImages(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])  

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImages) return;  // if newImages is false, return
    if (loading) return;  // if loading is true, return
    setPage((oldPage) => oldPage + 1); // set page to oldPage + 1
  }, [newImages]) // if newImages is true, run fetchImages

  const event = () => { // event handler
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {   // if scroll is at bottom
      setNewImages(true)  // set newImages to true
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)  // add event listener
    return () => {
      window.removeEventListener('scroll', event) // remove event listener  when component is unmounted (cleanup)
    }
  }, [])  // empty array means run only once

  const handleSubmit = (e) => { // event handler
    e.preventDefault()  // prevent default behavior
    if (!query) return;  // if query is empty, return
    if (page === 1) {   // if page is 1, fetch images
      fetchImages();
    }
    setPage(1); // set page to 1
  } // end handleSubmit  


  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='Search Images'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='form-input'
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
