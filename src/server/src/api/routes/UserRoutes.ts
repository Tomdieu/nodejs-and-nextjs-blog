import { Router } from "express";
import UserController from "../controllers/UserController";
import authenticate from "../middleware/authenticate";
import validateResource from "../middleware/validateResource";
import { createUserSchema, loginSchema, updateUserSchema } from "../schema/user.schema";

const router = Router();

/**
 * @typedef {object} User
 * @property {string} username.required - Username
 * @property {string} email.required - User email
 * @property {string} joined_on - Date the user joined
 */
/**
 * Login
 * @typedef {object} Login
 * @property {string} username.required - The username
 * @property {string} password.required - The user password
 */

/**
 * LoginResponse
 * @typedef {object} LoginResponse
 * @property {User} user - User data
 * @property {string} token - User token
 */

/**
 * @typedef {object} Register
 * @property {string} username.required - Username
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 */

/**
 * @typedef {object} ErrorResponse
 * @property {string} error.required - Error message
 */

/**
 * GET /api/user/
 * @summary List all the users
 * @tags User
 * @returns {array<User>} 200 - Success response - application/json
 * @returns {ErrorResponse} 500 - Unexpected error
 */
router.get("/",authenticate, UserController.getAllUsers);

/**
 * POST /api/user/login/
 * @summary Login a user
 * @tags User
 * @param {Login} request.body.required
 * @returns {LoginResponse} 201 - The created user
 * @returns {ErrorResponse} 401 - Bad request
 */
router.post("/login",validateResource(loginSchema) ,UserController.authenticate);

/**
 * POST /api/user/
 * @tags User
 * @summary Register a user
 * @param {Register} request.body.required - The new user information
 * @returns {LoginResponse} 201 - The created user
 * @returns {ErrorResponse} 400 - Bad request
 */
router.post("/",validateResource(createUserSchema), UserController.createUser);

/**
 * GET /api/user/{id}/
 * @tags User
 * @summary Retrieve a user
 * @param {number} id.path.required user id
 * @returns {User} 200 - Success response
 * @returns {ErrorResponse} 404 - Not Found
 * @return {ErrorResponse} 500 -  Server Error
 */
router.get("/:id/", UserController.getUser);

/**
 * PUT /api/user/{id}/
 * @tags User
 * @summary Update a user
 * @param {Login} request.body.required
 * @param {number} id.path.required user id
 * @returns {User} 200 - Success response
 * @returns {ErrorResponse} 404 - Not Found
 * @return {ErrorResponse} 500 -  Server Error
 */
router.put("/:id/",validateResource(updateUserSchema), UserController.updateUser);
/**
 * PUT /api/user/{id}/
 * @tags User
 * @summary Update a user
 * @param {Login} request.body.required
 * @param {number} id.path.required user id
 * @returns {User} 200 - Success response
 * @returns {ErrorResponse} 404 - Not Found
 * @return {ErrorResponse} 500 -  Server Error
 */
router.patch("/:id/",validateResource(updateUserSchema), UserController.updateUser);

/**
 * DELETE /api/user/{id}/
 * @tags User
 * @summary Delete a user
 * @param {number} id.path.required
 * @returns {object} 204 - No Content
 * @returns {ErrorResponse} 404 - Not Found
 */

router.delete("/:id/", UserController.deleteUser);

/**
 * GET /api/user/data/
 * @tags User
 * @summary Retrieve the user data
 * @returns {User} 200 - Success response
 * @returns {ErrorResponse} 404 - Not Found
 * @return {ErrorResponse} 500 -  Server Error
 */
router.get("/data/",authenticate,UserController.getUser)

const userRoutes = router;
export default userRoutes;
