import { Home } from "@/components/Home";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
  description: "Created by j4pp",
};

export default async function Page() {
  return <Home />;
}
