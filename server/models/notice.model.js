import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['general', 'important', 'urgent', 'event'],
    default: 'general',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active',
  },
  views: {
    type: Number,
    default: 0,
  },
  image: {
    public_id: {
      type: String,
      required: false,
    },
    secure_url: {
      type: String,
      required: false,
    },
  }
}, {
    timestamps: true,
});

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
