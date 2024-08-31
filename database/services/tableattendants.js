const Attendant = require('../migrations/attendants');

// Create
const createAttendant = async (data) => {
  const attendant = new Attendant(data);
  return await attendant.save();
};

// Read
const getAttendant = async (email) => {
  return await Attendant.findOne({ email });
};

// Update
const updateAttendant = async (email, updateData) => {
  return await Attendant.findOneAndUpdate({ email }, updateData, { new: true });
};

// Delete
const deleteAttendant = async (email) => {
  return await Attendant.findOneAndDelete({ email });
};

module.exports = {
  createAttendant,
  getAttendant,
  updateAttendant,
  deleteAttendant
};
