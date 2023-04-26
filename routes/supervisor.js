const requireAdminAuth = require('../middleware/requireAdminAuth');
const Supervisor = require('../db/Supervisor');

// Create a new supervisor
app.post('/admin/supervisors', requireAdminAuth, async (req, res) => {
  const { name, email, password } = req.body;

  const supervisor = new Supervisor({ name, email, password });

  await supervisor.save();

  res.send(supervisor);
});

// Get all supervisors
app.get('/admin/supervisors', requireAdminAuth, async (req, res) => {
  const supervisors = await Supervisor.find();

  res.send(supervisors);
});

// Get a single supervisor
app.get('/admin/supervisors/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const supervisor = await Supervisor.findById(id);

  if (!supervisor) {
    return res.status(404).send('Supervisor not found');
  }

  res.send(supervisor);
});

// Update a supervisor
app.patch('/admin/supervisors/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const supervisor = await Supervisor.findByIdAndUpdate(
    id,
    { name, email, password },
    { new: true }
  );

  if (!supervisor) {
    return res.status(404).send('Supervisor not found');
  }

  res.send(supervisor);
});

// Delete a supervisor
app.delete('/admin/supervisors/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const supervisor = await Supervisor.findByIdAndDelete(id);

  if (!supervisor) {
    return res.status(404).send('Supervisor not found');
  }

  res.send(supervisor);
});
