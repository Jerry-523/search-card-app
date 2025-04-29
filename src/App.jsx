import React, { useState } from "react";

const items = ["Banana", "Maçã", "Morango", "Abacate", "Abacaxi", "Uva"];
const fruitImages = {
  Banana: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
  Maçã: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
  Morango: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
  Abacate: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Avocado_DSC_0649.jpg",
  Abacaxi: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg",
  Uva: "https://upload.wikimedia.org/wikipedia/commons/1/13/20180901_Vinograd_Grapes.jpg"
};


export default function App() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState(["Maçã", "Uva", "Abacaxi"]);
  const [editIndex, setEditIndex] = useState(null);
  const [cardInput, setCardInput] = useState("");

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const addItem = () => {
    if (search && !list.includes(search)) {
      setList([...list, search]);
      setSearch("");
    }
  };

  const removeItem = (item) => {
    setList(list.filter((i) => i !== item));
  };

  const startEdit = (item, index) => {
    setEditIndex(index);
    setCardInput(item);
  };

  const saveEdit = () => {
    if (cardInput) {
      const updated = [...list];
      updated[editIndex] = cardInput;
      setList(updated);
      setEditIndex(null);
      setCardInput("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      {search && (
        <ul className="bg-white border rounded shadow mb-4">
          {filtered.map((item, index) => (
            <li
              key={index}
              onClick={() => setSearch(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={addItem}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add
      </button>

      {list.map((item, index) => (
        <div
          key={index}
          className="border p-4 rounded mb-4 shadow-md flex items-center space-x-4"
        >
          <img
            src={fruitImages[item] || "https://via.placeholder.com/60"}
            alt={item}
            className="w-16 h-16 object-cover rounded"
          />


          {editIndex === index ? (
            <>
              <input
                type="text"
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                className="border p-1 rounded w-full"
              />
              <button
                onClick={saveEdit}
                className="bg-green-500 px-3 py-1 rounded text-white"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">{item}</span>
              <button
                onClick={() => startEdit(item, index)}
                className="bg-yellow-400 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
            </>
          )}

          <button
            onClick={() => removeItem(item)}
            className="bg-red-500 px-3 py-1 rounded text-white"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
