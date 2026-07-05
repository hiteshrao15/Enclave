function ContactTable({
  contacts,
  onDelete,
}) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Contacts Found</h3>

        <p>
          No users have submitted the contact
          form yet.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">

      <table className="contact-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {contacts.map((contact) => (
            <tr key={contact._id}>

              <td>{contact.name}</td>

              <td>{contact.email}</td>

              <td>{contact.subject}</td>

              <td>
                {new Date(
                  contact.createdAt
                ).toLocaleDateString()}
              </td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() =>
                    onDelete(contact._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ContactTable;