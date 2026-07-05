const Story = require('../models/Story');

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Story.findById(id);

    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStoryById,
};
