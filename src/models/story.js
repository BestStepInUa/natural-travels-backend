const { Schema, model } = require('mongoose');

const storySchema = new Schema(
  {
    img: { type: String, required: true },
    title: { type: String, required: true },
    article: { type: String, required: true },
    category: { type: Object, required: true },
    rate: { type: Number, default: 0 },
    ownerId: { type: Object, required: true },
    date: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

const Story = model('story', storySchema);

module.exports = Story;
