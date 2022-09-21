import {
  verifyToken,
  isAdminTu,
  isActivated,
} from "../middlewares/auth.middleware.js";
import {
  showProfile,
  updateProfile,
} from "../controllers/users/administration.controller.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const AdministrationRoutes = (app) => {
  app.use(headers);

  router.get("/tu/profile", verifyToken, isActivated, isAdminTu, showProfile);
  router.put("/tu/profile", verifyToken, isActivated, isAdminTu, updateProfile);

  app.use("/api/admin", router);
};

export default AdministrationRoutes;