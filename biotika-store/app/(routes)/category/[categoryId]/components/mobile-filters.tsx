"use client";

import Button from "@/components/ui/button";
import { Size, Color } from "@/types";
import Filter from "./filter";

import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import { useState } from "react";
import IconButton from "@/components/ui/icon-button";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog Position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
            {/* Close Button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* Render the filters 
            filter 클릭시 변경된 url로 이동시켜주고, [categoryId]/page.tsx가
            과적으로 해당 url을 기준으로 제렌더링된다.
            */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
