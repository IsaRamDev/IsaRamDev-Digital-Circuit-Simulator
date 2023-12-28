import { useState } from 'react';
import OrGate from './components/Or';
import AndGate from './components/And';

function App() {
  const [components, setComponents] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [connections, setConnections] = useState([]); // Asegúrate de tener esto
  const [currentConnection, setCurrentConnection] = useState(null);
  const [offset] = useState({ x: 250, y: 30 });

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
    const fromGate = components.find(comp => comp.id === connection.fromId);
    const toGate = components.find(comp => comp.id === connection.toId);

    if (!fromGate || !toGate) {
      console.log("No se encontraron compuertas correspondientes");
      return { x1: 0, y1: 0, x2: 0, y2: 0 };
    }

    const gateWidth = 120;
    const gateHeight = 60;

    const x1 = fromGate.x + gateWidth;
    const y1 = fromGate.y + gateHeight / 2;

    const x2 = toGate.x;
    const y2 = toGate.y + gateHeight / 2;

    const adjustedX1 = x1 - 20; 
    const adjustedY1 = y1 + 10; 
    const adjustedX2 = x2 + 20;
    const adjustedY2 = y2;

    return { x1: adjustedX1, y1: adjustedY1, x2: adjustedX2, y2: adjustedY2 };
  }


  const renderConnections = () => {
    return connections.map((connection, index) => {
      const { x1, y1, x2, y2 } = calculateConnectionCoordinates(connection, components);

      console.log(`Dibujando línea: ${x1}, ${y1}, ${x2}, ${y2}`); // Revisar las coordenadas

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
    <div className="flex h-screen">
      <div className="w-48 border-r-2 border-black p-2">
        <button onClick={() => addComponent('OR')}><OrGate /></button>
        <button onClick={() => addComponent('AND')}><AndGate /></button>
      </div>
      <div className="flex-grow relative" onMouseMove={onDrag} onMouseUp={stopDragging}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {renderConnections()}
        </svg>
        {components.map(comp => {
          const Component = comp.type === 'OR' ? OrGate : AndGate;
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
