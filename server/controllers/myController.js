const Users = require("../model/userModel");
const cryptage = require("bcrypt");

module.exports.register_me = async (req,res,next) => {
    console.log(req.body);
    const {username,email,passwd} = req.body;

    Users.findOne({email}, function(err, doc) {
        if(doc!=null){
            return res.json({
                msg:"Username already exist in application",
                status:false
            });
        }
        else{
            try{
                console.log("here",cryptage.hash(passwd,20))
                const new_user = Users.create({
                    username,
                    email,
                    password: passwd,
                });
        
                // delete new_user.password;
                return res.json({
                    status:true,
                    new_user
                })
            }   
            catch(err){
                next(err);
            }
        }
      });
}

module.exports.login_me = async (req,res,next) => {
    const {username,passwd} = req.body;
    
    Users.findOne({username}, function(err, doc) {
        if(doc==null){
            return res.json({
                msg:"Username doesn't exsist",
                status:false
            });}
        else{
            try{
                if(passwd===doc.password){
                    return res.json({status:true,doc});
                }
                else{
                    return res.json({
                        msg:"password incorrect",
                        status:false
                    }); 
                }
            }catch (mochkila) {
                next(mochkila);
            }}
        });
}
