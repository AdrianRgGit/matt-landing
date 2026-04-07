import CustomButton from "../ui/customButton/CustomButton";
import CustomOverlay from "../ui/customOverlay/CustomOverlay";

export default function Nav() {
  return (
    <>
      <CustomOverlay />

      <div className="w-80 fixed z-100 bottom-20 left-1/2 -translate-x-1/2">
        <div className="h-14 w-14 border-4 border-theme-white rounded-lg mx-auto mb-5" />

        <div className="bg-theme-white/80 backdrop-blur-sm p-5 space-y-2.5 rounded-lg">
          <h3>Menu</h3>

          <nav className="flex flex-col gap-y-2.5 ml-2.5 text-2xl">
            <a href="#intro">Intro</a>
            <a href="#problem">Problem</a>
            <a href="#solution">Solution</a>
            <a href="#advantages">Advantages</a>
            <a href="#value">Value</a>
            <a href="#partners">Partners</a>
            <a href="#aboutus">About</a>
          </nav>

          <CustomButton className="mx-auto" />
        </div>
      </div>

      <button
        type="button"
        className="fixed z-100 bottom-2.5 left-1/2 -translate-x-1/2 h-14 w-14 rounded-lg bg-theme-white/80 backdrop-blur-sm cursor-pointer"
      ></button>
    </>
  );
}
