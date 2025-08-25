"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Droplets, Wind, Sun, Gauge, MapPin, Activity, CheckCircle, AlertCircle } from "lucide-react"

interface ClimateData {
  timestamp: number
  temperature: number
  humidity: number
  airQuality: number
  windSpeed: number
  pressure: number
  uvIndex: number
}

interface SensorGridProps {
  currentData: ClimateData
}

export function SensorGrid({ currentData }: SensorGridProps) {
  const sensors = [
    {
      id: "temp-01",
      name: "Temperature Sensor",
      location: "Field A - North",
      value: currentData.temperature.toFixed(1),
      unit: "°C",
      status: "online",
      icon: Thermometer,
      color: "text-chart-1",
    },
    {
      id: "hum-01",
      name: "Humidity Sensor",
      location: "Field A - Center",
      value: currentData.humidity.toFixed(0),
      unit: "%",
      status: "online",
      icon: Droplets,
      color: "text-chart-2",
    },
    {
      id: "wind-01",
      name: "Wind Speed Sensor",
      location: "Weather Station",
      value: currentData.windSpeed.toFixed(1),
      unit: "km/h",
      status: "online",
      icon: Wind,
      color: "text-chart-3",
    },
    {
      id: "uv-01",
      name: "UV Index Sensor",
      location: "Field B - South",
      value: currentData.uvIndex.toFixed(1),
      unit: "UVI",
      status: "online",
      icon: Sun,
      color: "text-chart-4",
    },
    {
      id: "press-01",
      name: "Pressure Sensor",
      location: "Weather Station",
      value: currentData.pressure.toFixed(0),
      unit: "hPa",
      status: "online",
      icon: Gauge,
      color: "text-chart-5",
    },
    {
      id: "air-01",
      name: "Air Quality Sensor",
      location: "Field C - East",
      value: currentData.airQuality.toFixed(0),
      unit: "AQI",
      status: Math.random() > 0.1 ? "online" : "offline",
      icon: Activity,
      color: "text-muted-foreground",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>IoT Sensor Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sensors.map((sensor) => {
            const Icon = sensor.icon
            return (
              <div key={sensor.id} className="p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${sensor.color}`} />
                    <span className="text-sm font-medium">{sensor.name}</span>
                  </div>
                  <Badge variant={sensor.status === "online" ? "secondary" : "destructive"} className="text-xs">
                    {sensor.status === "online" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {sensor.status}
                  </Badge>
                </div>

                <div className="mb-2">
                  <span className="text-2xl font-bold">{sensor.value}</span>
                  <span className="text-sm text-muted-foreground ml-1">{sensor.unit}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{sensor.location}</span>
                </div>

                {sensor.status === "online" && (
                  <div className="mt-2">
                    <Progress value={Math.random() * 100} className="h-1" />
                    <span className="text-xs text-muted-foreground">
                      Signal: {(85 + Math.random() * 15).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
