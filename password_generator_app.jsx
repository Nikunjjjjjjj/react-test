import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberallowed,setNumberallowed]= useState("False")
  const [charallowed,setCharallowed] = useState("False")
  const [password,setPassword] = useState("")

  const passwordref = useRef(null)

  const passwordgenerator = useCallback(() =>{
    let pass =""
    let string="qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"
    if(numberallowed){
      string += "1234567890";
    }
    if (charallowed){
      string +="!@#$%^&*(){}[]></,.;:+-*";
    }
    for (let i = 0; i <= length; i++) {
      let char=Math.floor(Math.random()*string.length+1)
      pass+= string.charAt(char)
    }
    setPassword(pass)
  },[length,numberallowed,charallowed,setPassword])

  const copytoclipboard = useCallback(() => {
    passwordref.current.select();
    //passwordref.current.setSelectionRange(0, 999);
    const button=document.getElementById("copy")
    button.style.backgroundColor = "orange";
            
            // After 2 seconds, revert back to blue
            setTimeout(() => {
                button.style.backgroundColor = "blue";
            }, 2000); 
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordgenerator()
  },[length,numberallowed,charallowed,passwordgenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-slate-600 text-orange-500">
      <h1 className="text-white text-center my-4">password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden md-4">
        <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordref}
          />
          <button 
          id="copy"
          onClick={copytoclipboard}
          className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0 ${isClicked ? bg-orange-500 : bg-blue-700}"
          >copy</button>

      </div>
      <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input
        type ="range"
        min={6}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={(e) => {
          setLength(e.target.value)
        }} 
        />
      <label>length:{length}</label>  
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberallowed}
          id ="numberInput"
          onChange={() =>{
            setNumberallowed((prev) => !prev);
          }}
          />
          <label htmlFor="numberInput">numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={charallowed}
          id="charInput"
          onChange={() => {
            setCharallowed((prev) => !prev);
          }}
      />
      <label htmlFor="charInput">Characters</label>
      </div>
    </div>
    </div>
  )
}

export default App
