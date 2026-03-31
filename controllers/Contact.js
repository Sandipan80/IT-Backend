const ContactSchema = require("../models/Contact.model");
const userValidate = require("../validation/Contact_validation")

const  Contact =async(req,res,next)=>{
    // console.log("hello");
    
    const ContactPage =(req.body);
    console.log("ContactPage:",ContactPage);

    //data extract
    const{name,email,subject,message}=ContactPage;

  //save in db 
  const Contact2 = new ContactSchema({
    name:name,
    email:email,
    subject:subject,
    message:message,
  });
  await Contact2.save();
  //
  res.json({status:"Message Sent Successful"});
    
};
module.exports = Contact;