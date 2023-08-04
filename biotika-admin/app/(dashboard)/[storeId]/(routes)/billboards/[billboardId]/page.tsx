// pages router를 사용하면 쉽게 해결할 수 있지만 new와 같은 라우터를, app router를 사용했기 때문에
// [billboardId] 트릭을 이용

import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  // billboard 존재 여부는 중요하지 않음
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
