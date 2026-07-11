"use client";

import { trackEvent } from "@/lib/MetaEvent";
import { useEffect, useRef } from "react";

type PurchaseItem = {
  productId: string;
  quantity: number;
};

type MetaPurchaseProps = {
  orderId: string;
  items: PurchaseItem[];
  totalPrice: number;
};

export default function MetaPurchase({
  orderId,
  items,
  totalPrice,
}: MetaPurchaseProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    trackEvent("Purchase", {
      content_ids: items.map((item) => item.productId),
      content_type: "product",
      num_items: items.reduce((total, item) => total + item.quantity, 0),
      value: totalPrice,
      currency: "PKR",
      order_id: orderId,
    });
  }, [orderId, items, totalPrice]);

  return null;
}