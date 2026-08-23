const Item = require('../models/Item.js');

// Get Items in desending order 
const getItem = async (req, res)=>{
    try{
        const items = await Item.find().sort({createdAt: -1});
        res.json(items);
    } catch (err)
    {
        res.status(500).json({error: 'failed to fetch the Items'})
    }
}

const createItem = async (req, res)=>{
    try{
        const newItem = new Item(req.body)
        const savedItem= await newItem.save();
        res.status(201).json(savedItem);
    } catch (err)
    {
        res.status(400).json({error: 'Failed to create the new Item, ensure fields are corrct.'});

    }
}

const updateItem = async (req, res)=> {
    try{
        const updatedItem= await Item.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedItem) return req.status(404).json({error: 'Item not found'});
        req.json(updatedItem)
    }catch (err)
    {
        req.status(400).json({error : 'Failed to update the Item'})
    }
}

const deleteItem =async (req, res)=>{
    try{
        const deteledItem = await Item.findByIdAndDelete(req.params.id)
        if(!deteledItem) return res.status(404).json({error : 'Item not found'})
    } catch(err){
        req.status(400).json({error: 'Failed to delete the Item'})
    }
}

module.exports={createItem, getItem, updateItem, deleteItem};