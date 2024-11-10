"use client";

import React from "react";
import Line from "@/components/graph/line";
import Bar from "@/components/graph/Bar";
import DynamicTable from "@/components/graph/table";
import { Card, CardContent } from "@/components/ui/card";

const LineChartComponent = () => {
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <Card>
            <CardContent>
              <Line />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <Card>
            <CardContent>
              <Bar />
            </CardContent>
          </Card>
        </div>
      </div>
      <DynamicTable />
    </>
  );
};

export default LineChartComponent;
