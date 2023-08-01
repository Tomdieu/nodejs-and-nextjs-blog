import { Router } from "express";
import PostController from "../controllers/PostContoller";


import multer from "multer";
import storage from '../../utils/storage';
import authenticate from "../middleware/authenticate";

const router = Router()

router.use(authenticate)

const upload = multer({storage})

/**
 * @typedef {object} PostMedia
 * @property {number} id
 * @property {number} post_id
 * @property {number} media_id
 * @property {string} media_type
 */

/**
 * @typedef {object} Post
 * @property {string} content - The content of the string
 * @property {array<PostMedia>} media
 */


/**
 * @typedef {object} createPost
 * @property {string} content.required - The post content
 * @property {array<string>} media - media files image or video - binary
 */

/**
 * GET /api/posts/
 * @summary list all post
 * @tags Post
 * @returns {array<Post>} 200 - Success response
 */
router.get('/',PostController.getAllPosts)

/**
 * GET /api/posts/{id}/
 * @summary retrieve a post
 * @tags Post
 * @param {number} id.path.required 
 * @returns {Post} 200 - Success response
 */
router.get('/:id/',PostController.getPost)


/**
 * POST /api/posts/
 * @summary create a post
 * @tags Post
 * @param {createPost} request.body.required - Post info - multipart/form-data
 * @returns {Post} 200 - Success response
 * @returns {ErrorResponse} 403
 */
router.post('/',upload.array('media',100),PostController.createPost)

/**
 * PATCH /api/posts/{id}
 * @summary create a post
 * @tags Post
 * @param {string} content.formData - The post content
 * @consumes multipart/form-data
 * @returns {Post} 200 - Success response
 * @returns {ErrorResponse} 403
 */
router.patch('/:id',upload.array('media',100),PostController.updatePost)
/**
 * PUT /api/posts/{id}/
 * @summary create a post
 * @tags Post
 * @param {string} content.formData - The post content
 * @param {number} id.path.required 
 * @consumes multipart/form-data
 * @returns {Post} 200 - Success response
 * @returns {ErrorResponse} 403
 */
router.put('/:id',upload.array('media',100),PostController.updatePost)
/**
 * DELETE /api/posts/{id}/
 * @summary delete a post
 * @tags Post
 * @param {number} id.path.required 
 * @returns {object} 204 - No Content
 */
router.delete('/',PostController.deletePost)

/**
 * GET /api/posts/{id}/comments
 * @summary get the comments of a post
 * @tags Post
 * @param {number} id.path.required 
 * @returns {object} 200 - Success
 */
router.get('/:id/comments',PostController.getComments)

const postRoutes = router;

export default postRoutes