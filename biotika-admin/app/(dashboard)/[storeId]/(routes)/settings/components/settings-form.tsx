"use client";

import * as z from "zod";
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  // built-in으로 제공하는 origin을 사용하면 SSR 특징 때문에 Hydration 오류가 발생할 수 있다.
  // 새로고침하면 origin이 점점 완성되는 것을 확인할 수 있다.
  const origin = useOrigin();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("origin: ", origin);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    // console.log(data);
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);

      // 새로고침을 통해 변경 사항을 반영하려고
      router.refresh();
      toast.success("Store Updated...");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      // Store를 삭제하고 홈페이지로 전환되었을 때, 해당 계정의 사용자가 다른 스토어가 있다면, 그 스토어가 렌더링되고, 그렇지 않은 경우 Store 생성 여부를 묻는 로직
      router.push("/");
      toast.success("Store Deleted...");
    } catch (error) {
      // 이후에 Relation Cascading을 통해 Store를 삭제하면 관련된 모든 제품과 카테고리가 삭제되도록 구성해야함
      toast.error("Make sure you removed all products and categories first...");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Store Preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4 " />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            {/* name is referring to a property */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  {/* 알아서 Error 발생시 에러 처리해주는 컴포넌트 */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};
