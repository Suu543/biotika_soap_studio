import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH] - ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// req 인자를 사용하지 않더라도 항상 추가해줘야한다.
// 만약 사용하지 않는다면 _req 등의 컨벤션을 사용하면된다.
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    // userId 프로퍼티가 unique 값이 아니기 때문에 deleteMany를 사용함
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE] - ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
