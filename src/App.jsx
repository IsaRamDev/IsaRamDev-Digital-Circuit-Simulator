import { useState } from 'react';
import OrGate from './components/Or';
import AndGate from './components/And';
// import NotGate from './components/Not';
import DropZone from './components/Dropzone';

function App() {
  const [components, setComponents] = useState([]);

  const handleDragStart = (e, type) => {
    const componentData = JSON.stringify({ type, id: `${type}-${Date.now()}` }); // Genera un ID único basado en el tiempo actual
    e.dataTransfer.setData('text', componentData);
  };
  

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData('text');
    if (data) {
      const componentData = JSON.parse(data);
      setComponents((prevComponents) => [...prevComponents, componentData]);
    }
  };
  

  return (
    <div>
      <OrGate onDragStart={(e) => handleDragStart(e, 'OR')} />
      <AndGate onDragStart={(e) => handleDragStart(e, 'AND')} />
      <DropZone onDrop={handleDrop}>
      <DropZone onDrop={handleDrop}>
  {components.map((component, index) => {
    switch (component.type) {
      case 'OR':
        return <OrGate key={component.id} />;
      case 'AND':
        return <AndGate key={component.id} />;
      default:
        return null;
    }
  })}
</DropZone>
      </DropZone>
    </div>
  );
}

export default App
