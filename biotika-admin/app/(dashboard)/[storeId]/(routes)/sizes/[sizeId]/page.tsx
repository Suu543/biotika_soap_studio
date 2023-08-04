// pages router를 사용하면 쉽게 해결할 수 있지만 new와 같은 라우터를, app router를 사용했기 때문에
// [billboardId] 트릭을 이용

import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  // billboard 존재 여부는 중요하지 않음
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 space-y-4">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
