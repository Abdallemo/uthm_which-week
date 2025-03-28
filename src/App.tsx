import { useEffect, useState } from "react"
import CardWithCalender from "./components/CardWithCalender"
import Navbar from "./components/Nav";
import { getCurrentWeekMessage } from "./lib/actions";
import Footer from "./components/Footer";
export default function App() {
  const [date, setDate] = useState<Date | null>(() => {
    const savedDate = localStorage.getItem("uthm-start-date")
    return savedDate ? new Date(savedDate) : null
  })
  const [week, setWeek] = useState<string>("Pick a start date")
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    return localStorage.getItem("uthm-is-locked") === "true"
  })
  const [weekN, setWeekN] = useState<number>(0);

  useEffect(() => {
    if (date) {
      setWeek(getCurrentWeekMessage(date, setWeekN))
    }
  }, [date])

  function handleDateChange(selectedDate: Date | undefined) {
    if (selectedDate && !isLocked) {
      setDate(selectedDate)
      setWeek(getCurrentWeekMessage(selectedDate, setWeekN))
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
    <div className="h-screen bg-background flex flex-col ">
      <Navbar />
      <main className=" py-10 flex flex-col items-center justify-center h-full">
        <CardWithCalender date={date} handleDateChange={handleDateChange} isLocked={isLocked} resetSelection={resetSelection} week={week} weekN={weekN} />
      </main>
      <Footer />
    </div>
  )
}

