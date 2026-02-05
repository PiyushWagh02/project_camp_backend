import { Router } from "express";

import { validate } from "../middlewares/validator.middleware.js";

import {
    deleteMember, updateMemberRole, getProjectMembers, addMembersToProject, deleteProject,
    updateProject, createProject, getProjectById, getProjects
} from "../controllers/project.controllers.js"

import { verifyJWT,validateProjectPermission } from "../middlewares/auth.middleware.js"
import { addMembertoProjectValidator,createProjectValidator } from "../validators/index.js"
import { UserRolesEnum } from "../utils/constants.js";
const router = Router();

router.use(verifyJWT)

router 
.route("/")
.get(getProjects)
.post(createProjectValidator(),validate,createProject);

router 
.route("/:projectId")
.get(validateProjectPermission(),getProjectById)
.put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject
)
.delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteProject
)

router
.route("/:projectId/members/:userId")
.get(getProjectMembers)
.post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMembertoProjectValidator(),
    validate,
    addMembersToProject

)

router
 .route("/:projectId/members/:userId")
 .put(validateProjectPermission([UserRolesEnum.ADMIN]),
 updateMemberRole)
 .delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteMember);







export default router