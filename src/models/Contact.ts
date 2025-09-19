import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },

  title: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  urls: [{ type: String }],
});

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
