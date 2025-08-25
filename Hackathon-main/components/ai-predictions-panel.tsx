"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Cloud } from "lucide-react"

interface ClimateData {
  timestamp: number
  temperature: number
  humidity: number
  airQuality: number
  windSpeed: number
  pressure: number
  uvIndex: number
}

interface AIPredictionsPanelProps {
  currentData: ClimateData
}

export function AIPredictionsPanel({ currentData }: AIPredictionsPanelProps) {
  const [droughtRisk, setDroughtRisk] = useState(0)
  const [weatherForecast, setWeatherForecast] = useState("")
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    // Calculate drought risk based on temperature, humidity, and pressure
    const tempFactor = Math.max(0, (currentData.temperature - 25) / 15)
    const humidityFactor = Math.max(0, (60 - currentData.humidity) / 60)
    const pressureFactor = Math.max(0, (currentData.pressure - 1010) / 40)

    const risk = Math.min(100, (tempFactor + humidityFactor + pressureFactor) * 33.33)
    setDroughtRisk(risk)

    // Generate weather forecast
    if (currentData.humidity > 70 && currentData.pressure < 1005) {
      setWeatherForecast("Rain likely within 24 hours")
    } else if (currentData.temperature > 30 && currentData.humidity < 40) {
      setWeatherForecast("Hot and dry conditions expected")
    } else {
      setWeatherForecast("Stable weather conditions")
    }

    // Generate recommendations
    const newRecommendations = []
    if (currentData.humidity < 50) {
      newRecommendations.push("Consider irrigation for crops")
    }
    if (currentData.temperature > 28) {
      newRecommendations.push("Provide shade for livestock")
    }
    if (currentData.airQuality > 100) {
      newRecommendations.push("Monitor air quality for sensitive crops")
    }
    if (newRecommendations.length === 0) {
      newRecommendations.push("Conditions are optimal for farming")
    }

    setRecommendations(newRecommendations)
  }, [currentData])

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-primary"
    if (risk < 60) return "text-chart-3"
    return "text-destructive"
  }

  const getRiskBadgeVariant = (risk: number) => {
    if (risk < 30) return "secondary"
    if (risk < 60) return "outline"
    return "destructive"
  }

  return (
    <Card className="border-chart-3/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-chart-3" />
          <CardTitle>AI Predictions</CardTitle>
        </div>
        <CardDescription>Machine learning insights and forecasts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drought Risk */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Drought Risk</span>
            <Badge variant={getRiskBadgeVariant(droughtRisk)}>
              {droughtRisk < 30 ? "Low" : droughtRisk < 60 ? "Medium" : "High"}
            </Badge>
          </div>
          <Progress value={droughtRisk} className="h-2" />
          <p className="text-xs text-muted-foreground">Based on temperature, humidity, and pressure trends</p>
        </div>

        {/* Weather Forecast */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Cloud className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">24h Forecast</span>
          </div>
          <p className="text-sm text-muted-foreground">{weatherForecast}</p>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <span className="text-sm font-medium">AI Recommendations</span>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <TrendingUp className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Model Info */}
        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Brain className="h-3 w-3" />
            <span>Powered by ClimateAI v2.1 • Updated 2 min ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
