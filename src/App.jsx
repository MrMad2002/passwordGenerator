import { useState } from 'react'
import { LuRefreshCw } from "react-icons/lu";
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react';

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(6)
  const [number, numAllowedOrNot] = useState(false)
  const [character, charAllowedOrNot] = useState(false)

  const pswrdRef = useRef(null)

  const passwordChanger = useCallback(()=> {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let paswrd = '';
    if(number) str += '1234567890';
    if(character) str += '~!@#$%^&*()`<>.,[]{}';

    for(let i=1; i <= length; i++){
       let char = Math.floor(Math.random() * str.length + 1)
       paswrd += str.charAt(char)
    }

    setPassword(paswrd)
  },[length, number, character, setPassword])

  useEffect(() => passwordChanger(), [length, number, character, setPassword])

  const copiedToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    pswrdRef.current?.select()
    pswrdRef.current?.setSelectionRange(0, 100)
  }


  return (
    <>
      <div className='w-2/3 justify-self-center font-mono my-10 text-yellow-100
      py-0.5 px-3 bg-slate-700 rounded-lg'
      style={{backgroundImage:'url("https://blog.1password.com/articles/brute-force-protect/header.png")'}}>
        <p className='text-2xl h-3 text-yellow-100 mt-2 mb-8 text-center'>
          <b>**PASSWORD GENERATOR**</b></p> <hr />
        <div className='flex shadow rounded-e-lg mb-4 mt-4' >
          <span className='flex relative w-full'>
          <input type='text' 
          className='font-bold cursor-not-allowed text-2xl px-3 text-gray-950 py-2 outline-none rounded-l-lg border-none overflow-hidden
           w-full shadow-sm bg-slate-150'
          value={password}
          placeholder='Password'
          readOnly
          ref={pswrdRef}
          onChange={() => setPassword}
          name='pswrd'></input>
          <button className="absolute justify-center right-0 h-full w-12 border-none
           bg-transparent"
          onClick={() => passwordChanger()}>  
          <LuRefreshCw className='text-black m-2'/>
          </button>
          </span>
          <button 
          className='bg-cyan-700 outline-none rounded-r-lg border-none
           overflow-hidden py-1 px-3 active:bg-cyan-800 font-bold'
           onClick={() => copiedToClipboard()}>
          Copy </button>
        </div>
        <div className=' flex justify-evenly mb-2 text-xl'>
          <span>
          <input type='range' id='lengthLabel'
          max={100} min={6}
          onChange={(e) => setLength(e.target.value)}
          className='w-72'></input>
          <label htmlFor='lengthLabel' className='text-white'> Length:{length} </label>
          </span>
          <span>
          <input type='checkbox' id='numberBox' 
          onChange={()=> numAllowedOrNot((prev) => !prev)}></input>
          <label htmlFor='numberBox' className='text-white'> Number </label>
          </span>
          <span>
          <input type='checkbox' id='charBox'
          onChange={()=> charAllowedOrNot((prev) => !prev)}></input>
          <label htmlFor='charBox' className='text-white'> Character </label>
          </span>

        </div>
      </div>
    </>
  )
}

export default App
