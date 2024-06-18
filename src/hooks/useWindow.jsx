'use client'

const { useState, useEffect } = require("react")

const useWindow = () => {
    const [dimentions, setDimentions] = useState({height:0,width:0})

    const resize = () => {
      setDimentions({
          height:window.innerHeight,
          width:window.innerWidth
        })
    }

    useEffect(() => {
      resize()
      window.addEventListener('resize',resize)
      return () => {
          window.removeEventListener('resize',resize)
      }
    }, [])
    return dimentions
}

export default useWindow