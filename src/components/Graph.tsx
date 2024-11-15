"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked area chart";

const chartData = [
  { month: "January", pymes: 186, granEmpresa: 80 },
  { month: "February", pymes: 305, granEmpresa: 200 },
  { month: "March", pymes: 237, granEmpresa: 120 },
  { month: "April", pymes: 73, granEmpresa: 190 },
  { month: "May", pymes: 209, granEmpresa: 130 },
  { month: "June", pymes: 214, granEmpresa: 140 },
];

const chartConfig = {
  pymes: {
    label: "Pymes",
    color: "hsl(var(--chart-1))",
  },
  granEmpresa: {
    label: "Empresas grandes",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Graph() {
  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold dark:text-purple-200 mb-4">
          ¡Lleva tu negocio al siguiente nivel!
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          promedio de empresas que han incrementado sus ventas con nosotros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="granEmpresa"
              type="natural"
              fill="var(--color-granEmpresa)"
              fillOpacity={0.4}
              stroke="var(--color-granEmpresa)"
              stackId="a"
            />
            <Area
              dataKey="pymes"
              type="natural"
              fill="var(--color-pymes)"
              fillOpacity={0.4}
              stroke="var(--color-pymes)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tendencia al alza del 5.2% este mes{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Enero - Junio 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
