import { Router } from "express";
import FileController from "../controllers/FileController";

const router = Router();

/**
 * @typedef {object} FileResponse
 * @property {number} id
 * @property {string} url
 */

/**
 * GET /api/files/
 * @tags File
 * @summary Gets all files
 * @return {array<FileResponse>} 200 - Success
 */

router.get("/", FileController.list);

/**
 * GET /api/files/{id}/
 * @tags File
 * @summary Gets a files
 * @param {number} id.path.required
 * @return {FileResponse} 200 - Success
 */
router.get("/:id/", FileController.retrieve);

/**
 * PUT /api/files/{id}/
 * @tags File
 * @summary updates a files
 * @param {number} id.path.required
 * @return {FileResponse} 200 - Success
 */
router.put("/:id/", FileController.update);

/**
 * PATCH /api/files/{id}/
 * @tags File
 * @summary updates a files
 * @param {number} id.path.required
 * @return {FileResponse} 200 - Success
 */
router.patch("/:id/", FileController.update);

/**
 * DELETE /api/files/{id}/
 * @tags File
 * @summary delete a files
 * @param {number} id.path.required
 * @return {File} 200 - Success
 */
router.delete("/:id/", FileController.delete);

const fileRoutes = router;

export default fileRoutes;
