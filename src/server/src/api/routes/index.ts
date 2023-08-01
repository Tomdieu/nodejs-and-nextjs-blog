import { Router } from "express";
import userRoutes from "./UserRoutes";
import postRoutes from "./PostRoutes";
import fileRoutes from "./FileRoutes";
import commentRoutes from "./CommentRoutes";

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} username
 * @property {string|null} first_name
 * @property {string|null} last_name
 * @property {string} email
 * @property {string} password
 * @property {boolean} is_superuser
 * @property {Date} joined_on
 * @property {Token|null} token
 * @property {array<Post>} posts
 * @property {array<Like>} likes
 * @property {array<LoginHistory>} loginHistories
 */

/**
 * @typedef {object} LoginHistory
 * @property {number} id
 * @property {string|null} userAgent
 * @property {string|null} browser
 * @property {string|null} os
 * @property {boolean|null} isMobile
 * @property {string} ipAddress
 * @property {number} userId
 * @property {User} user
 */

/**
 * @typedef {object} Token
 * @property {number} id
 * @property {string} token
 * @property {number} userId
 * @property {User} user
 */

/**
 * @typedef {object} Post
 * @property {number} id
 * @property {string} content
 * @property {number} userId
 * @property {User} user
 * @property {array<PostMedia>} postMedia
 * @property {array<Like>} likes
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {object} PostMedia
 * @property {number} id
 * @property {number} postId
 * @property {Post} post
 * @property {array<Like>} likes
 * @property {number} fileId
 * @property {string} fileType
 * @property {File} file
 */

/**
 * @typedef {object} File
 * @property {number} id
 * @property {string} url
 * @property {array<PostMedia>} postMedia
 */

/**
 * @typedef {object} Like
 * @property {number} id
 * @property {number} userId
 * @property {User} user
 * @property {number|null} postId
 * @property {Post|null} post
 * @property {number|null} mediaId
 * @property {PostMedia|null} media
 */

/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {string} content
 * @property {number} postId
 * @property {Post} post
 * @property {number} userId
 * @property {User} user
 * @property {number|null} parentId
 * @property {array<Comment>} replies
 * @property {Comment|null} parent
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */


const routes = Router();

routes.use("/user", userRoutes);
routes.use("/posts",postRoutes);
routes.use("/files",fileRoutes)
routes.use("/comments",commentRoutes)

export default routes;
