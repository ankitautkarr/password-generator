import { useState, useCallback, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAlow, setNumAlow] = useState(false);
  const [charAlow, setCharAlow] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAlow) {
      str += '0123456789';
    }

    if (charAlow) {
      str += '!@#$%^&*(){}';
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAlow, charAlow, setPassword]);

  const passCopy = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(2, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const notify = () => {
    toast('Password copied to clipboard successfully!');
  };

  useEffect(() => {
    passGenerator();
  }, [length, numAlow, charAlow, passGenerator]);
  return (
    <>
      <ToastContainer />
      <h1 className="text-sm p-4 text-black">Rinal Love Ankit</h1>

      <div className="w-full max-w-md mx-auto shadow-md text-center rounded-lg px-4 my-8 text-orange-500 bg-gray-800 p-2">
        <h1 className="text-2xl text-center text-white p-4 m-2">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-1">
          <input
            type="text"
            value={password}
            placeholder="Passowrd"
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none text-white bg-blue-700 text-blue px-3 py-0.5 shrink-0 font-bold hover:bg-orange-900"
            onClick={() => {
              passCopy();
              notify();
            }}
          >
            Copy
          </button>
        </div>
        <div>
          <div className="flex text-sm gap-x-2 ">
            <div className="flex items-center gap-x-1"></div>
            <input
              type="range"
              min={8}
              max={14}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
            <div className="flex items-center gap-x-1 "></div>
            <input
              type="checkbox"
              defaultChecked={numAlow}
              id="numInput"
              onChange={() => {
                setNumAlow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>

            <div className="flex items-center gap-x-1 ">
              <input
                type="checkbox"
                defaultChecked={charAlow}
                id="charInput"
                onChange={() => {
                  setCharAlow((prevChar) => !prevChar);
                }}
              />
              <label htmlFor="charInput">Charecters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
