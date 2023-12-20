// eslint-disable-next-line react/prop-types
  const DropZone = ({ onDrop, children }) => {
    const handleDrop = (e) => {
      e.preventDefault();
      onDrop(e.dataTransfer.getData('text'));
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    return (
      <div onDrop={handleDrop} onDragOver={handleDragOver} style={{ height: '500px', width: '100%', border: '1px dashed black' }}>
        {children}
      </div>
    );
  };

export default DropZone;