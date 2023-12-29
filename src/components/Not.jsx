import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const NotGate = ({ id, startConnection, completeConnection}) => {
  const [inputA, setInputA] = useState(0);
  const output = Number(!inputA);

  const toggleInputA = () => setInputA(inputA ? 0 : 1);

  const handleConnectionPointClick = (pointType) => {
    const pointId = `${id}-${pointType}`;
    console.log(pointId)
    if (pointType.includes('output')) {
      startConnection(pointId);
    } else {
      completeConnection(pointId);
    }
  };

  return (
    <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20,40 L 38,40 M 40,20 40,60 M 40,20 L 85,40 Q 100,40 85,40 L 40,59 M 85,40 L 100,40"
        stroke="black" fill="transparent" strokeWidth="2" />
      <g onClick={() => handleConnectionPointClick('input3')}>
        <circle cx="20" cy="40" r="20" fill="transparent" />
        <circle cx="20" cy="40" r="3" fill="black" />
      </g>
      <g onClick={() => handleConnectionPointClick('output')}>
        <circle cx="100" cy="40" r="20" fill="transparent" />
        <circle cx="100" cy="40" r="3" fill="black" />
      </g>
      <text x="5" y="43" fontSize="10" onClick={toggleInputA}>{inputA}</text>
      <text x="110" y="43" fontSize="10">{output.toString()}</text>
    </svg>
  );
};

export default NotGate;
