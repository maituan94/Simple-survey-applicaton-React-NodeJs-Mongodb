import mongoose from 'mongoose';

/* Creating a schema for the question model. */
const questionSchema = mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    isRequired: { type: Boolean, default: false },
    options: [String],
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
}, { timestamps: { createdAt: 'created_at' } })

export default mongoose.model('question', questionSchema, 'Question');