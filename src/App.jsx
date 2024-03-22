import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);


  const generatePassword = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let spc = "!@#$%^&*()_+";

    if (numberAllowed) {
      str += num;
    }
    if (charAllowed) {
      str += spc;
    }

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
   
  }, [length, numberAllowed, charAllowed])

  useEffect(() =>{
    generatePassword();
  }, [length, numberAllowed, charAllowed])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    alert("Copied to clipboard!");
    passRef.current.select();
  }

  const passRef = useRef(null)


  return (
    <div className="bg-gray-800 w-full max-w-screen-md mx-auto shadow-md text-orange-500 px-4 py-3 rounded-lg my-8">
      <h1 className=" text-center text-white my-3 "> Password Generator </h1>
      <div className="flex shadow rounded-lg overflow-hidden">
        <input
          type="text"
          value={password}
          placeholder="password"
          ref={passRef}
          readOnly
          className="outline-none w-full py-1 px-3"
        />

        <button onClick={copyToClipboard} className="bg-blue-700 text-white px-3 py-0.5 outline-none shrink-0 ">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-4 py-6">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <label htmlFor="lenght">Lenght: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            id="numbers"
          />

          <label htmlFor="numbers">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            id="char"
          />

          <label htmlFor="char">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
