type AristaProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  conflicto: boolean;
};

function Arista({ x1, y1, x2, y2, conflicto }: AristaProps) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={conflicto ? "#ff0000" : "#666"}
      strokeWidth="2"
    />
  );
}

export default Arista;
