import { useState } from 'react';
import Draggable from './Draggable';

// eslint-disable-next-line react/prop-types
const OrGate = ({ id }) => {
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const output = inputA || inputB;

  const toggleInputA = () => setInputA(inputA ? 0 : 1);
  const toggleInputB = () => setInputB(inputB ? 0 : 1);

  // Función para manejar el inicio del arrastre
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/reactflow', id); // Establecer el ID de la compuerta OR
    e.dataTransfer.effectAllowed = 'move';
  };

  // Envolver el SVG en un componente Draggable
  return (
    <Draggable onDragStart={handleDragStart}>
      <div style={{ userSelect: 'none', cursor: 'grab' }}>
        <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20,30 L 38,30 M 20,50 L 38,50 M 30,20 Q 50,40 30,60 M 30,20 L 70,20 Q 100,40 70,59 L 30,59 M 85,40 L 100,40"
            stroke="black" fill="transparent" strokeWidth="2" />
          <circle cx="20" cy="30" r="3" fill="black" />
          <circle cx="20" cy="50" r="3" fill="black" />
          <circle cx="100" cy="40" r="3" fill={output ? "black" : "transparent"} />
          <text x="5" y="33" fontSize="10" onClick={toggleInputA}>{inputA}</text>
          <text x="5" y="53" fontSize="10" onClick={toggleInputB}>{inputB}</text>
          <text x="110" y="43" fontSize="10">{output}</text>
        </svg>
      </div>
    </Draggable>
  );
};

export default OrGate;
