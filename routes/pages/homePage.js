import express from 'express';
const homePage = express.Router();

homePage.get('/' , (req,res)=>{
  const user = req.session.user;

  if (!user) {
    return res.render('Landing-Page/index', { username: null });
  }

  res.render('Landing-Page/index', {
    username: user.username
  });
});

export default homePage;