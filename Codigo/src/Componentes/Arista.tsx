type AristaProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  conflicto: boolean;
};

function Arista(props: AristaProps) {
  return (
    <line
      x1={props.x1}
      y1={props.y1}
      x2={props.x2}
      y2={props.y2}
      stroke={props.conflicto ? "#ff0000" : "#666"}
      strokeWidth="2"
    />
  );
}

export default Arista;
