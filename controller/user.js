const User = require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.adduser =  async(req, res, next) => {
    

      const { name, email, password } = req.body;
        if(name.length > 0 && email.length > 0 && password.length > 0) {
            const saltRounds=10;
            bcrypt.hash(password, saltRounds, async(error, hash)=> {
  try{

      await User.create({
          name: name,
          email: email,
          password: hash
        })
        
        res.status(200).json({ success: true, message: 'new user created' });
    }catch (err) {
        console.log(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, message: err });
        };
        
            res.status(500).json({ success: false, message: 'user' });
        
    }; 
    });
}  else{
    res.status(500).json({success:false,message:'bad Parameters'})
}  
   
    }

exports.logUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (email.length > 0 && password.length > 0) {
        try {

            let users = await User.findAll({ where: { email: email } })
            
            const user = users[0];
        
            if (!user) {
                return res.status(404).json({ success: false, message: 'user does not exist' });
            }

            bcrypt.compare(password, user.password,  (error, result)=> {
                if (error) {
                    console.log(error);
                    return res.status(501).json({ success: false, message: 'something went wrong' });
                }
                if (result == true) {
                    const token = jwt.sign({ userId: user.id, name: user.name }, '999ensjsdnsjen483ndsm384eme');
                    res.status(200).json({
                        success: true,
                        message: 'user found',
                        token: token
                    });
                } else {
                    res.status(401).json({ success: false, message: 'password is incorrect' });
                }
            });

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'new err '});
        };
    } else {
        res.status(400).json({ success: false, message: 'bad parameters' });
    }
};
