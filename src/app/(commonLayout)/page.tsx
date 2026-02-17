import { Button } from "@/components/ui/button";
import { customerService } from "@/services/customer.service";

export default async function Home() {
  const { data } = await customerService.getsession();
  console.log(data);
  return (
    <div>
      <Button className="bg-emerald-500">click here</Button>
    </div>
  );
}
