"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useAsync } from "react-use";
import { Heading } from "@/components/ui/heading";

// NEXT_PUBLIC_TOSS_CLIENT_SECRET=
// NEXT_PUBLIC_TOSS_SECRET_KEY=

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";
const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY || "";

const PaymentPage = () => {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const [price, setPrice] = useState(0);

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price }
    );

    // ------  이용약관 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement("#agreement");

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  return (
    <main className="flex flex-col items-center">
      <Heading title="결제" description="토스결제" />
      <span>{price.toLocaleString()}원</span>

      {/*  */}
      <div>
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setPrice(event.target.checked ? price - 5_000 : price + 5_000);
            }}
          />
          5,000원 할인 쿠폰 적용
        </label>
      </div>
      <div id="payment-widget" className="w-full" />
      <div id="agreement" className="w-full" />
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            await paymentWidget?.requestPayment({
              orderId: nanoid(),
              orderName: "토스 티셔츠 외 2건",
              customerName: "김토스",
              customerEmail: "customer123@gmail.com",
              successUrl: `${window.location.origin}/success`,
              failUrl: `${window.location.origin}/fail`,
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        결제하기
      </button>
    </main>
  );
};

export default PaymentPage;
