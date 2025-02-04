const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

// Render the login page if not logged in
router.get("/login", (req, res) => {
  if (req.user) return res.redirect('/'); // If already logged in, redirect to the home page
  return res.render('login'); // Otherwise, show login page
});

// Render signup page
router.get("/signup", (req, res) => {
  if (req.user) return res.redirect('/'); // If already logged in, redirect to home page
  return res.render('signup');
});

// Admin routes - only accessible to admin users
router.get("/admin/urls", restrictTo(['admin']), async (req, res) => {
  if (!req.user) return res.redirect('/login'); // Redirect to login if no user
  const allUrl = await URL.find({});
  return res.render('home', {
    urls: allUrl
  });
});

// Home page for normal and admin users
router.get("/", restrictTo(['normal', 'admin']), async (req, res) => {
  if (!req.user) return res.redirect('/login'); // Redirect to login if no user

  const allUrl = await URL.find({ createdBy: req.user._id });

  return res.render('home', {
    urls: allUrl,
    id: null, // Ensure 'id' is always defined to avoid ReferenceError
    baseUrl: req.headers.host // Pass the base URL
  });
});


router.get("/logout", (req, res) => {
  // Clear the cookie (assuming cookie name is 'userToken')
  res.clearCookie('token');
  
  // Redirect to the login page or homepage
  return res.redirect('/login'); // Or redirect to '/'
});

module.exports = router;
