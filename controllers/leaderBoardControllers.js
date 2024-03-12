exports.createLeaderBoard =()=>{
    try{const board = new LeaderBoard(req.body.doc)
        board.save()
        res.send({status:200, board })
        }catch(e){
        console.log("error", e, "___error___")
        }
}