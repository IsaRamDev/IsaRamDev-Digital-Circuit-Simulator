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
  const [gateOutputs, setGateOutputs] = useState({});

  const startConnection = (pointId) => {
      setCurrentConnection({ fromId: pointId });
  };

  const completeConnection = (pointId) => {
    if (currentConnection) {
      const existingConnectionIndex = connections.findIndex(c => c.toId === pointId);
      
      if (existingConnectionIndex !== -1) {
        // Si el input ya está conectado, eliminar esa conexión
        setConnections(prev => prev.filter((_, index) => index !== existingConnectionIndex));
      } else {
        // Si no, crear nueva conexión
        setConnections(prev => [...prev, { ...currentConnection, toId: pointId }]);
      }
      setCurrentConnection({ fromId: pointId });
    }
  };
  
  const addComponent = (type) => {
    const newId = `${type}-${Date.now()}`;
    setComponents(prev => [...prev, { type, id: newId, x: 100, y: 100 }]);
    setGateOutputs(prev => ({ ...prev, [newId]: gateOutputs }));
  };
  console.log('jool',gateOutputs)

  const updateGateOutput = (gateId, newOutput, inputA, inputB) => {
    setGateOutputs(prevOutputs => ({
      ...prevOutputs,
      [gateId]: newOutput,
      ['inputA']: inputA,
      ['inputB']: inputB
    }));
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
        <label className="cursor-pointer" onClick={() => addComponent('OR')}>OR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('AND')}><AndGate /></button>
        <br></br>
        <label className="cursor-pointer" onClick={() => addComponent('AND')}>AND</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('NOT')}><NotGate /></button>
        <br></br>
        <label className="cursor-pointer" onClick={() => addComponent('NOT')}>NOT</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('NAND')}><NandGate /></button>
        <br></br>
        <label className="cursor-pointer" onClick={() => addComponent('NAND')}>NAND</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('NOR')}><NorGate /></button>
        <br></br>
        <label className="cursor-pointer" onClick={() => addComponent('NOR')}>NOR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('XOR')}><XorGate /></button>
        <br></br>
        <label className="cursor-pointer" onClick={() => addComponent('XOR')}>XOR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('XNOR')}><XnorGate /></button>
        <br></br>
        <label className="cursor-pointer" onClick={() => addComponent('XNOR')}>XNOR</label>
        <br></br>
        <br></br>
        <button className="focus:p-2 focus:m-2 focus:shadow-lg" onClick={() => addComponent('BUFFER')}><Buffer /></button>
        <br></br>
        <label className="cursor-pointer" onClick={() => addComponent('BUFFER')}>Buffer</label>
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
            <div className="text-slate-700 fixed top-16 right-4 p-10 border w-1/3 bg-white shadow-lg overflow-auto max-h-[80vh]">
              <button
                className="cursor-pointer absolute top-5 left-0 px-5 flex text-gray-400 text-2xl"
                onClick={() => setShowInstructions(!showInstructions)}
              ><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 80 80" width="40px" height="40px"><path d="M 18 8.585938 L 8.585938 18 L 30.585938 40 L 8.585938 62 L 18 71.414063 L 40 49.414063 L 62 71.414063 L 71.414063 62 L 49.414063 40 L 71.414063 18 L 62 8.585938 L 40 30.585938 Z M 18 11.414063 L 40 33.414063 L 62 11.414063 L 68.585938 18 L 46.585938 40 L 68.585938 62 L 62 68.585938 L 40 46.585938 L 18 68.585938 L 11.414063 62 L 33.414063 40 L 11.414063 18 Z M 19 15 C 18.449219 15 18 15.449219 18 16 C 18 16.550781 18.449219 17 19 17 C 19.550781 17 20 16.550781 20 16 C 20 15.449219 19.550781 15 19 15 Z M 61 15 C 60.449219 15 60 15.449219 60 16 C 60 16.550781 60.449219 17 61 17 C 61.550781 17 62 16.550781 62 16 C 62 15.449219 61.550781 15 61 15 Z M 22 18 C 21.449219 18 21 18.449219 21 19 C 21 19.550781 21.449219 20 22 20 C 22.550781 20 23 19.550781 23 19 C 23 18.449219 22.550781 18 22 18 Z M 58 18 C 57.449219 18 57 18.449219 57 19 C 57 19.550781 57.449219 20 58 20 C 58.550781 20 59 19.550781 59 19 C 59 18.449219 58.550781 18 58 18 Z M 25 21 C 24.449219 21 24 21.449219 24 22 C 24 22.550781 24.449219 23 25 23 C 25.550781 23 26 22.550781 26 22 C 26 21.449219 25.550781 21 25 21 Z M 55 21 C 54.449219 21 54 21.449219 54 22 C 54 22.550781 54.449219 23 55 23 C 55.550781 23 56 22.550781 56 22 C 56 21.449219 55.550781 21 55 21 Z M 28 24 C 27.449219 24 27 24.449219 27 25 C 27 25.550781 27.449219 26 28 26 C 28.550781 26 29 25.550781 29 25 C 29 24.449219 28.550781 24 28 24 Z M 52 24 C 51.449219 24 51 24.449219 51 25 C 51 25.550781 51.449219 26 52 26 C 52.550781 26 53 25.550781 53 25 C 53 24.449219 52.550781 24 52 24 Z M 31 27 C 30.449219 27 30 27.449219 30 28 C 30 28.550781 30.449219 29 31 29 C 31.550781 29 32 28.550781 32 28 C 32 27.449219 31.550781 27 31 27 Z M 49 27 C 48.449219 27 48 27.449219 48 28 C 48 28.550781 48.449219 29 49 29 C 49.550781 29 50 28.550781 50 28 C 50 27.449219 49.550781 27 49 27 Z M 34 30 C 33.449219 30 33 30.449219 33 31 C 33 31.550781 33.449219 32 34 32 C 34.550781 32 35 31.550781 35 31 C 35 30.449219 34.550781 30 34 30 Z M 46 30 C 45.449219 30 45 30.449219 45 31 C 45 31.550781 45.449219 32 46 32 C 46.550781 32 47 31.550781 47 31 C 47 30.449219 46.550781 30 46 30 Z M 37 33 C 36.449219 33 36 33.449219 36 34 C 36 34.550781 36.449219 35 37 35 C 37.550781 35 38 34.550781 38 34 C 38 33.449219 37.550781 33 37 33 Z M 43 33 C 42.449219 33 42 33.449219 42 34 C 42 34.550781 42.449219 35 43 35 C 43.550781 35 44 34.550781 44 34 C 44 33.449219 43.550781 33 43 33 Z M 40 36 C 39.449219 36 39 36.449219 39 37 C 39 37.550781 39.449219 38 40 38 C 40.550781 38 41 37.550781 41 37 C 41 36.449219 40.550781 36 40 36 Z M 33 43 C 32.449219 43 32 43.449219 32 44 C 32 44.550781 32.449219 45 33 45 C 33.550781 45 34 44.550781 34 44 C 34 43.449219 33.550781 43 33 43 Z M 47 43 C 46.449219 43 46 43.449219 46 44 C 46 44.550781 46.449219 45 47 45 C 47.550781 45 48 44.550781 48 44 C 48 43.449219 47.550781 43 47 43 Z M 30 46 C 29.449219 46 29 46.449219 29 47 C 29 47.550781 29.449219 48 30 48 C 30.550781 48 31 47.550781 31 47 C 31 46.449219 30.550781 46 30 46 Z M 50 46 C 49.449219 46 49 46.449219 49 47 C 49 47.550781 49.449219 48 50 48 C 50.550781 48 51 47.550781 51 47 C 51 46.449219 50.550781 46 50 46 Z M 27 49 C 26.449219 49 26 49.449219 26 50 C 26 50.550781 26.449219 51 27 51 C 27.550781 51 28 50.550781 28 50 C 28 49.449219 27.550781 49 27 49 Z M 53 49 C 52.449219 49 52 49.449219 52 50 C 52 50.550781 52.449219 51 53 51 C 53.550781 51 54 50.550781 54 50 C 54 49.449219 53.550781 49 53 49 Z M 24 52 C 23.449219 52 23 52.449219 23 53 C 23 53.550781 23.449219 54 24 54 C 24.550781 54 25 53.550781 25 53 C 25 52.449219 24.550781 52 24 52 Z M 56 52 C 55.449219 52 55 52.449219 55 53 C 55 53.550781 55.449219 54 56 54 C 56.550781 54 57 53.550781 57 53 C 57 52.449219 56.550781 52 56 52 Z M 21 55 C 20.449219 55 20 55.449219 20 56 C 20 56.550781 20.449219 57 21 57 C 21.550781 57 22 56.550781 22 56 C 22 55.449219 21.550781 55 21 55 Z M 59 55 C 58.449219 55 58 55.449219 58 56 C 58 56.550781 58.449219 57 59 57 C 59.550781 57 60 56.550781 60 56 C 60 55.449219 59.550781 55 59 55 Z M 18 58 C 17.449219 58 17 58.449219 17 59 C 17 59.550781 17.449219 60 18 60 C 18.550781 60 19 59.550781 19 59 C 19 58.449219 18.550781 58 18 58 Z M 62 58 C 61.449219 58 61 58.449219 61 59 C 61 59.550781 61.449219 60 62 60 C 62.550781 60 63 59.550781 63 59 C 63 58.449219 62.550781 58 62 58 Z M 15 61 C 14.449219 61 14 61.449219 14 62 C 14 62.550781 14.449219 63 15 63 C 15.550781 63 16 62.550781 16 62 C 16 61.449219 15.550781 61 15 61 Z M 65 61 C 64.449219 61 64 61.449219 64 62 C 64 62.550781 64.449219 63 65 63 C 65.550781 63 66 62.550781 66 62 C 66 61.449219 65.550781 61 65 61 Z"/></svg></button>
              <h2 className="text-2xl font-semibold mb-4">Instrucciones / Instructions</h2>
              <div className="mb-6 text-left font-normal text-base">
                <h3 className="text-md font-semibold">Español:</h3>
                <ol className="list-decimal list-inside">
                  <br></br>
                  <li>Selecciona la compuerta lógica que desees utilizar haciendo clic en su icono.</li>
                  <li>La compuerta aparecerá en el área de trabajo. Puedes posicionarla en el lugar deseado haciendo clic sobre ella y, sin soltar, arrastrándola a la posición que prefieras.</li>
                  <li>Conecta las entradas necesarias a tu compuerta lógica para obtener la salida deseada.</li>
                  <li>Si deseas agregar más compuertas, repite los primeros dos pasos.</li>
                  <li>Para conectar una compuerta con otra, haz clic en el punto de salida (output) de una compuerta y después hasta otro click en el punto de entrada (input) de otra.</li>
                </ol>
              </div>
              <div className="mb-6 text-left font-normal text-base">
                <h3 className="text-md font-semibold">English:</h3>
                <ol className="list-decimal list-inside">
                  <br></br>
                  <li>Choose the desired logic gate by clicking on its icon.</li>
                  <li>The gate will appear in the workspace. Position it where you want by clicking and dragging it to your preferred location.</li>
                  <li>Connect the necessary inputs to your logic gate to get the desired output.</li>
                  <li>To add more gates, repeat the first two steps.</li>
                  <li>To connect one gate to another, click on the output point of one gate and then click on the input point of another.</li>
                </ol>
              </div>
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
                onOutputChange={(output, inputA, inputB) => {updateGateOutput(comp.id, output, inputA, inputB)
                console.log(output, comp.id)}}
              />
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default App;
