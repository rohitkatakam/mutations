import './App.css';
import React from 'react';
import { useState } from 'react';
import Output from './components/Output';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [inp1, setInp1] = useState('');
  const [inp2, setInp2] = useState('');

  const handleClick = () => {
    setSubmitted(true);
  }

  const handleChange1 = event => {
    setInp1(event.target.value);
  }

  const handleChange2 = event => {
    setInp2(event.target.value);
  }

  return (
    <div className="grid place-items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid place-items-center w-fit">
        <h1 className="text-blue-500 font-semibold">Input nucleotide sequences (RNA or DNA) to analyze mutations</h1>
        <br></br>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange1} placeholder="Before mutation" />
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange2} placeholder="After mutation" />
        <br></br>
        <button className="text-align-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleClick}>Find mutation</button>
        <br></br>
        <Output sub={submitted} before={inp1} after={inp2} />
      </div>
    </div>
  )
}

export default App;
