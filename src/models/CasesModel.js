// cases: id, customer_id, assigned_to, priority, status, created_at

import mongoose, { Schema } from "mongoose";

const casesSchema = new Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,//This field will store the _id of another MongoDB collection document.(customer id in this case)store a reference to another collection.
        ref: "Customer",//ref in Mongoose specifies the model that an ObjectId references, enabling relationships between collections and allowing population of related documents.
        required: true,
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "LOW",
    },
    status: {
        type: String,
        enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
        default: "OPEN",
    },
    description: {
        type: String,
        required: true,
    },

},
    { timestamp: true }
)

const CasesModel = mongoose.model('Case', casesSchema);

export default CasesModel;