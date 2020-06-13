const AccountModel = require("../account/AccountModel");
const EmployeeModel = require("../employee/EmployeeModel");
const employeeHelper = require("../employee/employeeHelpers");
const accountHelper = require("../account/AccountHelpers");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

class AuthServices {
  async login({ username, password }) {
    if (!username)
      return {
        status: 400,
        msg: "Username is required",
      };

    if (!password)
      return {
        status: 400,
        msg: "Password is required",
      };

    const account = await accountHelper.findAccount(username);

    if (!account)
      return {
        status: 404,
        msg: "Account is not exist",
      };

    if (!(await bcrypt.compare(password, account.password)))
      return {
        status: 404,
        msg: "Password not match",
      };

    const token = jwt.sign(
      { employeeId: account.employeeId },
      config.jwtSecret,
      { expiresIn: "12hr" }
    );

    return {
      msg: "Welcome, Sudostaff Employee!",
      status: 200,
      data: token,
    };
  }

  async logout(res) {
    res.locals.user = null;
    console.log("Current user: ", res.locals.user);
    return {
      msg: "Logged Out",
      status: 200,
    };
  }

  async getUser(res) {
    const user = res.locals.user;

    console.log(user);

    if (!user)
      return {
        msg: "Unauthorized login",
        status: 401,
      };

    const result = await EmployeeModel.findByPk(user.employeeId, {
      attributes: [
        "firstName",
        "lastName",
        "fullName",
        "id",
        "designationId",
        "photoId",
      ],
      include: employeeHelper.joinTable({
        withPhoto: true,
        withDesignation: true,
      }),
    });

    return {
      msg: "Logged in",
      status: 200,
      data: employeeHelper.flatten(result.get({ plain: true })),
    };
  }
}

module.exports = new AuthServices();