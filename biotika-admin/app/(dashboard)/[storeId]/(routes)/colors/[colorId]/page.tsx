// pages router를 사용하면 쉽게 해결할 수 있지만 new와 같은 라우터를, app router를 사용했기 때문에
// [billboardId] 트릭을 이용

import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  // billboard 존재 여부는 중요하지 않음
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 space-y-4">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
