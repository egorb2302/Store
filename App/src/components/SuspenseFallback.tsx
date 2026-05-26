export function SuspenseFallback() {
    return (
        <div className="min-h-screen bg-mauve-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <svg className="w-12 h-12 fill-emerald-500 animate-spin" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <p className="text-mauve-400 text-lg animate-pulse">Loading...</p>
            </div>
        </div>
    )
}