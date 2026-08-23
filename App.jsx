import { useState, useEffect } from 'react';
import axios from 'axios';

// Adjust URL based on environment
const API_BASE = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all items on initial render
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_BASE);
      setItems(res.data);
      setError(null);
    } catch (err) {
      setError('Error fetching items from server');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return;

    try {
      if (editingId) {
        // UPDATE
        const res = await axios.put(`${API_BASE}/${editingId}`, { name, description });
        setItems(items.map(item => item._id === editingId ? res.data : item));
        setEditingId(null);
      } else {
        // CREATE
        const res = await axios.post(API_BASE, { name, description });
        setItems([res.data, ...items]); // Updates UI dynamically
      }
      setName('');
      setDescription('');
      setError(null);
    } catch (err) {
      setError('Error saving item');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setItems(items.filter(item => item._id !== id)); // Real-time UI refresh
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setDescription(item.description);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>MERN CRUD Application</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item._id} style={{ margin: '10px 0' }}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => startEdit(item)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(item._id)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;