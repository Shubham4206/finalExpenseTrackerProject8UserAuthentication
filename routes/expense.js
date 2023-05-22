const express=require('express');
const router=express.Router();
 const expensecontroller=require('../controller/expense');

router.post('/addexpense',expensecontroller.addExpense);
router.get('/getexpense',expensecontroller.getExpense);
router.delete('/deleteexpense/:id',expensecontroller.deleteExpense);









module.exports=router;