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
        <div className="font-bold text-2xl">KeyCrypt</div>
        <button>LogOut</button>
      </div>
    </nav>
  );
}
