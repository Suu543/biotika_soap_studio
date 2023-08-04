import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    // 현재 로그인 한 사용자 정보에 접근할 수 있다.
    // 로그인 한 사람만 Store 생성이 가능하기 때문에 name만 추출, 이미 userId는 추출가능
    const { userId } = auth();
    const body = await req.json();

    // id, createdAt, updatedAt은 자동 생성이기 때문에, userId and name만 필요
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized: 권한이 없습니다.", {
        status: 401,
      });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    // 문제 발생시 문제 발생 지점을 쉽게 확인할 수 있다.
    console.log(`[STORES_POST] - `, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
