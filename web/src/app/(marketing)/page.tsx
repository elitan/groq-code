import { Home } from "@/components/Home";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello",
  description: "Write code. Don't blink",
};

export default async function Page() {
  return <Home />;
}
