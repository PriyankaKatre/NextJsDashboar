import { metadata } from "./metadata";
import { Metadata } from "next";

export const PageMetadata: Metadata = metadata;

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button className="bg-red-500">Click me</Button>
    </div>
  );
}
