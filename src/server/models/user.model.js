import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: String
}, { timestamps: { createdAt: 'created_at' } })

export default mongoose.model("user", userSchema, "User");