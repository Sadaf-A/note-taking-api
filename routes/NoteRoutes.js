const express = require("express");
const router = express.Router();
const noteController = require("../controllers/NoteController");

/**
 * @apiDefine Note Success Response
 * @apiSuccess {Object} data Note data.
 * @apiSuccess {String} data.title Note title.
 * @apiSuccess {String} data.content Note content.
 */

/**
 * @api {post} /notes Create a new note
 * @apiGroup Notes
 * @apiParam {String} title Note title (minimum 3, maximum 50 characters).
 * @apiParam {String} content Note content (minimum 3, maximum 500 characters).
 * @apiUse Note
 * @apiSuccessExample {json} Success Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "title": "Example Title",
 *     "content": "Example Content"
 *   }
 */
router.post("/notes", noteController.createNote);

/**
 * @api {get} /notes/get Get all notes
 * @apiGroup Notes
 * @apiUse Note
 * @apiSuccessExample {json} Success Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "title": "Note 1",
 *       "content": "Content 1"
 *     },
 *     {
 *       "title": "Note 2",
 *       "content": "Content 2"
 *     }
 *   ]
 */
router.get("/notes/get", noteController.getNotes);

/**
 * @api {put} /notes/:noteId Update a note by ID
 * @apiGroup Notes
 * @apiParam {String} noteId Note ID.
 * @apiParam {String} title Note title (minimum 3, maximum 50 characters).
 * @apiParam {String} content Note content (minimum 3, maximum 500 characters).
 * @apiUse Note
 * @apiSuccessExample {json} Success Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "title": "Updated Title",
 *     "content": "Updated Content"
 *   }
 */
router.put("/notes/:noteId", noteController.updateNote);

/**
 * @api {delete} /notes/:noteId Delete a note by ID
 * @apiGroup Notes
 * @apiParam {String} noteId Note ID.
 * @apiUse Note
 * @apiSuccessExample {json} Success Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "title": "Deleted Title",
 *     "content": "Deleted Content"
 *   }
 */
router.delete("/notes/:noteId", noteController.deleteNote);

module.exports = router;