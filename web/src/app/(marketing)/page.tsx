import { Home } from "@/components/Home";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Groq Code",
  description: "Write code. Don't blink",
};

export default async function Page() {
  return <Home />;
}
