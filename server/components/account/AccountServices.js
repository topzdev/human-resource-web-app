const models = require("../models");
const helper = require("./AccountHelpers");
const bcrypt = require("bcryptjs");

class AccountServices {
  async getOne({ id }) {
    const result = await models.Account.findOne({
      attribute: ["id", "isAdmin"],
      where: { employeeId: id },
      plain: true,
      include: [
        {
          model: models.Employee,
          as: "employee",
          attribute: ["fullName", "lastName", "firstName"],
        },
      ],
    });

    return {
      status: 200,
      msg: "Account Successfully Fetched",
      data: result,
    };
  }

  async create({ employeeId, birthDate, lastName }) {
    console.log("ACCOUNT ", employeeId, birthDate, lastName);

    const { username, password, rawPassword } =
      await helper.genDefaultCredential(employeeId, birthDate, lastName);

    const result = await models.Account.create({
      username,
      employeeId,
      password,
    });

    return {
      status: 200,
      msg: "Account Created Successfully",
      data: {
        username,
        password: rawPassword,
      },
    };
  }

  async updatePassword({
    username,
    newPassword,
    currentPassword,
    confirmPassword,
  }) {
    const account = await helper.findAccount(username);

    if (!account)
      return {
        status: 404,
        msg: "Account not found.",
      };

    if (!(await bcrypt.compare(currentPassword, account.password)))
      return {
        status: 400,
        msg: "Current password not match",
      };

    if (!(newPassword === confirmPassword)) {
      return {
        status: 400,
        msg: "New password not match with confirm password",
      };
    }

    if (newPassword.length <= 5) {
      return {
        status: 400,
        msg: "New password is too short",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const result = await models.Account.update(
      { password: hashPassword },
      {
        where: {
          id: account.id,
        },
      }
    );

    return {
      status: 200,
      msg: "Account Password Successfully Changed",
    };
  }

  async updateUsername({ employeeId, newUsername, password }) {
    const account = await helper.findAccount(employeeId);

    if (!account)
      return {
        status: 404,
        msg: "Account not found.",
      };

    if (!(await bcrypt.compare(password, account.password)))
      return {
        status: 400,
        msg: "Old Password not match",
      };

    const username = newUsername.toLowerCase();

    const result = await models.Account.update(
      { username },
      {
        where: {
          id: account.id,
        },
      }
    );

    return {
      status: 200,
      msg: "Account Username Successfully Changed",
      data: username,
    };
  }

  async resetAccount({ employeeId }) {
    const employeeInfo = await helper.employeeInfo(employeeId);

    if (!employeeInfo)
      return {
        status: 404,
        msg: "Employee Information not found",
      };

    console.log(employeeInfo);

    const { username, password, rawPassword } =
      await helper.genDefaultCredential(
        employeeInfo.id,
        employeeInfo.birthDate,
        employeeInfo.lastName
      );

    const result = await models.Account.update(
      { username, password },
      {
        where: {
          employeeId: employeeInfo.id,
        },
      }
    );

    return {
      status: 200,
      msg: "Account Reset Successfully",
      data: {
        username,
        password: rawPassword,
      },
    };
  }

  async setAsAdmin({ employeeId, isAdmin }) {
    console.log("Account Set Admin", employeeId, isAdmin);
    const employeeInfo = await models.Account.update(
      {
        isAdmin,
      },
      {
        where: {
          employeeId,
        },
      }
    );

    return {
      status: 200,
      msg: "Update Account",
      data: {
        updated: true,
        isAdmin,
      },
    };
  }
}

module.exports = new AccountServices();
