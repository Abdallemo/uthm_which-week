"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock, Home, Menu, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function App() {
  const [date, setDate] = useState<Date | null>(() => {
    const savedDate = localStorage.getItem("uthm-start-date")
    return savedDate ? new Date(savedDate) : null
  })
  const [week, setWeek] = useState<string>("Pick a start date")
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    return localStorage.getItem("uthm-is-locked") === "true"
  })

  useEffect(() => {
    if (date) {
      setWeek(getCurrentWeekMessage(date))
    }
  }, [date])

  function getCurrentWeekMessage(startDate: Date) {
    const today = new Date()
    const DAY_IN_MS = 86400000
    const diffInDays = Math.floor((today.getTime() - startDate.getTime()) / DAY_IN_MS)
    const weekNumber = Math.floor(diffInDays / 7) + 1
    return weekNumber > 0 ? `You are in Week ${weekNumber}` : "The semester hasn't started yet!"
  }

  function handleDateChange(selectedDate: Date | undefined) {
    if (selectedDate && !isLocked) {
      setDate(selectedDate)
      setWeek(getCurrentWeekMessage(selectedDate))
      setIsLocked(true)
      localStorage.setItem("uthm-start-date", selectedDate.toISOString())
      localStorage.setItem("uthm-is-locked", "true")
    }
  }

  function resetSelection() {
    setDate(null)
    setWeek("Pick a start date")
    setIsLocked(false)
    localStorage.removeItem("uthm-start-date")
    localStorage.removeItem("uthm-is-locked")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-2 text-black">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">UTHM Week Tracker</h1>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden bg-gray-800">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <a href="#" className="flex items-center gap-2 text-primary">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-muted-foreground">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-primary">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Settings
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Which Week UTHM</CardTitle>
            <CardDescription>Track your current semester week</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 pb-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full max-w-xs justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                  disabled={isLocked}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick the semester starting day</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar mode="single" selected={date || undefined} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>

            <div className="text-center">
              <h2
                className={cn(
                  "text-3xl font-bold transition-all",
                  week === "Pick a start date" ? "text-muted-foreground" : "text-primary",
                )}
              >
                {week}
              </h2>
              {date && (
                <p className="text-sm text-muted-foreground mt-2">Semester started on {format(date, "MMMM d, yyyy")}</p>
              )}
            </div>

            <Button onClick={resetSelection} variant="outline" className="mt-2" size="sm">
              Reset
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} UTHM Week Tracker. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made with ❤️ for UTHM students</p>
        </div>
      </footer>
    </div>
  )
}

