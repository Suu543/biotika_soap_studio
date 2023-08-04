## Dynamic Routing

Next.js에서 `app/sign-up/[[...sign-up]]/page.tsx`와 같은 폴더 구성은 동적 라우팅(Dynamic Routing)을 구현하기 위한 방법입니다. Next.js는 동적 라우팅을 통해 URL 경로를 사용자 정의 데이터로 매핑할 수 있습니다.

`[[...sign-up]]`는 Next.js의 동적 경로 매개변수(Dynamic Route Segments)를 나타냅니다. 대괄호(`[ ]`)로 묶인 부분은 동적으로 변경되는 값이라는 의미이며, `...`은 여러 경로 세그먼트를 캡처할 수 있음을 나타냅니다.

예를 들어, `/app/sign-up/step1`과 같은 URL로 접근하면, `[[...sign-up]]` 부분은 `['step1']`과 같은 배열로 처리됩니다. 마찬가지로 `/app/sign-up/step1/step2`로 접근하면 `[[...sign-up]]`은 `['step1', 'step2']`와 같은 배열로 처리됩니다.

이런 동적 라우팅 구조를 사용하면 다양한 페이지 경로를 동적으로 처리할 수 있습니다. 예를 들어, 사용자 등록(sign-up) 프로세스를 여러 단계로 나누고자 할 때, `step1`, `step2`, `step3`과 같은 단계를 동적 경로 매개변수로 처리할 수 있습니다.

폴더 구조를 `app/sign-up/[[...sign-up]]/page.tsx`와 같이 구성하면, 각 단계에 해당하는 페이지 컴포넌트를 쉽게 구성할 수 있습니다. 예를 들어, `step1`에 해당하는 페이지는 `app/sign-up/step1/page.tsx`에, `step2`에 해당하는 페이지는 `app/sign-up/step2/page.tsx`에 위치시킬 수 있습니다.

이러한 폴더 구조는 코드를 구성하고 유지 관리하는 데 유연성을 제공하며, 복잡한 동적 경로를 처리하기 위해 편리한 방법을 제공합니다.

- https://clerk.com/docs/nextjs/get-started-with-nextjs
- https://ui.shadcn.com/docs/components/button
- https://ui.shadcn.com/docs/components/dialog
- https://ui.shadcn.com/docs/components/form
- https://ui.shadcn.com/docs/components/input

## react-hook-form

위의 코드는 Next.js에서 `react-hook-form`을 사용하여 폼을 처리하는 예시입니다. 에러가 발생했을 때 `FormMessage` 컴포넌트가 에러를 어떻게 추출하고 출력하는지 알려드리겠습니다.

`FormMessage` 컴포넌트는 `react-hook-form` 라이브러리에서 제공되는 컴포넌트로, 폼 필드에서 발생한 에러를 보여주는 역할을 합니다. 에러 메시지를 출력하려면 다음과 같은 절차를 따릅니다:

1. `FormMessage` 컴포넌트가 `react-hook-form`의 `Controller` 컴포넌트 내에 위치해야 합니다. 위의 코드에서는 `FormField` 컴포넌트 내에 `FormMessage` 컴포넌트가 있습니다.

2. `Controller` 컴포넌트는 `name` 속성을 사용하여 폼 필드와 연결됩니다. 위의 코드에서는 `name="name"`으로 설정된 폼 필드와 `FormMessage` 컴포넌트가 연결됩니다.

3. 폼을 제출하고 유효성 검사가 실패하면 `FormMessage` 컴포넌트가 에러 메시지를 표시합니다. `FormMessage` 컴포넌트는 자동으로 에러 메시지를 가져와 출력합니다.

   - `react-hook-form`의 `Controller` 컴포넌트에서 `name` 속성으로 연결된 폼 필드의 에러는 `FormMessage` 컴포넌트에 자동으로 전달됩니다.
   - `FormMessage` 컴포넌트는 `react-hook-form`의 `useFormContext` 훅을 사용하여 현재 폼의 상태를 액세스합니다.
   - `useFormContext`를 사용하여 폼 상태에서 에러를 가져와 `FormMessage` 컴포넌트에 출력합니다.

따라서, `FormMessage` 컴포넌트는 `Form` 컴포넌트 내의 `Controller` 컴포넌트로부터 자동으로 에러를 추출하여 출력합니다.

성공한 경우에도 FormMessage에 전달되어 성공 메세지가 출력되는거야?

아니요, 위의 코드에서는 성공 메시지를 `FormMessage` 컴포넌트로 전달하고 출력하지 않습니다. `FormMessage` 컴포넌트는 주로 폼 필드의 유효성 검사 실패 시 발생하는 에러 메시지를 처리하는 데 사용됩니다.

`react-hook-form` 라이브러리는 `FormMessage` 컴포넌트와 같은 에러 메시지 컴포넌트를 제공하여 폼 필드의 유효성 검사 결과를 출력하게 할 수 있습니다. 일반적으로 `FormMessage` 컴포넌트는 에러 메시지를 출력하기 위해 사용되지만, 성공 메시지를 처리하기 위해 별도의 컴포넌트나 로직이 필요합니다.

만약 성공 메시지를 처리하려면, 폼 제출이 성공했을 때 `react-hook-form`의 `onSubmit` 핸들러 내에서 적절한 로직을 추가해야 합니다. `onSubmit` 핸들러는 폼 제출 시 실행되는 함수로, 폼 데이터의 유효성 검사를 통과한 경우에만 호출됩니다. 해당 핸들러 내에서 성공 메시지를 처리하고 출력하도록 컴포넌트나 로직을 추가할 수 있습니다.

