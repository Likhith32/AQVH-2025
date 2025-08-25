"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Database, CheckCircle, Clock, Hash, Shield, Link, Activity, RefreshCw } from "lucide-react"

interface BlockchainTransaction {
  id: string
  blockHash: string
  timestamp: number
  dataType: string
  sensorId: string
  verified: boolean
  gasUsed: number
  confirmations: number
}

export function BlockchainLedger() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalBlocks, setTotalBlocks] = useState(0)

  const generateBlockHash = () => {
    const chars = "0123456789abcdef"
    let result = "0x"
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const generateTransaction = (): BlockchainTransaction => {
    const dataTypes = ["temperature", "humidity", "air_quality", "wind_speed", "pressure", "uv_index"]
    const sensorIds = ["temp-01", "hum-01", "air-01", "wind-01", "press-01", "uv-01"]

    return {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      blockHash: generateBlockHash(),
      timestamp: Date.now(),
      dataType: dataTypes[Math.floor(Math.random() * dataTypes.length)],
      sensorId: sensorIds[Math.floor(Math.random() * sensorIds.length)],
      verified: Math.random() > 0.05, // 95% verification rate
      gasUsed: Math.floor(21000 + Math.random() * 50000),
      confirmations: Math.floor(1 + Math.random() * 12),
    }
  }

  const addNewTransaction = async () => {
    setIsLoading(true)

    // Simulate blockchain transaction processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newTransaction = generateTransaction()
    setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)]) // Keep last 10 transactions
    setTotalBlocks((prev) => prev + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    // Initialize with some transactions
    const initialTransactions = Array.from({ length: 5 }, () => generateTransaction())
    setTransactions(initialTransactions)
    setTotalBlocks(1247 + Math.floor(Math.random() * 100)) // Simulate existing blockchain

    // Auto-generate transactions every 10 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        // 70% chance of new transaction
        const newTransaction = generateTransaction()
        setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)])
        setTotalBlocks((prev) => prev + 1)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  return (
    <Card className="border-chart-4/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-chart-4" />
            <div>
              <CardTitle>Blockchain Ledger</CardTitle>
              <CardDescription>Immutable climate data integrity log</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={addNewTransaction} disabled={isLoading}>
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Blockchain Stats */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-chart-4">{totalBlocks.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Blocks</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{transactions.filter((t) => t.verified).length}</div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-secondary">99.8%</div>
            <div className="text-xs text-muted-foreground">Integrity</div>
          </div>
        </div>

        {/* Transaction Log */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Recent Transactions</span>
          </div>

          <ScrollArea className="h-[300px] w-full">
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div key={tx.id} className="space-y-2">
                  <div className="flex items-start justify-between p-3 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={tx.verified ? "secondary" : "destructive"} className="text-xs">
                          {tx.verified ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {tx.verified ? "Verified" : "Pending"}
                        </Badge>
                        <span className="text-sm font-medium capitalize">{tx.dataType.replace("_", " ")} Data</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Hash className="h-3 w-3" />
                          <code className="font-mono">{truncateHash(tx.blockHash)}</code>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimestamp(tx.timestamp)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>{tx.sensorId}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-xs text-muted-foreground">
                      <div>{tx.confirmations}/12 confirmations</div>
                      <div>{tx.gasUsed.toLocaleString()} gas</div>
                    </div>
                  </div>

                  {index < transactions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Blockchain Info */}
        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            <p className="mb-2">
              <strong>Blockchain Integrity:</strong> Every climate data point is cryptographically hashed and stored on
              an immutable ledger, ensuring data cannot be tampered with or falsified.
            </p>
            <div className="flex items-center gap-2">
              <Database className="h-3 w-3" />
              <span>Network: ClimateChain Testnet • Block time: ~15s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
