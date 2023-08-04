import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// 만약 globalThis Prisma가 존재한다면 그대로 사용하고, 그렇지 않다면 새로운 인스턴스 생성
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

// console.log("Prisma");

export default prismadb;
