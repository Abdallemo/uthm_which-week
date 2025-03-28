"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type CardWithCalenderProps={
    date:Date | null,
    week:string,
    isLocked:boolean,
    handleDateChange:(selectedDate: Date | undefined) => void,
    weekN:number,
    resetSelection:()=> void
}
export default function CardWithCalender({date,isLocked,week,handleDateChange,weekN,resetSelection}:CardWithCalenderProps) {
  return (
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
                <p className="text-sm text-muted-foreground mt-2">{weekN > 0 ? `Semester started on ${format(date, "MMMM d, yyyy")}`:"The semester hasn't started yet!"}</p>
              )}
            </div>

            <Button onClick={resetSelection} variant="outline" className="mt-2" size="sm">
              Reset
            </Button>
          </CardContent>
        </Card>
  )
}
