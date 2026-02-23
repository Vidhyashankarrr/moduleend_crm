import CasesModel from "../models/CasesModel.js";

//create case

export const createCase = async (req, res) => {
    try {

        const newCase = req.body;

        await CasesModel.create(newCase);

        res.status(201).json({
            massage: "New case addedd successsfully",
            newCase
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }
};

//getCases

export const getCases = async (req, res) => {
    try {
        const cases = await CasesModel.find({}).populate("customer_id","name").populate("assigned_to","username");//.populate("customerId") Replaces customerId (ObjectId) with actual customer data and return only name in this case 

        res.status(200).json({ cases });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }


};

//get a case by id
export const getACase = async (req, res) => {
    try {
        const aCase = await CasesModel.findById(req.params.id).populate("customer_id","name").populate("assigned_to","username");
        res.status(200).json({ aCase })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }

}

//update case

export const updateCase = async (req, res) => {
    try {
        const updated = await CasesModel.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'});//return updated document after update operation
        res.status(200).json({ updated });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }


};

//delete a case

export const deleteCase = async (req, res) => {
    try {
        await CasesModel.findByIdAndDelete(req.params.id);
        res.json({ message: "case deleted" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }
}