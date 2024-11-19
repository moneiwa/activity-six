const express = require('express');
const cors = require('cors');
const { db } = require('./Controllers/db');
const { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } = require('firebase/firestore');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get('/api/employees', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'employees'));
    const employees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
});


app.post('/api/employees', async (req, res) => {
  const { employeeId, name, surname, email, phoneNumber, employeePosition, image } = req.body;


  if (!employeeId || !name || !surname || !email || !phoneNumber || !employeePosition) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
   
    const querySnapshot = await getDocs(collection(db, 'employees'));
    const existingEmployee = querySnapshot.docs.find(doc => doc.data().employeeId === employeeId);

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    
    const docRef = await addDoc(collection(db, 'employees'), {
      employeeId,  
      name,
      surname,
      email,
      phoneNumber,
      employeePosition,
      image,
    });

    res.json({ message: "Employee added successfully", id: docRef.id });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: "Error adding employee", error: error.message });
  }
});


app.delete('/api/employees/:id', async (req, res) => {
  const employeeId = req.params.id;
  try {
    await deleteDoc(doc(db, 'employees', employeeId));
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
});


app.put('/api/employees/:id', async (req, res) => {
  const employeeId = req.params.id;
  const { name, surname, email, phoneNumber, employeePosition, image } = req.body;

  if (!name || !surname || !email || !phoneNumber || !employeePosition) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    
    await updateDoc(doc(db, 'employees', employeeId), {
      name,
      surname,
      email,
      phoneNumber,
      employeePosition,
      image,
    });

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
