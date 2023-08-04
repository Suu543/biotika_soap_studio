import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// export async function POST(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   const { productIds } = await req.json();

//   if (!productIds || productIds.length === 0) {
//     return new NextResponse("Product ids are required", { status: 400 });
//   }

//   const products = await prismadb.product.findMany({
//     where: {
//       id: {
//         in: productIds,
//       },
//     },
//   });

//   const line_items: any[] = [];

//   products.forEach((product) => {
//     line_items.push({
//       quantity: 1,
//       price_data: {
//         currency: "USD",
//         product_data: {
//           name: product.name,
//         },
//         unit_amount: product.price.toNumber() * 100,
//       },
//     });
//   });

//   const order = await prismadb.order.create({
//     data: {
//       storeId: params.storeId,
//       isPaid: false,
//       orderItems: {
//         create: productIds.map((productId: string) => ({
//           product: {
//             connect: {
//               id: productId,
//             },
//           },
//         })),
//       },
//     },
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: "payment",
//     billing_address_collection: "required",
//     phone_number_collection: {
//       enabled: true,
//     },
//     success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
//     cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
//     metadata: {
//       orderId: order.id,
//     },
//   });

//   return NextResponse.json(
//     { url: session.url },
//     {
//       headers: corsHeaders,
//     }
//   );
// }

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // 클라이언트로부터 JSON 형태의 데이터를 받아옴
  const { productIds } = await req.json();

  // 전달받은 productIds가 없거나 길이가 0인 경우, 클라이언트에게 400 Bad Request를 응답으로 반환
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // 데이터베이스에서 productIds에 해당하는 제품들을 조회
  // const products = await prismadb.product.findMany({
  //   where: {
  //     id: {
  //       in: productIds,
  //     },
  //   },
  // });

  // const line_items: any[] = [];

  // products.forEach((product) => {
  //   line_items.push({
  //     quantity: 1,
  //     price_data: {
  //       currency: "KRW",
  //       country: "KR",
  //     },
  //     // 소숫점이라서
  //     unit_amount: product.price.toNumber() * 100,
  //   });
  // });

  // const order = await prismadb.order.create({
  //   data: {
  //     storeId: params.storeId,
  //     isPaid: false,
  //     orderItems: {
  //       create: productIds.map((productId: string) => ({
  //         product: {
  //           connect: {
  //             id: productId,
  //           },
  //         },
  //       })),
  //     },
  //   },
  // });

  // store Hook을 하나 만들고, 결제이후 해당 데이터를 가져오도록 만들기
  // payment page ==> store Hook 데이터 추출 후 결제 완료시 redirect

  return NextResponse.json(
    {
      url: "http://localhost:3000/1bb0b403-a4f9-4adb-bc38-26b4471b46c5/payments",
    },
    {
      headers: corsHeaders,
    }
  );
}
