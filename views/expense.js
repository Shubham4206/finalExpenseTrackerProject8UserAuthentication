const expense=document.getElementById('expense');

expense.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const amount=document.getElementById('amount');
    const description=document.getElementById('description');
    const category=document.getElementById('category');

    const expensedetails={
        amount:amount.value,
        description:description.value,
        category:category.value
    }
    try{

        let res=await axios.post(`http://localhost:4000/expense/addexpense`,expensedetails,{
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        showuserexpense(res.data);
    }catch(err){
        if(err.response.status===501){

            amount.value="";
            console.log(err)
        }
       else{
        console.log(err);
       } 
    }
})
document.addEventListener("DOMContentLoaded", async () => {
    try {

        let response2 = await axios.get("http://localhost:4000/expense/getexpense")
        let response = response2.data;
        for (var i = 0; i < response.length; i++) {
            showuserexpense(response[i]);
        }
       // priceAdded();
    }
    catch (err) {
        console.log(err);
    }
})

function showuserexpense(user) {
    let item = document.getElementById('expense-items');
    let fin = user.amount + "-" + user.description+"-"+user.category;
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(fin));
    let deleteBtn = document.createElement('button');
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.textContent = 'Delete Expense';
    li.appendChild(deleteBtn);
    item.appendChild(li);
    deleteBtn.onclick = async () => {
        await axios.delete(`http://localhost:4000/expense/deleteexpense/${user.id}`)
        item.removeChild(li);
        // priceAdded();
    }
  
}