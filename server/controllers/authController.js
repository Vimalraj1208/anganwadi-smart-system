const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Aadhaar = require("../models/aadhaar");


// ==========================
// REGISTER
// ==========================
exports.register = async (req, res) => {

 try{

  const {
   aadhaarNumber,
   name,
   phoneNumber,
   email,
   location,
   area,
   taluk,
   district,
   username,
   password
  } = req.body;

  if (!/^\d{12}$/.test(aadhaarNumber)) {
   return res.status(400).json({
    message:"Invalid Aadhaar Number"
   });
  }

  const existing = await Teacher.findOne({
   $or:[
    {email},
    {username},
    {aadhaarNumber}
   ]
  });

  if(existing){
   return res.status(400).json({
    message:"Teacher already exists"
   });
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const teacher = await Teacher.create({
   aadhaarNumber,
   name,
   phoneNumber,
   email,
   location,
   area,
   taluk,
   district,
   username,
   password:hashedPassword
  });

  res.status(201).json({
   message:"Teacher Registered Successfully",
   teacherId:teacher._id
  });

 }catch(error){
  res.status(500).json({
   message:error.message
  });
 }

};


// ==========================
// LOGIN
// ==========================
exports.login = async (req,res)=>{

 try{

  const {username,password} = req.body;

  const teacher = await Teacher.findOne({username});

  if(!teacher){
   return res.status(400).json({
    message:"Invalid Username or Password"
   });
  }

  const isMatch = await bcrypt.compare(password,teacher.password);

  if(!isMatch){
   return res.status(400).json({
    message:"Invalid Username or Password"
   });
  }

  const token = jwt.sign(
   {id:teacher._id},
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
  );

  res.json({
   message:"Login Successful",
   token
  });

 }catch(error){
  res.status(500).json({
   message:"Server Error"
  });
 }

};


// ==========================
// FETCH AADHAAR
// ==========================
exports.fetchAadhaar = async (req,res)=>{

 try{

  const {aadhaarNumber} = req.body;

  const aadhaar = await Aadhaar.findOne({aadhaarNumber});

  if(!aadhaar){
   return res.status(404).json({
    message:"Aadhaar not found"
   });
  }

  res.json(aadhaar);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};