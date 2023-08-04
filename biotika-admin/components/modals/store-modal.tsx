"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    // Todo: Create Store
    try {
      // 제출되는 동안 버튼 선택을 막기위해
      setLoading(true);

      // throw new Error("X!!"); // 오류 테스트 목적

      const response = await axios.post("/api/stores", values);
      // console.log(response.data);
      // toast.success("Store Successfully Created!!!");

      // Store 생성 후 바로 Redirect
      // window.location.assign은 완전한 페이지 새로고침을 하기 때문에 적용함.
      // router를 사용하면 데이터 싱크가 맞지 않을 수 있기 때문에 사용에 유의해야함.
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="py-2 pb-4 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {/* field => onChange, onBlur, value, name, ref */}
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    {/* Submit 동작 발생시 오류발생하면 오류가 FormMessage에 맵핑되어 출력됨 */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
