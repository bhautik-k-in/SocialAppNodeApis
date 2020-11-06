const COMMENT = require("../model/connection").comment


/**
 * @description GET SINGLE COMMENT ON POST FOR EDIT
 * @Route       GET /api/v1/comments/:id OR /api/v1/:postid/comments/:commentid
 * @access      PUBLIC 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getComment = async (req, res, next) => {
    res.status(200).json({ success: true, msg: "GET SINGLE CCOMMENT FROM SPECIFIC POST" });
}


/**
 * @description ADD NEW COMMENT ON POST
 * @Route       POST /api/v1/comments OR /api/v1/:postid/comments/
 * @access      PRIVATE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addComment = async (req, res, next) => {
    res.status(200).json({ success: true, msg: "ADD NEW COMMENT" });
}


/**
 * @description EDIT COMMENT [ ONLY EDITED BY COMMENT ADD USER NOT BY POST USER]
 * @Route       PUT /api/v1/comments/:id OR /api/v1/:postid/comments/:commentid
 * @access      PRIVATE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.editComment = async (req, res, next) => {
    res.status(200).json({ success: true, msg: "UPDATE COMMENT OF ID " + req.params.id });
}


/**
 * @description DELETE COMMENT [ BOTH CAN DELETE [ USER OF POST / USER OF COMMENT ]]
 * @Route       DELETE /api/v1/comments/:id OR /api/v1/:postid/comments/:commentid
 * @access      PUBLIC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteComment = async (req, res, next) => {
    res.status(200).json({ success: true, msg: "DELETE COMMENT OF ID " + req.params.id });
}