import mongoose  from "mongoose";

function Mongo_connect(){
    try {
        mongoose.connect(`mongodb+srv://Faxriddin:11201111@cluster0.lrftgr1.mongodb.net/Register?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("MongoDB ga ulandi...");
        
    } catch (error) {
        console.log(error,"ulanmadi");
        
        
    }
}

export default Mongo_connect