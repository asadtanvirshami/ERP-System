import Item from "./Item";

import React from "react";

const Panel: React.FC<{
  title: string;
  data: any;
  index: number;
  inputValues: any;
  handleInputChange: any;
  handleRemoveItem: any;
  handleSaveItems: any;
  handleAddItem: any;
}> = ({
  title,
  data,
  index,
  handleInputChange,
  handleAddItem,
  handleRemoveItem,
  handleSaveItems,
  inputValues,
}) => {
  return (
    <div className="flex flex-col p-4 w-full rounded-lg shadow-md mb-4 mr-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-xl">{title}</h2>
        <i className="fas fa-cog text-gray-400 hover:text-gray-600"></i>
      </div>
      <div className="mb-4 border-b pb-4 max-h-[10rem] overflow-y-auto">
        {data.items.map((item: any, idx: number) => (
          <Item
            removeFunction={handleRemoveItem}
            item={item}
            key={idx}
            index={index}
            name={item}
          />
        ))}
      </div>
      <div className="pt-4">
        <input
          className="p-2 border border-[0.5]px rounded-md text-sm focus:outline-none focus:border-red-500 w-full"
          value={inputValues[index]}
          onChange={(e) => handleInputChange(index, e)}
          placeholder={`Add to ${title}`}
        />
        <div className="flex mt-2 space-x-2">
          <button
            onClick={() => handleAddItem(index)}
            className="border text-red-500 p-2 rounded flex-grow hover:bg-red-100 transition"
          >
            Add
          </button>
          <button  onClick={() => handleSaveItems(index)} className="bg-red-500 text-white p-2 rounded flex-grow hover:bg-red-600 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panel;
