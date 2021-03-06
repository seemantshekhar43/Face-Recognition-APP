const Clarifai =require('clarifai');

const app = new Clarifai.App({
  apiKey: "c1aab9d32689405e89958abca2fff84d",
});

const handleApiCall = (req, res)=>{
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(400).json('unable to work with api')
  })
}


const handleImagePut = (req, res ,db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0]);
      })
      .catch((err) => {
        res.status(400).json("geeting error in updating entries");
      });
  };

  module.exports= {
    handleImagePut:handleImagePut,
    handleApiCall : handleApiCall
  }