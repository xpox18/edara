const requireAdminAuth = require('../middleware/authorize');
const Warehouse = require('../db/warehouse');

// Create a new warehouse
router.post('/admin/warehouses', requireAdminAuth, async (req, res) => {
  const { name, address } = req.body;

  const warehouse = new Warehouse({ name, address });

  await warehouse.save();

  res.send(warehouse);
});

// Get all warehouses
router.get('/admin/warehouses', requireAdminAuth, async (req, res) => {
  const warehouses = await Warehouse.find();

  res.send(warehouses);
});

// Get a single warehouse
router.get('/admin/warehouses/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const warehouse = await Warehouse.findById(id);

  if (!warehouse) {
    return res.status(404).send('Warehouse not found');
  }

  res.send(warehouse);
});

// Update a warehouse
router.patch('/admin/warehouses/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  const warehouse = await Warehouse.findByIdAndUpdate(
    id,
    { name, address },
    { new: true }
  );

  if (!warehouse) {
    return res.status(404).send('Warehouse not found');
  }

  res.send(warehouse);
});

// Delete a warehouse
router.delete('/admin/warehouses/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const warehouse = await Warehouse.findByIdAndDelete(id);

  if (!warehouse) {
    return res.status(404).send('Warehouse not found');
  }

  res.send(warehouse);
}); 