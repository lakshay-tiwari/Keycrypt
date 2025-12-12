import { AuthButton } from "./AuthButton";
import { KeyCrypt } from "./KeyCrypt";

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
      sticky
      top-0
      z-50
      h-16
    ">
      <div className="w-full max-w-5xl mx-auto flex justify-between px-10">
        <KeyCrypt />
        <AuthButton/>
      </div>
    </nav>
  );
}
