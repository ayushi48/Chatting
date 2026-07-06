import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => { getUsers(); }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const onlineCount = onlineUsers.length - 1;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-64 border-r border-base-200 flex flex-col transition-all duration-200">

      {/* Header */}
      <div className="p-3 lg:p-4 border-b border-base-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-base-content/50" />
            <span className="font-medium text-sm hidden lg:block">Contacts</span>
          </div>
          {/* Online count badge */}
          <span className="hidden lg:inline-flex text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
            {onlineCount} online
          </span>
        </div>

        {/* Search — full only */}
        <div className="hidden lg:flex items-center gap-2 bg-base-200/60 border border-base-200 rounded-lg px-2.5 py-1.5 mb-2.5">
          <svg className="w-3.5 h-3.5 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <span className="text-xs text-base-content/30">Search…</span>
        </div>

        {/* Filter pills */}
        <div className="hidden lg:flex gap-1.5">
          <button
            onClick={() => setShowOnlineOnly(false)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              !showOnlineOnly
                ? "bg-primary/10 text-primary border-transparent"
                : "border-base-200 text-base-content/50 hover:text-base-content"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setShowOnlineOnly(true)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              showOnlineOnly
                ? "bg-primary/10 text-primary border-transparent"
                : "border-base-200 text-base-content/50 hover:text-base-content"
            }`}
          >
            Online
          </button>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto flex-1 p-1.5 space-y-0.5">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-2 lg:px-3 rounded-xl transition-colors ${
                isSelected ? "bg-base-200" : "hover:bg-base-200/60"
              }`}
            >
              {/* Avatar */}
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-10 rounded-full object-cover border border-base-200"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-2.5 bg-success rounded-full ring-2 ring-base-100" />
                )}
              </div>

              {/* Info */}
              <div className="hidden lg:flex flex-col items-start min-w-0 flex-1">
                <span className="text-sm font-medium truncate w-full text-left">
                  {user.fullName}
                </span>
                <span className={`text-xs ${isOnline ? "text-success" : "text-base-content/40"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-base-content/30">
            <Users className="size-6" />
            <span className="text-xs hidden lg:block">No users found</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;


