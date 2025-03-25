export default function CardLoading() {
    return (
        <div className="w-auto h-auto flex items-center justify-center">
            <div className="w-96 h-72 max-w-[95%] flex justify-center items-center relative bg-slate-600 drop-shadow-md cursor-pointer">
                <div className="w-8 h-8 border-4 border-slate-400 border-t-slate-700 rounded-full animate-spin" />
            </div>
        </div>
    );
}