const Expense=require('../model/expense');
const User=require('../model/user'); 


exports.addExpense=async(req,res,next)=>{
    const{amount,description,category}=req.body;
    if(amount.length>0 && description.length>0 && category.length>0){
            try{
      let data = await  Expense.create({
                amount:amount,
                description:description,
                category:category
            });
            console.log(data);

         res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
    }
}

exports.getExpense=async(req,res,next)=>{
    try{
        let data= await Expense.findAll();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({success:false,message:err});
    }
}

exports.deleteExpense=async(req,res,next)=>{
    const uid=req.params.id;
    await Expense.destroy({
        where:{
         id:uid
        }
    });
    res.sendStatus(200);

}