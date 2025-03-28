export function getCurrentWeekMessage(startDate: Date,setWeekN:React.Dispatch<React.SetStateAction<number>>) {
    const today = new Date()
    const DAY_IN_MS = 86400000
    const diffInDays = Math.floor((today.getTime() - startDate.getTime()) / DAY_IN_MS)
    const weekNumber = Math.floor(diffInDays / 7) + 1
    setWeekN(weekNumber)
    return weekNumber > 0 ? `You are in Week ${weekNumber}` : "The semester hasn't started yet!"
  }