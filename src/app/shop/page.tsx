const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function ShopPage() {
  await delay(2000);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">This is Shop page component</h1>
    </div>
  );
}
