import { User } from "@prisma/client";

export interface UserObject extends Omit<User, "password"> {}
