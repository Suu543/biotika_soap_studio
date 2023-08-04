import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // 해당 유저가 기술적으로는 다른 storeId를 훔칠 수 있다.
    // 비록 인증된 유저라도
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("CategorycategoryId is required", {
        status: 400,
      });
    }

    if (!colorId) {
      return new NextResponse("ColorId is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("SizeId is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("SizeId is required", { status: 400 });
    }

    //   기본값이 존재하기 때문에 체크하지 않음
    // if (!isFeatured) {
    //   return new NextResponse("IsFeatured is required", { status: 400 });
    // }

    // if (!isArchived) {
    //   return new NextResponse("IsArchived is required", { status: 400 });
    // }

    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      //  이말은 사용자가 자신의 Store가 없는 상태에서 다른 사용자의 Store를 업데이트 하려는 시도이기 때문에 방지되어함
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Unauthenticated: 사용자가 로그인하지 않았다.
    // Unauthorized: 사용자가 로그인은 했지만 권한은 없다

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST] - ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        // false대신 undefined을 하면 완전히 해당 필터를 무시함
        isFeatured: isFeatured ? true : undefined,
        // archived된 제품을 로드 할 수 없으니까
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
