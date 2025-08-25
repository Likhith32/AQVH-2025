"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Shield,
  Brain,
  Users,
  Thermometer,
  Droplets,
  Wind,
  Activity,
  TrendingUp,
  CheckCircle,
  Lock,
} from "lucide-react"
import { ClimateChart } from "@/components/climate-chart"
import { QuantumSecurityPanel } from "@/components/quantum-security-panel"
import { AIPredictionsPanel } from "@/components/ai-predictions-panel"
import { SensorGrid } from "@/components/sensor-grid"
import { BlockchainLedger } from "@/components/blockchain-ledger"

type UserRole = "farmer" | "scientist" | "admin"

interface User {
  email: string
  role: UserRole
  name: string
}

interface ClimateData {
  timestamp: number
  temperature: number
  humidity: number
  airQuality: number
  windSpeed: number
  pressure: number
  uvIndex: number
}

export default function ClimateChainApp() {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "farmer" as UserRole,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [climateData, setClimateData] = useState<ClimateData[]>([])
  const [currentData, setCurrentData] = useState<ClimateData | null>(null)

  // Simulate real-time climate data
  useEffect(() => {
    if (!user) return

    const generateClimateData = (): ClimateData => ({
      timestamp: Date.now(),
      temperature: 20 + Math.random() * 15 + Math.sin(Date.now() / 100000) * 5,
      humidity: 40 + Math.random() * 40,
      airQuality: 50 + Math.random() * 100,
      windSpeed: Math.random() * 20,
      pressure: 1000 + Math.random() * 50,
      uvIndex: Math.random() * 11,
    })

    // Initialize with some historical data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      ...generateClimateData(),
      timestamp: Date.now() - (20 - i) * 60000,
    }))
    setClimateData(initialData)
    setCurrentData(initialData[initialData.length - 1])

    // Update data every 3 seconds
    const interval = setInterval(() => {
      const newData = generateClimateData()
      setCurrentData(newData)
      setClimateData((prev) => [...prev.slice(-19), newData])
    }, 3000)

    return () => clearInterval(interval)
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUser({
      email: formData.email,
      role: formData.role,
      name: formData.name || formData.email.split("@")[0],
    })
    setIsLoading(false)
  }

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case "farmer":
        return "Access crop monitoring, weather predictions, and soil health data"
      case "scientist":
        return "Analyze climate patterns, access research datasets, and AI models"
      case "admin":
        return "Manage community data, oversee quantum security, and system administration"
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "farmer":
        return <Leaf className="h-5 w-5" />
      case "scientist":
        return <Brain className="h-5 w-5" />
      case "admin":
        return <Users className="h-5 w-5" />
    }
  }

  if (user && currentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">ClimateChain</h1>
                  <p className="text-sm text-muted-foreground">Quantum-Secured Climate Data</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="capitalize">
                  {getRoleIcon(user.role)}
                  <span className="ml-1">{user.role}</span>
                </Badge>
                <Button variant="outline" onClick={() => setUser(null)}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h2>
            <p className="text-muted-foreground">Real-time climate monitoring with quantum-secured data integrity</p>
          </div>

          {/* Current Status Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.temperature.toFixed(1)}°C</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +2.1% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.humidity.toFixed(0)}%</div>
                <p className="text-xs text-muted-foreground">
                  <Activity className="inline h-3 w-3 mr-1" />
                  Optimal range
                </p>
              </CardContent>
            </Card>

            <Card className="border-chart-3/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Air Quality</CardTitle>
                <Wind className="h-4 w-4 text-chart-3" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.airQuality.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="inline h-3 w-3 mr-1" />
                  Good quality
                </p>
              </CardContent>
            </Card>

            <Card className="border-chart-4/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Integrity</CardTitle>
                <Lock className="h-4 w-4 text-chart-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">
                  <Shield className="inline h-3 w-3 mr-1" />
                  Quantum secured
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-6">
              <ClimateChart data={climateData} />
              <SensorGrid currentData={currentData} />
              <BlockchainLedger />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              <QuantumSecurityPanel />
              <AIPredictionsPanel currentData={currentData} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authentication UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ClimateChain</h1>
          </div>
          <p className="text-muted-foreground">Quantum-secured climate data platform</p>
        </div>

        <Card>
          <CardHeader>
            <Tabs value={isLogin ? "login" : "signup"} onValueChange={(value) => setIsLogin(value === "login")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4" />
                          <span>Farmer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="scientist">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          <span>Climate Scientist</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Community Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">{getRoleDescription(formData.role)}</p>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our quantum-secured data handling practices
          </p>
        </div>
      </div>
    </div>
  )
}
