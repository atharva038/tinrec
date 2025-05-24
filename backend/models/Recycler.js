import mongoose from 'mongoose';
const recyclerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    minLength: 10
  },
  acceptedWasteTypes: [{
    type: String,
    required: true
  }],
  pickupRadius: {
    type: Number,
    default: 10
  },
  certifications: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Recycler', recyclerSchema);