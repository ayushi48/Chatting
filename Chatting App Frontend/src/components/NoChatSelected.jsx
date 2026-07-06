import { MessageSquare, Search, UserPlus, Circle } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-200/50">
      <div className="max-w-xs text-center flex flex-col items-center">

        {/* Icon */}
        <div className="w-18 h-18 rounded-2xl bg-base-100 border border-base-300 flex items-center justify-center mb-6">
          <MessageSquare className="w-9 h-9 text-primary" />
        </div>

        {/* Pulse dots */}
        <div className="flex gap-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="w-1.5 h-1.5 rounded-full bg-base-300" />
        </div>

        {/* Text */}
        <h2 className="text-lg font-medium mb-2">No conversation open</h2>
        <p className="text-sm text-base-content/50 leading-relaxed mb-6">
          Pick someone from the sidebar to start chatting, or search for a contact.
        </p>

        {/* Tip cards */}
        <div className="w-full flex flex-col gap-2 text-left">
          {[
            { icon: Search, label: "Search contacts by name" },
            { icon: UserPlus, label: "Add new contacts anytime" },
            { icon: Circle, label: "Green dot means they're online", color: "text-success" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-3 bg-base-100 border border-base-200 rounded-xl px-3 py-2.5">
              <Icon className={`w-4 h-4 flex-shrink-0 ${color ?? "text-primary"}`} />
              <span className="text-xs text-base-content/60">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
