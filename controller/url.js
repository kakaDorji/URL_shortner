const shortid=require('shortid');
const URL=require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  const baseUrl = req.protocol + '://' + req.get('host'); // Dynamically get base URL

  res.render("home", {
    id: shortId,
    baseUrl: baseUrl, // Pass the base URL to the template
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