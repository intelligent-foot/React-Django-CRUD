import React from 'react'
import { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";


const Lists = ({ Items, delete_item, updatedItem, completed_item }) => {
  let [show, setshow] = useState(false);
  let [todoitem, settodoitem] = useState("");
  let [itemId, setitemId] = useState(0);

  const showUpdate = (items, id) => {
    setshow(true);
    settodoitem(items?.title || "");
    setitemId(id);

  };

  return (
    <>
      <div  className="todo-list">
        {Items.map((items, index) => (
          <div className="item-list" key={index}>
            <div className="items">
              <input
                type="checkbox"
                onChange={(e) => completed_item(e, items.id)}
              />

              <p id="t_task" className={items.completed ? "strike" : ""}>
                {items.title}
              </p>
            </div>

            <div className="icon-container">
              <div className="icon-size">
                <MdEdit
                  size={25}
                  onClick={() => showUpdate(items, items.id)}  
                />
              </div>
              <div className="icon-size">
                <RiDeleteBin5Fill
                  size={25}
                  onClick={() => delete_item(items.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="update-container">
          <div className="update">
            <h1>Update Item</h1>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                updatedItem(itemId, todoitem);
                setshow(false);
              }}
            >
              <input
                type="text"
                value={todoitem}
                onChange={(e) => {
                  settodoitem(e.target.value);
                }}
                required
              />
              <button type="submit">Update</button>
            </form>
            <div className="button-container">
              <button
                className="cancel-button"
                onClick={() => setshow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  );
};



export default Lists;

  
