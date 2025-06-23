const ColorPicker = ({ colorOptions, setColor, className = "" }) => {
  return (
    <div
      className={`bg-white px-2 py-1 rounded shadow-md flex gap-2 flex-wrap border -mt-2 z-50 ${className}`}
    >
      {colorOptions.map((c) => (
        <span
          key={c}
          className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
          style={{ background: c }}
          onClick={() => setColor(c)}
        ></span>
      ))}
    </div>
  );
};

export default ColorPicker;
