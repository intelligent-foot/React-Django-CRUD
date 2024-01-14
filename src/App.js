import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import Add_item from './Page/Add_item';
import Lists from './Page/Lists';
import { useEffect, useState } from 'react';


function App() {

  const [items, setitems] = useState([]);
  const [errors, seterrors] = useState("")

  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/items")
      .then(response => {
        console.log(response.data); // Log the API response
        setitems(response.data);
      })
      .catch(err => seterrors(err.message));
  }, []);


  const deleteItem = async (id) => {
    axios.delete(`http://127.0.0.1:8000/items/${id}/`)
    .then(() => {
      setitems(items.filter(item => item.id !== id));
    })
    .catch(err => {
      seterrors(err.message);
    });
  };

  const addItem = (data) => {
    const requestData = {
        title: data.title,  // Update 'todo' to 'title'
        description: "Your Description Here"
    };

    axios.post("http://127.0.0.1:8000/items/", requestData)
        .then(response => { // Assuming the server responds with the created item
            const newItem = response.data;
            setitems([...items, newItem]);
        })
        .catch(error => {
            console.error("Error adding item:", error);
            seterrors(error.message);
        });
    };

  const updateItem = (id, new_item) => {
      const requestData = {
        title: new_item,
        description: "Your Description here",
        
      };

      axios.put(`http://127.0.0.1:8000/items/${id}/`, requestData)
      .then((response) => {
        const updatedItem = response.data;
        setitems(items.map(item => item.id == id ? updatedItem : item));
      })
      .catch((error) => {
        console.error("Error updating item", error)
        seterrors(error.message);
      });

  };

  const itemDone = (e, id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: e.target.checked } : item
    );
  
    setitems(updatedItems);
  };
 
  return (

<div> 
  <Navbar className="fixed top-0 left-0 w-full z-10" />

  <div className="todo-container">
    {errors && <p>{errors}</p>}
    <Add_item AddItem={addItem} />
    <Lists Items={items} delete_item={deleteItem} updatedItem={updateItem} completed_item={itemDone} />
  </div>
  
</div>
    
    
  );
}

export default App;
