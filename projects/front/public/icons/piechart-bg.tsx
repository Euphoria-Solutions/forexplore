interface BGInterface {
  className?: string;
  width: number;
  height: number;
}

export const PieChartBG = ({ className, width, height }: BGInterface) => {
  return (
    <svg
      className={`${className}`}
      width={width}
      height={height}
      viewBox="0 0 95 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M91.5 47.8789C91.5 71.9487 71.8265 91.5078 47.5 91.5078C23.1735 91.5078 3.5 71.9487 3.5 47.8789C3.5 23.8092 23.1735 4.25 47.5 4.25C71.8265 4.25 91.5 23.8092 91.5 47.8789Z"
        stroke="#5DAAEE"
        strokeOpacity="0.5"
        strokeWidth="7"
      />
    </svg>
  );
};
