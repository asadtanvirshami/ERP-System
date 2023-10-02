import { MinusCircleIcon } from "@heroicons/react/24/outline";

const Item: React.FC<{
  name: string;
  removeFunction: any;
  item: any;
  index: number;
}> = ({ name, index, item, removeFunction }) => {
  return (
    <div className="flex items-center justify-between my-2 ">
      <span className="mr-2 text-sm">{name}</span>
      <span className="flex items-center">
        <button
          onClick={() => removeFunction(index, item)}
          className="text-gray-400 mr-2 hover:text-gray-600 transition"
        >
          <MinusCircleIcon color="red" width={20} height={20} />
        </button>
        <button className="text-red-500 hover:text-red-700 transition">
          <i className="fas fa-times-circle"></i>
        </button>
      </span>
    </div>
  );
};
export default Item;
