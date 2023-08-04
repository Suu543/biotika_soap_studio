// pages router를 사용하면 쉽게 해결할 수 있지만 new와 같은 라우터를, app router를 사용했기 때문에
// [categoryId] 트릭을 이용

import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  // billboard 존재 여부는 중요하지 않음
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  // 현재 store에 생성된 모든 billboard를 검토
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 space-y-4">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
