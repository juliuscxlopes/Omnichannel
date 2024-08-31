const attendantService = require('../../database/services/tableattendant');

// Create
const createAttendant = async (req, res) => {
  try {
    const attendant = await attendantService.createAttendant(req.body);
    res.status(201).json(attendant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read
const getAttendant = async (req, res) => {
  try {
    const attendant = await attendantService.getAttendant(req.params.email);
    if (!attendant) return res.status(404).json({ message: 'Attendant not found' });
    res.status(200).json(attendant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateAttendant = async (req, res) => {
  try {
    const attendant = await attendantService.updateAttendant(req.params.email, req.body);
    if (!attendant) return res.status(404).json({ message: 'Attendant not found' });
    res.status(200).json(attendant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
const deleteAttendant = async (req, res) => {
  try {
    const attendant = await attendantService.deleteAttendant(req.params.email);
    if (!attendant) return res.status(404).json({ message: 'Attendant not found' });
    res.status(200).json({ message: 'Attendant deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAttendant,
  getAttendant,
  updateAttendant,
  deleteAttendant
};
