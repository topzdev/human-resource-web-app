const employeeController = require("./EmployeeController");
const Express = require("express");
const router = Express.Router();

router.get("/:id", employeeController.fetchSingleEmployee);
router.get("/", employeeController.fetchEmployees);
router.get("/check/:id", employeeController.checkExist);
router.put("/", employeeController.updateEmployee);
router.post("/", employeeController.createEmployee);
router.delete("/:id", employeeController.removeEmployee);
router.delete("/perma/:id", employeeController.deleteEmployee);

module.exports = router;
