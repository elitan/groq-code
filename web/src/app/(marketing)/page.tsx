import { Home } from "@/components/Home";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Groq Python",
  description: "",
};

export default async function Page() {
  return <Home />;
}
