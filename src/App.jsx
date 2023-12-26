import { useState } from 'react';
import OrGate from './components/Or';
import AndGate from './components/And';

function App() {
  const [components, setComponents] = useState([]);
  const [dragging, setDragging] = useState(null);

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
      x: e.clientX,
      y: e.clientY
    };

    setComponents(updatedComponents);
  };

  const stopDragging = () => {
    setDragging(null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-48 border-r-2 border-black p-2">
        <button onClick={() => addComponent('OR')}>
          <OrGate />
        </button>
        <button onClick={() => addComponent('AND')}>
          <AndGate />
        </button>
      </div>

      <div className="flex-grow relative" onMouseMove={onDrag} onMouseUp={stopDragging}>
        {components.map(comp => {
          const Component = comp.type === 'OR' ? OrGate : AndGate;
          return (
            <div 
              key={comp.id} 
              className="absolute"
              style={{ left: comp.x, top: comp.y }}
              onMouseDown={() => startDragging(comp.id)}
            >
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
