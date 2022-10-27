const Users = require("../model/userModel");
const cryptage = require("bcrypt");

module.exports.register_me = async (req,res,next) => {
    console.log(req.body);
    const {username,email,passwd} = req.body;

    // const check_user =  await Users.findOne({username});
    // const check_email = await Users.findOne({email});

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
    
    
    // if(Users.findOne({username})!=null) return res.json({
    //         msg:"Username already exist in application",
    //         status:false
    //     });

    // if(Users.findOne({email})) return res.json({
    //         msg:"Email already exist in application",
    //         status:false
    //     });


    // const new_user = await Users.create({
    //     username,
    //     email,
    //     password: require("brcypt").hash(passwd,20),
    // });

    // delete new_user.password;
    // return res.json({
    //     status:true,
    //     new_user
    // })}catch(err){
    //     next(err);
    // }
}

// const User = require("../model/userModel");
// const bcrypt = require("bcrypt");

// module.exports.register_me = async (req,res,next) => {
//     try {
//         const { username, email, password } = req.body;
//         const usernameCheck = await User.findOne({ username });
//         if (usernameCheck)
//           return res.json({ msg: "Username already used", status: false });
//         const emailCheck = await User.findOne({ email });
//         if (emailCheck)
//           return res.json({ msg: "Email already used", status: false });
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({
//           email,
//           username,
//           password: hashedPassword,
//         });
//         delete user.password;
//         return res.json({ status: true, user });
//       } catch (ex) {
//         next(ex);
//       }
//     }