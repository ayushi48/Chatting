import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-200">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[15px] font-medium">Chatty</span>
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-1">
          <Link
            to="/settings"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-base-content/60 hover:text-base-content hover:bg-base-200 border border-base-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>

              <div className="w-px h-5 bg-base-200 mx-1" />

              <Link
                to="/profile"
                className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border border-base-200 hover:bg-base-200 transition-colors"
              >
                <span className="text-sm text-base-content/60 hidden sm:inline">
                  {authUser.fullName?.split(" ")[0]}
                </span>
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="avatar"
                  className="w-7 h-7 rounded-full object-cover border border-base-300"
                />
              </Link>

              <div className="w-px h-5 bg-base-200 mx-1" />

              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-base-content/50 hover:text-error hover:bg-error/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
