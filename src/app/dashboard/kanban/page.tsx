"use client";

import React from "react";
import KanbanBoard from "@/components/kanban";

const page = () => {
  return (
    <main className="container mx-auto px-4">
      <h1 className="font-bold text-2xl pt-6 pb-6">Kanban Dashboard</h1>
      <KanbanBoard />
    </main>
  );
};

export default page;
