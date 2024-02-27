import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { email, role, password, department, order } = req.body;
      const user = await userService.createUser(
        email,
        role,
        department,
        order,
        password ?? undefined
      );
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.updateUserPassword(email, password);
    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { email } = req.body;
    await userService.deleteUser(email);
    res.status(204).json({
      message: "User deleted successfully",
    });
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    res.status(200).json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }

  async getByOrder(req: Request, res: Response) {
    const users = await userService.getByOrder();
    res.status(200).json(users);
  }

  async getAllDepartmentAndOrder(req: Request, res: Response) {
    const users = await userService.getAllDepartmentAndOrder();
    res.status(200).json(users);
  }

  async updateUserOrder(req: Request, res: Response) {
    const { order, email } = req.body;
    const user = await userService.updateUserOrder(email, order);
    res.status(200).json(user);
  }
}
