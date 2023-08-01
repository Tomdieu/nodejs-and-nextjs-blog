import { Router } from "express";
import CommentController from "../controllers/CommentController";

const router = Router();

/**
 * @typedef {object} CreateComment
 * @property {number} postId.required
 * @property {string} content.required
 * @property {number|null} parentId
 */

/**
 * @typedef {object} updateComment
 * @property {string} content.required
 */

/**
 * GET /api/comments/
 * @summary list all comments
 * @tags Comment
 * @returns {array<Comment>} 200 - Success
 */
router.get("/", CommentController.getAllComments);

/**
 * GET /api/comments/{id}/
 * @summary list all comments
 * @tags Comment
 * @returns {Comment} 200 - Success
 */
router.get("/:id/", CommentController.retrieveComment);

/**
 * POST /api/comments/
 * @summary create a comment
 * @tags Comment
 * @param {CreateComment} request.body.required
 */
router.post("/", CommentController.createComment);

/**
 * PUT /api/comments/{id}/
 * @summary updated a comment
 * @tags Comment
 * @param {updateComment} request.body.required
 */
router.put("/:id/", CommentController.updateComment);

/**
 * PATCH /api/comments/{id}/
 * @summary updated a comment
 * @tags Comment
 * @param {updateComment} request.body.required
 */
router.patch("/:id/", CommentController.updateComment);

/**
 * DELETE /api/comments/{id}/
 * @summary delete a comment
 * @tags Comment
 */
router.delete("/:id/", CommentController.deleteComment);

const commentRoutes = router;

export default commentRoutes;
