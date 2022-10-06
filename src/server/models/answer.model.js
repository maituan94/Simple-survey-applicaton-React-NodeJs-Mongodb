import mongoose from "mongoose";

/* Creating a schema for the answer model. */
const answerSchema = mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },
    email: String,
    value: String
}, { timestamps: { createdAt: 'created_at' } })

export default mongoose.model("answer", answerSchema, "Answer");