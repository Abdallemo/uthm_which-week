import { Clock1 } from "lucide-react";
import GithubCorner from "react-github-corner";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
    <div className="container flex h-16 items-start justify-between">
      <div className="flex items-center gap-2 ml-2 text-black">
        <Clock1 className="h-10 w-10 text-primary p-2" />
        <h1 className="text-xl font-bold">UTHM Week Tracker</h1>
      </div>
      <GithubCorner href="https://github.com/Abdallemo/uthm_which-week" bannerColor="#242424" target="_blank" />
    </div>
  </header>
  )
}
