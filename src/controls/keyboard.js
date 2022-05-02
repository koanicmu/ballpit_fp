import { useEffect } from 'react'
import {  useStore } from '../store'


export function Keyboard() {
  const [reset, boost, boosting] = useStore(({ boosting, actions: { reset, boost }}) => [reset])

  useEffect(() => {
    const downHandler = ({ key, target }) => {
      if(key === "r"){
          reset()
      }
    }
    const upHandler = ({ key, target }) => {


     
    }
    window.addEventListener('keydown', downHandler, { passive: true })
    window.addEventListener('keyup', upHandler, { passive: true })

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [reset])

  return null
}
