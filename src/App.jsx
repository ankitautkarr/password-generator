import React, { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [charAllow, setCharAllow] = useState(false);
  const [numAllow, setnumAllow] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ASDFGHJKLQWERTYUIOPZXCVBNMasdfghjklqwertyuiopzxcvbnm';
    if (numAllow) {
      str += '1234567890';
    }

    if (charAllow) {
      str += '@#&*';
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, charAllow, passwordGenerator]);

  const passRef = useRef(null);

  const copyPass = () => {
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      {/* <div className="text-white font-bold">Rinal ❤️ Ankit</div> */}
      <div className="w-full max-w-md mx-auto shadow-md text-center rounded-lg px-4 my-8 text-orange-500 bg-gray-800 p-2">
        <h1 className="text-2xl text-center text-white p-4 m-2">
          {' '}
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-1">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passRef}
          />
          <button
            className="outline-none text-white bg-blue-700 text-blue px-3 py-0.5 shrink-0 font-bold hover:bg-orange-900"
            onClick={copyPass}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex text-sm gap-x-2 ">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
            <div className="flex items-center gap-x-1 ">
              <input
                type="checkbox"
                defaultChecked={numAllow}
                id="numberInput"
                onChange={() => {
                  setnumAllow((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>

            <div className="flex items-center gap-x-1 ">
              <input
                type="checkbox"
                defaultChecked={charAllow}
                id="charInput"
                onChange={() => {
                  setCharAllow((prevChar) => !prevChar);
                }}
              />
              <label>Charecters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
