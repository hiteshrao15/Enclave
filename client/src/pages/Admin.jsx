import { useEffect, useState } from "react";

import {
  getContacts,
  deleteContact,
} from "../services/contact.service";

import ContactTable from "../components/ContactTable";

function Admin() {
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const response = await getContacts();

      setContacts(response.data);

      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this contact?"
    );

    if (!confirmed) return;

    try {
      await deleteContact(id);

      setContacts((prev) =>
        prev.filter(
          (contact) => contact._id !== id
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="contact-card">
        <h2>Loading contacts...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact-card">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="contact-card">

      <h2>Admin Dashboard</h2>

      <p className="form-description">
        Total Contacts : <strong>{contacts.length}</strong>
      </p>

      <ContactTable
        contacts={contacts}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Admin;