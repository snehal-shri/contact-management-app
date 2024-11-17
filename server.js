const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'contactmaagement',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// POST /contacts
app.post('/contacts', (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  const sql = 'INSERT INTO contacts (firstName, lastName, email, phoneNumber, company, jobTitle) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, phoneNumber, company, jobTitle], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, firstName, lastName, email, phoneNumber, company, jobTitle });
  });
});

// GET /contacts
app.get('/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// PUT /contacts/:id
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  const sql = 'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, company = ?, jobTitle = ? WHERE id = ?';
  db.query(sql, [firstName, lastName, email, phoneNumber, company, jobTitle, id], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ id, firstName, lastName, email, phoneNumber, company, jobTitle });
  });
});

// DELETE /contacts/:id
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contacts WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(204).send();
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
