const model = require('../models/modelData');

async function createCategories(req, res) {
    const Create = new model.Categories({
        type:"Revenue",
        color: "#ab26b8"
    })
        
    await Create.save(function(err) {
        if(!err) return res.json(Create);
        return res.status(400).json({message:`There is an error during creation of categories ${err}`});
    });
}


async function getCategories(req, res) {
    let data = await model.Categories.find({})

    let filter = await data.map(v => Object.assign({}, {type:v.type, color:v.color}));

    return res.json(filter);
}


async function createTransaction(req, res) {
    if(!req.body) return res.status(400).json("Post Data required");
    let {name, type, amount} = req.body;

    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );
    
    create.save(function(err){
        if(!err) return res.json(create);
        return res.status(400).json({message: `Error creating this transaction ${err}`});
    });
}


async function getTransaction(req, res) {
    model.Transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categoriesInfo"
            }           
        },
        {
            $unwind: "$categoriesInfo"                
        }    
    ]).then(result => {
        let data = result.map(v => Object.assign({_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categoriesInfo['color']}));
        console.log({result})
        //console.log({data})
        //console.log(result)

        res.json(data);
    }).catch(error => {
       res.status(400).json("Collection Error"); 
    })
}



async function deleteTransaction(req, res) {
    if(!req.body) res.ststus(400).json({message: "Request not found"});
    await model.Transaction.deleteOne(req.body,function(err){
        if(!err) res.json("Transcation is Deleted!");
    }).clone().catch(function(err){res.json("Error deleting transaction :(")});
     
}


// joining above two records (models) by using mongoose aggregate function

async function getLabels(req, res) {
    model.Transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categoriesInfo"
            }           
        },
        {
            $unwind: "$categoriesInfo"                
        }    
    ]).then(result => {
        let data = result.map(v => Object.assign({_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categoriesInfo['color']}));
        //console.log({result})
        //console.log({data})

        res.json(data);
    }).catch(error => {
       res.status(400).json("Collection Error"); 
    })

}

module.exports = {
    createCategories,
    getCategories,
    createTransaction, 
    getTransaction,
    deleteTransaction,
    getLabels
}