const shortid=require('shortid');
const URL=require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid(); // Create a new short ID
  await URL.create({
    shortId: shortId, // Store the generated short ID
    redirectURL: body.url, // The URL to redirect to
    visitHistory: [], // Initial empty visit history
    createdBy: req.user._id, // The ID of the user creating this short URL
  });

  const baseUrl = req.protocol + '://' + req.get('host'); // Get the base URL dynamically

  // Render the home template, passing shortId (as id) and the base URL
  res.render("home", {
    id: shortId,   // Pass shortId as 'id' to the template
    baseUrl: baseUrl,  // Pass base URL to the template
  });
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