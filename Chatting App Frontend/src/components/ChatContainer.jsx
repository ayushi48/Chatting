import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-base-200/40">
        {messages.map((message, idx) => {
          const isMine = message.senderId === authUser._id;
          const isLast = idx === messages.length - 1;

          return (
            <div
              key={message._id}
              ref={isLast ? messageEndRef : null}
              className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <img
                src={isMine ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-base-300"
              />

              {/* Bubble + meta */}
              <div className={`flex flex-col max-w-[62%] ${isMine ? "items-end" : "items-start"}`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[220px] rounded-xl mb-1 border border-base-300"
                  />
                )}
                {message.text && (
                  <div
                    className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                      isMine
                        ? "bg-primary text-primary-content rounded-2xl rounded-br-sm"
                        : "bg-base-100 text-base-content border border-base-200 rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                )}
                <span className="text-[10px] text-base-content/40 mt-1 px-0.5">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
