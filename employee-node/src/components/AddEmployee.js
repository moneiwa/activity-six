const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } = require('firebase/firestore');

const app = express();


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

const firebaseConfig = {
  apiKey: "AIzaSyBo6cT2jQKjDsCAbRRmozrl1-QddESMTds",
  authDomain: "employee-ef0bf.firebaseapp.com",
  projectId: "employee-ef0bf",
  storageBucket: "employee-ef0bf.appspot.com",
  messagingSenderId: "242323521719",
  appId: "1:242323521719:web:10b686b935e56473454d32",
  measurementId: "G-HDJMRPC9NG"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.post('/employees', async (req, res) => {
  console.log('Received data:', req.body);

  try {
    const { name, surname, email, phoneNumber, employeePosition, id, image } = req.body;

    
    if (!name || !surname || !email || !phoneNumber || !employeePosition || !id || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    await addDoc(collection(db, 'employees'), { name, surname, email, phoneNumber, employeePosition, id, image });
    res.status(201).json({ message: 'Employee added' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


app.get('/employees', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'employees'));
    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateDoc(doc(db, 'employees', id), req.body);
    res.json({ message: 'Employee updated' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDoc(doc(db, 'employees', id));
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
