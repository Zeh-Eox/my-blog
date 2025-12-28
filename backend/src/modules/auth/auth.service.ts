import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";
import type { RegisterUser, LoginUser, RegisterResponse, LoginResponse } from "../../types";
import { signToken } from "../../utils/jwt";
import { AuthError } from "../../utils/errors";


export const registerUser = async (data: RegisterUser): Promise<RegisterResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AuthError("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      fullName: data.fullName,
      userName: data.userName,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      fullName: true,
      userName: true,
      email: true,
      createdAt: true,
    },
  });
}

export const loginUser = async (data: LoginUser): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AuthError("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AuthError("Invalid credentials");
  }

  const token = signToken(user.id)

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
}