const express = require("express");
const {
  contacts: ContactModel,
  Pager,
  sortContacts,
  filterContacts,
} = require("@jworkman-fs/asl");

const app = express();
const port = 8080;

app.use(express.json());

let contacts = [...ContactModel];

// GET all contacts with filtering, sorting, and pagination
app.get("/v1/contacts", (req, res) => {
  try {
    let result = [...contacts];

    // Apply filters from headers
    const filterBy = req.headers['x-filter-by'];
    const filterOp = req.headers['x-filter-operator'];
    const filterValue = req.headers['x-filter-value'];

    if (filterBy && filterOp && filterValue) {
      result = filterContacts(filterBy, filterOp, filterValue, result);
    }

    // Apply sorting (before pagination)
    if (req.query.sort) {
      const direction = req.query.direction || 'asc';
      result = sortContacts(result, req.query.sort, direction);
    }

    // Apply pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const pager = new Pager(result, page, limit);
    result = pager.results();

    res.json(result);
  } catch (error) {
    console.error('GET /v1/contacts error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// GET contact by id
app.get("/v1/contacts/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const contact = contacts.find((c) => c.id === id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error('GET /v1/contacts/:id error:', error);
    res.status(400).json({ error: error.message });
  }
});

// POST new contact
app.post("/v1/contacts", (req, res) => {
  try {
    const newContact = {
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
      ...req.body,
    };
    contacts.push(newContact);
    res.status(303)
      .set('Location', `/v1/contacts/${newContact.id}`)
      .send();
  } catch (error) {
    console.error('POST /v1/contacts error:', error);
    res.status(400).json({ error: error.message });
  }
});

// PUT update contact
app.put("/v1/contacts/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Contact not found" });
    }
    contacts[index] = { ...contacts[index], ...req.body, id: contacts[index].id };
    res.json(contacts[index]);
  } catch (error) {
    console.error('PUT /v1/contacts/:id error:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE contact
app.delete("/v1/contacts/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Contact not found" });
    }
    contacts.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error('DELETE /v1/contacts/:id error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
