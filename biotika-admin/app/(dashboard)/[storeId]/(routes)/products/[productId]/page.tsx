// pages router를 사용하면 쉽게 해결할 수 있지만 new와 같은 라우터를, app router를 사용했기 때문에
// [productId] 트릭을 이용

import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  // product 존재 여부는 중요하지 않음
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    // populate
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 space-y-4">
        <ProductForm
          categories={categories}
          sizes={sizes}
          colors={colors}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
