import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ContactForm from './components/ContactForm';  // Import your contact form component
import ContactsTable from './components/ContactsTable';  // Import your contacts table component
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from the server when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/contacts'); // Change the URL to match your backend endpoint
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Management App
      </Typography>
      <ContactForm setContacts={setContacts} />
      <ContactsTable contacts={contacts} setContacts={setContacts} />
    </Container>
  );
}

export default App;
