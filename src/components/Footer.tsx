
export default function Footer() {
    return (
        <footer className="border-t py-6 md:py-0 flex p=10 justify-between  h-10 p-5 w-full bg-background">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} UTHM Week Tracker. All rights reserved.
            </p>
            <p className="text-sm text-left text-muted-foreground">Made with ❤️by <span><a href="https://github.com/Abdallemo " target="_blank" className="text-blue-400">@abdallemo</a></span> for UTHM students</p>
        </footer>
    )
}
