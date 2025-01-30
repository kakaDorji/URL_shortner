const shortid=require('shortid');
const URL=require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  if (!req.body.url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid(), baseUrl = `${req.protocol}://${req.get('host')}`;
  
  // Save the new URL in the database
  await URL.create({ shortId, redirectURL: req.body.url, visitHistory: [], createdBy: req.user._id });

  // Fetch all URLs to pass to the view
  const urls = await URL.find({ createdBy: req.user._id });

  // Render the view, passing the necessary data
  res.render("home", { id: shortId, baseUrl, urls });
}



async function handleGetAnalytics(req,res){
const shortId=req.params.shortId;
const result=await URL.findOne({
  shortId
})
return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})

}
module.exports={
  handleGenerateNewShortURL,
  handleGetAnalytics
}