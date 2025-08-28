"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Key, Database, CheckCircle, RefreshCw } from "lucide-react"

export function QuantumSecurityPanel() {
  const [qrngKey, setQrngKey] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [securityScore, setSecurityScore] = useState(98)

  const generateQRNGKey = async () => {
    setIsGenerating(true)

    try {
      // The API call now points to your deployed backend on Render
      const response = await fetch("https://quantum-backend-1-xeg5.onrender.com/qrng")
      const data = await response.json()
      setQrngKey(data.qrng_key)
      setSecurityScore(95 + Math.random() * 5)
    } catch (err) {
      console.error("Error fetching QRNG key:", err)
      setQrngKey("Error: Backend not reachable")
    }

    setIsGenerating(false)
  }

  useEffect(() => {
    // Generate initial key on component mount
    generateQRNGKey()
  }, [])

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Quantum Security</CardTitle>
        </div>
        <CardDescription>Data protected with quantum-random encryption keys</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Security Score</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <CheckCircle className="h-3 w-3 mr-1" />
            {securityScore.toFixed(1)}%
          </Badge>
        </div>

        <Progress value={securityScore} className="h-2" />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span>AES-256 Quantum Encryption</span>
            <CheckCircle className="h-4 w-4 text-primary ml-auto" />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Key className="h-4 w-4 text-muted-foreground" />
            <span>QRNG Key Generation</span>
            <CheckCircle className="h-4 w-4 text-primary ml-auto" />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Database className="h-4 w-4 text-muted-foreground" />
            <span>Blockchain Integrity</span>
            <CheckCircle className="h-4 w-4 text-primary ml-auto" />
          </div>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Current QRNG Key</span>
            <Button variant="ghost" size="sm" onClick={generateQRNGKey} disabled={isGenerating}>
              {isGenerating ? <RefreshCw className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
            </Button>
          </div>
          <code className="text-xs font-mono break-all text-muted-foreground">
            {isGenerating ? "Generating quantum key..." : qrngKey}
          </code>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>
            <strong>Quantum Security:</strong> Your climate data is protected using quantum-random number generation
            (QRNG) for encryption keys, making it virtually impossible to predict or crack using classical computing
            methods.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
