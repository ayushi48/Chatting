
import { X, Phone, Video } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-4 py-3 border-b border-base-200 bg-base-100 flex items-center justify-between">
      {/* Left — avatar + info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="w-9 h-9 rounded-full object-cover border border-base-200"
          />
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-base-100 ${
              isOnline ? "bg-success" : "bg-base-300"
            }`}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium leading-tight">{selectedUser.fullName}</h3>
          <p className={`text-xs mt-0.5 flex items-center gap-1 ${isOnline ? "text-success" : "text-base-content/40"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-success" : "bg-base-content/30"}`} />
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1">
        <button className="btn btn-ghost btn-sm btn-square text-base-content/60 hover:text-base-content">
          <Phone size={16} />
        </button>
        <button className="btn btn-ghost btn-sm btn-square text-base-content/60 hover:text-base-content">
          <Video size={16} />
        </button>
        <div className="w-px h-5 bg-base-200 mx-1" />
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-square text-base-content/60 hover:text-base-content"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
