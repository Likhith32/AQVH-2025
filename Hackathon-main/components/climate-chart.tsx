"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Thermometer, Wind } from "lucide-react"

interface ClimateData {
  timestamp: number
  temperature: number
  humidity: number
  airQuality: number
  windSpeed: number
  pressure: number
  uvIndex: number
}

interface ClimateChartProps {
  data: ClimateData[]
}

export function ClimateChart({ data }: ClimateChartProps) {
  const chartData = data.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: item.temperature,
    humidity: item.humidity,
    airQuality: item.airQuality,
    windSpeed: item.windSpeed,
  }))

  const chartConfig = {
    temperature: {
      label: "Temperature",
      color: "hsl(var(--chart-1))",
    },
    humidity: {
      label: "Humidity",
      color: "hsl(var(--chart-2))",
    },
    airQuality: {
      label: "Air Quality",
      color: "hsl(var(--chart-3))",
    },
    windSpeed: {
      label: "Wind Speed",
      color: "hsl(var(--chart-4))",
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-chart-1" />
            <CardTitle>Temperature & Humidity</CardTitle>
          </div>
          <CardDescription>Real-time environmental conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={false}
                  name="Temperature (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  dot={false}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-chart-3" />
            <CardTitle>Air Quality & Wind</CardTitle>
          </div>
          <CardDescription>Environmental quality metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="airQuality"
                  stroke="var(--color-chart-3)"
                  fill="var(--color-chart-3)"
                  fillOpacity={0.3}
                  name="Air Quality Index"
                />
                <Area
                  type="monotone"
                  dataKey="windSpeed"
                  stroke="var(--color-chart-4)"
                  fill="var(--color-chart-4)"
                  fillOpacity={0.2}
                  name="Wind Speed (km/h)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
