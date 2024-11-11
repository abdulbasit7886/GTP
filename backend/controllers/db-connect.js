import mongoose, { connect } from "mongoose";

const connectionToDb = async(req,res) => {
    try{
        await mongoose.connect(process.env.URI);
        console.log('MongoDB connected');
    }catch(error){
        console.error(error);
    }
}

export default connectionToDb;