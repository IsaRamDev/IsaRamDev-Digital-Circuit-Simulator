import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// eslint-disable-next-line react/prop-types
const Connections = ({ connections }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    // eslint-disable-next-line react/prop-types
    connections.forEach(conn => {
      const startX = conn.startX;
      const startY = conn.startY;
      const endX = conn.endX;
      const endY = conn.endY;

      svg.append("line")
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", endX)
        .attr("y2", endY)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    });
  }, [connections]); // Redibuja cuando las conexiones cambian

  return (
    <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default Connections;
