export function NavBar() {
  return (
    <nav className="
      w-full
      rounded-2xl
      bg-white/10
      backdrop-blur-md
      border border-white/20
      shadow-lg
      flex items-center
      h-16
    ">
      <div className="w-full max-w-5xl mx-auto flex justify-between px-10">
        <div className="font-bold cursor-pointer text-3xl flex">
        <span className="bg-linear-to-r text-3xl font-bold from-blue-700 to-cyan-500 bg-clip-text text-transparent">
            KeyCrypt
        </span>
        </div>
        <button>LogOut</button>

      </div>
    </nav>
  );
}