## Prisma Setup

```bash
npm install -D prisma
npm install @prisma/client
npx prisma init
```

- https://planetscale.com/

모델 정의 후

```bash
npx prisma generate
```

- 아직 PlanetScale에 전달되지는 않았지만, Prisma Client 모듈이 생성되고, 모델이 업데이트 됨
- generate를 실행하면 아래와 같이 prismadb 기능을 사용할 수 있는 것을 확인할 수 있다.

```typescript
// app/layout.tsx

const store = prismadb.store.delete;
const store = prismadb.store.update;
```

- 이제 정상적으로 동작한다면 PlanetScale에 반영하기

```bash
npx prisma db push
```

- 데이터베이스를 리셋하고 싶을 때

```bash
npx prisma migrate reset
npx prisma generate
npx prisma db push
```

## Store Switch (Navbar)

- https://ui.shadcn.com/docs/components/combobox
- https://ui.shadcn.com/docs/components/popover#installation
- https://ui.shadcn.com/docs/components/command#installation

## Settings Page

- https://ui.shadcn.com/docs/components/separator
- https://ui.shadcn.com/docs/components/alert
- https://ui.shadcn.com/docs/components/badge

위의 코드는 TypeScript의 타입 정의를 사용하여 `textMap`이라는 객체를 생성하는 부분입니다.

1. `Record<ApiAlertProps["variant"], string>`:

   - `Record`는 TypeScript에서 제공하는 유틸리티 타입 중 하나로, 특정 키와 값의 타입을 가진 객체를 생성하는 역할을 합니다.
   - `ApiAlertProps["variant"]`는 `ApiAlertProps` 타입의 `variant` 속성의 타입을 가져옵니다.
   - 예를 들어, `ApiAlertProps`가 다음과 같이 정의되어 있다면 `ApiAlertProps["variant"]`는 `"public" | "admin"`과 같은 유니온 타입이 됩니다.

   ```typescript
   type ApiAlertProps = {
     variant: "public" | "admin";
     // 다른 속성들...
   };
   ```

2. `textMap: Record<ApiAlertProps["variant"], string>`:

   - `textMap`은 `ApiAlertProps`의 `variant` 속성 값을 키로 사용하며, 각 `variant` 값에 대응하는 문자열을 값으로 가지는 객체입니다.
   - 예를 들어, `variant`가 `"public"`일 경우 `textMap["public"]`은 `"Public"`이고, `variant`가 `"admin"`일 경우 `textMap["admin"]`은 `"Admin"`이 됩니다.

   따라서, 이 코드의 목적은 `ApiAlertProps` 타입의 `variant` 값에 따라 `textMap` 객체를 사용하여 해당 `variant`에 대응하는 문자열을 가져오는 것입니다. 예를 들어, `ApiAlertProps` 객체의 `variant`가 `"public"`일 때 해당 `textMap`을 사용하여 "Public" 문자열을 가져올 수 있습니다.

## origin 변수

정확한 말씀드리자면, `origin`이라는 변수는 `window` 객체에서 직접 제공되는 것은 아닙니다. `window` 객체는 브라우저 환경에서 제공되는 전역 객체로, `origin`과 같은 일부 속성은 `window.location` 객체를 통해 접근할 수 있습니다.

`window.location` 객체에는 현재 페이지의 URL과 관련된 정보가 담겨있습니다. 이 객체의 `origin` 속성은 현재 페이지의 origin을 나타냅니다. Origin은 프로토콜(https, http 등), 호스트(domain), 포트 정보를 포함한 URL의 기본 주소를 의미합니다.

예를 들어, 현재 페이지의 URL이 `https://www.example.com:3000/some-page`라면, `window.location.origin`은 `https://www.example.com:3000`과 같은 형태가 됩니다.

그러나 주의할 점은 `window` 객체는 브라우저 환경에서만 사용 가능하며, 서버 측에서 실행되는 Next.js의 코드에서는 `window` 객체를 직접 사용할 수 없습니다. Next.js에서 서버 사이드 렌더링(Server-Side Rendering, SSR)을 하거나 정적 생성(Static Generation)을 사용하는 경우, `window` 객체가 없기 때문에 이러한 환경에서는 `window` 객체에 접근하려 할 때 에러가 발생할 수 있습니다.

서버 측 코드에서 `window` 객체에 접근해야 하는 경우에는 조건부 렌더링을 사용하거나 브라우저 API를 사용하는 코드 블록을 `useEffect`와 같은 클라이언트 측에서 실행되는 훅을 활용하여 처리해야 합니다. 이렇게 하면 브라우저와 관련된 코드는 클라이언트 측에서만 실행되며, 서버 측에서는 실행되지 않아 오류를 방지할 수 있습니다.

```typescript
// use-origin Hook을 사용하지 않은 경우 동작하는 이유는
// window.location.origin이 동작하기 때문입니다.
// window.location은 global이기 때문에 동작함

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
```

## Billboard Schema

Billboard Schema를 추가하고 다음 명령어를 실행해야 반영됩니다.

```bash
npx prisma generate
# PlanetScale에 반영
npx prisma db push
```

## Image Upload - Cloudinary

- https://next.cloudinary.dev/
- https://cloudinary.com/

## Data Table

- https://ui.shadcn.com/docs/components/data-table
- https://ui.shadcn.com/docs/components/dropdown-menu

## Model Modifcation

```bash
npx prisma generate
npx prisma db push
```

## Select

- https://ui.shadcn.com/docs/components/select

## Model Modifcation

```bash
npx prisma generate
npx prisma db push
```

## Product - Price Checkbox

- https://ui.shadcn.com/docs/components/checkbox
