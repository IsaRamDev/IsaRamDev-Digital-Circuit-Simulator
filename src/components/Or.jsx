import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const OrGate = ({ id, startConnection, completeConnection, onOutputChange}) => {
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const output = inputA || inputB;

  const handleInputChangeA = (e) => {
    const value = e.target.value;
    if (value === '0' || value === '1') {
      setInputA(Number(value));
    }
  };

  useEffect(() => {
    if (typeof onOutputChange === 'function') {
      onOutputChange(output, inputA, inputB);
    }
  }, [output, inputA, inputB]);

  const handleInputChangeB = (e) => {
    const value = e.target.value;
    if (value === '0' || value === '1') {
      setInputB(Number(value));
    }
  };

  const handleConnectionPointClick = (pointType) => {
    const pointId = `${id}-${pointType}`;
    if (pointType.includes('output')) {
      startConnection(pointId);
    } else {
      completeConnection(pointId);
    }
  };

  return (
    <div>
      <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20,30 L 38,30 M 20,50 L 38,50 M 30,20 Q 50,40 30,60 M 30,20 L 70,20 Q 100,40 70,59 L 30,59 M 85,40 L 100,40"
          stroke="black" fill="transparent" strokeWidth="2" />
          <g onClick={() => handleConnectionPointClick('input')}>
            <circle cx="20" cy="30" r="20" fill="transparent" />
            <circle cx="20" cy="30" r="3" fill="black" />
          </g>
          <g onClick={() => handleConnectionPointClick('input2')}>
            <circle cx="20" cy="50" r="20" fill="transparent" />
            <circle cx="20" cy="50" r="3" fill="black" />
          </g>
          <g onClick={() => handleConnectionPointClick('output')}>
            <circle cx="100" cy="40" r="20" fill="transparent" />
            <circle cx="100" cy="40" r="3" fill="black" />
          </g>
        <text x="5" y="33" fontSize="10" onChange={handleInputChangeA} maxLength={1} >{inputA}</text>
        <text x="5" y="53" fontSize="10" onChange={handleInputChangeB} maxLength={1} >{inputB}</text>
        <text x="110" y="43" fontSize="10">{output}</text>
      </svg>
      <input 
        type="text" 
        value={inputA} 
        onChange={handleInputChangeA} 
        maxLength={1} 
        style={{ width: '20px', margin: '5px' }} 
      />
      <input 
        type="text" 
        value={inputB} 
        onChange={handleInputChangeB} 
        maxLength={1} 
        style={{ width: '20px', margin: '5px' }} 
      />
      <div>Output: {output}</div>
    </div>
  );
};

export default OrGate;
