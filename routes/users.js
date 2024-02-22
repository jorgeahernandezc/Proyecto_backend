const User = require('../db/models/usermodel');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/register',async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ message: 'User registered successfully.', token });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
  });


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send('Invalid username or password.');
    }else{
        if(user.password === req.body.password){
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Usuario logeado correctamente.', token });
    }else{
        res.status(400).send('Invalid username or password.');
    
    }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;


