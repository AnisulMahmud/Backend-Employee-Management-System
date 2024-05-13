const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find().sort({
      createdAt: -1,
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: "Error in getting employees" });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const loggedInUser = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const employee = await User.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // checking if the logged in user is not an admin and the id is not the same as the logged in user id
    if (loggedInUser.role !== "admin" && loggedInUser._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "You are not allowed to view this employee" });
    } else {
      return res.status(200).json(employee);
    }
  } catch (error) {
    res.status(400).json({ message: "Error in getting employee by id" });
  }
};

const addEmployee = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const newEmployee = await User.create({ username, password, role });
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(400).jso({ message: "Error in adding employee" });
  }
};

const updateEmployee = async (req, res) => {
  const { id: _id } = req.params;
  const loggedInUser = req.user;
  const update = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    if (loggedInUser.role === "admin") {
      try {
        const updateEmployee = await User.findByIdAndUpdate(_id, update, {
          new: true,
        });
        res.status(200).json(updateEmployee);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error in updating employee" });
      }
    } else if (loggedInUser.role === "employee") {
      if (loggedInUser._id.toString() !== _id) {
        return res
          .status(403)
          .json({ message: "You can only update your own data" });
      }

      const { password } = update;
      if (password) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const updateEmployee = await User.findByIdAndUpdate(
            _id,
            { password: hashedPassword },
            {
              new: true,
            }
          );
          res.status(200).json(updateEmployee);
        } catch (error) {
          console.error(error);
          res.status(400).json({ message: "Error in updating employee" });
        }
      } else {
        res
          .status(400)
          .json({ message: "You can't  update anythign rather than password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error in updating employee" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await User.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error in deleting employee" });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
