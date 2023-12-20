
// eslint-disable-next-line react/prop-types
  const Draggable = ({ children, onDragStart }) => {
    return (
      <div draggable onDragStart={onDragStart} style={{ display: 'inline-block' }}>
        {children}
      </div>
    );
  };

export default Draggable;