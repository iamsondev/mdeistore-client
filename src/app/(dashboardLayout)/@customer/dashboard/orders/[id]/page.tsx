import { customerService } from "@/services/customer.service";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await customerService.getOrderById(id);
  const order = data?.data;

  if (!order) {
    return <p className="text-red-500">Order not found!</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      <div className="border rounded-xl p-6 space-y-4">
        <div className="flex justify-between">
          <p className="text-sm text-zinc-500">Order ID: {order.id}</p>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            {order.status}
          </span>
        </div>
        <p>📍 {order.address}</p>
        <p>💳 {order.paymentMethod}</p>
        <div className="border-t pt-4 space-y-2">
          {order.orderItems?.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.medicine?.name} x{item.quantity}
              </span>
              <span>৳{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>
            ৳
            {order.orderItems
              ?.reduce(
                (acc: number, item: any) => acc + item.price * item.quantity,
                0,
              )
              .toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
