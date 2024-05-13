const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/role");
const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin"]),
  getEmployees
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "employee"]),
  getEmployeeById
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin"]),
  addEmployee
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "employee"]),
  updateEmployee
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin"]),
  deleteEmployee
);

module.exports = router;
