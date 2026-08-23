const mongoose = require ('mongoose')

const ItemSchema = new mongoose.Schema(
    {
        name: {type:String, required: true},
        description:{type:String, default:'', required: true}
    },
    {timestamps:true}
);

module.exports=mongoose.model('Item' , ItemSchema);