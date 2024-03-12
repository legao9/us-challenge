const poll = require("../models/poll/createPoll");

exports.getPollById = async (req, res) => {
  try {
    const pollId = req.params.pollsId;

    const pollData = await poll.findById(pollId);

    if (!pollData) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(pollData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllPolls = async (req, res) => {
  try {
    // Fetch all challenges from the database
    const pollData = await poll.find();

    // Log the challenges to the console

    // Send the challenges as the response
    res.json(pollData);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postPoll = async (req, res) => {
  const receivedData = req.body; // Assuming the JSON data is in the request body
  const newPoll = new poll(receivedData);
  console.log(newPoll);
  newPoll.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
  );

  // Do something with the received data (e.g., store it in a database)
  // Here, we'll simply send back a response with the received data and a success message

  res.json({
    message: "Data received successfully",
    data: receivedData,
  });
};
exports.updatePoll = async (req, res) => {
  console.log(req.body.doc)

try{
  
  const response = await poll.findOneAndUpdate({_id: req?.body?.newDoc?._id}, req.body.newDoc, {new:true});

  res.send({response:response})
  console.log(response,"try")
}catch(error){
  res.send(error)
  console.log(error,"____ERROR____")
  
}
};
