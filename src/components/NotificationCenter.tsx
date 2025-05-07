
import React, { useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type NotificationType = "info" | "message" | "success" | "warning";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Update Available",
    message: "Dashboard version 1.2 is available with new features.",
    time: "Just now",
    type: "info",
    read: false,
  },
  {
    id: "2",
    title: "Task Completed",
    message: "Your data export has finished successfully.",
    time: "10m ago",
    type: "success",
    read: false,
  },
  {
    id: "3",
    title: "Meeting Reminder",
    message: "Team meeting starts in 30 minutes.",
    time: "25m ago",
    type: "warning",
    read: false,
  },
  {
    id: "4",
    title: "New Message",
    message: "You received a new message from Sarah.",
    time: "1h ago",
    type: "message",
    read: true,
  },
  {
    id: "5",
    title: "Weekly Report",
    message: "Weekly report is ready for review.",
    time: "2h ago",
    type: "info",
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "message":
      return <MessageSquare className="h-4 w-4 text-purple-500" />;
    case "success":
      return <Check className="h-4 w-4 text-green-500" />;
    case "warning":
      return <Info className="h-4 w-4 text-amber-500" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  
  const unreadCount = notifications.filter((n) => !n.read).length;
  
  const filteredNotifications = notifications.filter((n) => 
    filter === "all" || (filter === "unread" && !n.read)
  );

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.info("Notification removed");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-500 text-white"
              aria-label={`${unreadCount} unread notifications`}
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 text-xs",
                filter === "all" && "bg-secondary"
              )}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 text-xs",
                filter === "unread" && "bg-secondary"
              )}
              onClick={() => setFilter("unread")}
            >
              Unread
            </Button>
          </div>
        </div>
        {filteredNotifications.length > 0 ? (
          <>
            <ScrollArea className="h-[300px] p-0">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3 border-b p-4 last:border-0",
                    !notification.read && "bg-muted/50"
                  )}
                >
                  <div className="mt-1">
                    <NotificationIcon type={notification.type} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto px-2 py-1 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="border-t p-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No notifications to display
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
