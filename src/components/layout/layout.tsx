export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>This is Dashboard Layout</h1>
      {children}
    </div>
  );
}
