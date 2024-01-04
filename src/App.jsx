import { useState } from 'react';
import './index.css';
import OrGate from './components/Or';
import AndGate from './components/And';
import NotGate from './components/Not';
import NandGate from './components/Nand';
import NorGate from './components/Nor';
import XorGate from './components/Xor';
import XnorGate from './components/Xnor';
import Buffer from './components/Buffer';

function App() {
  const [components, setComponents] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [connections, setConnections] = useState([]);
  const [currentConnection, setCurrentConnection] = useState(null);
  const [offset] = useState({ x: 250, y: 30 });
  const [showInstructions, setShowInstructions] = useState(false);

  const startConnection = (pointId) => {
    const existingConnectionIndex = connections.findIndex(c => c.fromId === pointId);

    if (existingConnectionIndex !== -1) {
      setConnections(prev => prev.filter((_, index) => index !== existingConnectionIndex));
    } else {
      setCurrentConnection({ fromId: pointId });
    }
  };

  const completeConnection = (pointId) => {
    console.log("Completando conexión hacia:", pointId);
  
    if (currentConnection) {
      // Verificar si el input ya tiene una conexión
      const existingConnection = connections.find(c => c.toId === pointId);
      if (existingConnection) {
        console.log("Este input ya está conectado.");
        setCurrentConnection(null);
        return; // No permitir múltiples conexiones al mismo input
      }
  
      // Crear nueva conexión
      setConnections(prev => [...prev, { ...currentConnection, toId: pointId }]);
      setCurrentConnection(null);
    }
  };

  const addComponent = (type) => {
    setComponents(prev => [...prev, { type, id: `${type}-${Date.now()}`, x: 100, y: 100 }]);
  };

  const startDragging = (id) => {
    setDragging(id);
  };

  const onDrag = (e) => {
    if (!dragging) return;
  
    const index = components.findIndex(comp => comp.id === dragging);
    if (index < 0) return;
  
    const updatedComponents = [...components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    };
  
    setComponents(updatedComponents);
  };

  const stopDragging = () => {
    setDragging(null);
  };

  function calculateConnectionCoordinates(connection, components) {
    const fromGateId = connection.fromId.split('-').slice(0, -1).join('-');
    const toGateId = connection.toId.split('-').slice(0, -1).join('-');
  
    const fromGate = components.find(comp => comp.id === fromGateId);
    const toGate = components.find(comp => comp.id === toGateId);
  
    if (!fromGate || !toGate) {
      console.log("No se encontraron compuertas correspondientes");
      return { x1: 0, y1: 0, x2: 0, y2: 0 };
    }

    const gateWidth = 120;
    const gateHeight = 60;

    const x1 = fromGate.x + gateWidth;
    const y1 = fromGate.y + gateHeight / 2;

    let x2, y2;
    if (connection.toId.endsWith('input')) {
      x2 = toGate.x;
      y2 = toGate.y + gateHeight / 2;
    } else if (connection.toId.endsWith('input2')) {
      x2 = toGate.x;
      y2 = toGate.y + gateHeight / 2 + 20; 
    } else if (connection.toId.endsWith('input3')) {
      x2 = toGate.x;
      y2 = toGate.y + gateHeight / 2 + 10; 
    }

    const adjustedX1 = x1 - 20; 
    const adjustedY1 = y1 + 10; 
    const adjustedX2 = x2 + 20;
    const adjustedY2 = y2;

    return { x1: adjustedX1, y1: adjustedY1, x2: adjustedX2, y2: adjustedY2 };
  }


  const renderConnections = () => {
    return connections.map((connection, index) => {
      const { x1, y1, x2, y2 } = calculateConnectionCoordinates(connection, components);

      console.log(`Dibujando línea: ${x1}, ${y1}, ${x2}, ${y2}`);

      return (
        <line
          key={index}
          x1={x1} y1={y1}
          x2={x2} y2={y2}
          stroke="black"
          strokeWidth={2}
        />
      );
    });
  };

  return (
    <div className="flex h-screen border-4 border-gray-300">
      <div className="w-48 border-r-2 border-gray-200 p-2 text-center bg-pastel-blue">
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('OR')}><OrGate /></button>
        <br></br>
        <label className="cursor-pointer">OR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('AND')}><AndGate /></button>
        <br></br>
        <label className="cursor-pointer">AND</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('NOT')}><NotGate /></button>
        <br></br>
        <label className="cursor-pointer">NOT</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('NAND')}><NandGate /></button>
        <br></br>
        <label className="cursor-pointer">NAND</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('NOR')}><NorGate /></button>
        <br></br>
        <label className="cursor-pointer">NOR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('XOR')}><XorGate /></button>
        <br></br>
        <label className="cursor-pointer">XOR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('XNOR')}><XnorGate /></button>
        <br></br>
        <label className="cursor-pointer">XNOR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('BUFFER')}><Buffer /></button>
        <br></br>
        <label className="cursor-pointer">Buffer</label>
        <br></br>
      </div>
      <div className="flex-grow relative cursor-pointer bg-dotted bg-gray-100 border-dashed border-2 border-gray-300" onMouseMove={onDrag} onMouseUp={stopDragging}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {renderConnections()}
        </svg>
        <button
          className="cursor-pointer font-semibold fixed top-6 right-6 h-12 w-12 rounded-full hover:bg-cyan-500 bg-cyan-700 text-white flex items-center justify-center text-2xl shadow-lg"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions && (
            <div className="text-slate-700 fixed top-16 right-4 p-4 border w-1/3 bg-white shadow-lg">
              <p>Instrucciones</p>
            </div>
          )}
          i
        </button>
        {components.map(comp => {
          const Component = comp.type === 'OR' ? OrGate : comp.type === 'AND' ? AndGate : comp.type === 'NOT' ? NotGate : comp.type === 'NAND' ? NandGate : comp.type === 'NOR' ? NorGate :comp.type === 'XOR' ? XorGate: comp.type === 'XNOR' ? XnorGate : Buffer ;
          return (
            <div
              key={comp.id}
              className="absolute"
              style={{ left: comp.x, top: comp.y }}
              onMouseDown={() => startDragging(comp.id)}
            >
              <Component
                id={comp.id}
                startConnection={startConnection}
                completeConnection={completeConnection}
              />
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default App;
