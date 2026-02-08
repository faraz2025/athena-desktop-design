import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ClipboardList, MoreVertical, Send, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// Mock Data (matches ChatLayout)
const projects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

type ChatMessage = {
    id: number;
    text: string;
    time: string;
    fromMe?: boolean;
    sender?: string;
};

const initialMessagesByProject: Record<number, ChatMessage[]> = {
    1: [
        {
            id: 1,
            text: "Morning team, sharing today’s site progress shortly.",
            time: "09:05",
            sender: "You",
            fromMe: true,
        },
        {
            id: 2,
            text: "Please share today’s progress photos.",
            time: "09:12",
            sender: "Client PM",
        },
        {
            id: 3,
            text: "Uploading now – shuttering completed for grid A1-A5.",
            time: "09:18",
            sender: "Site Engg",
        },
    ],
    // ... other projects
};

export default function ProjectChatPage() {
    const { projectId } = useParams();
    const id = Number(projectId);
    const project = projects.find((p) => p.id === id);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messagesByProject, setMessagesByProject] = useState<Record<number, ChatMessage[]>>(initialMessagesByProject);
    const [newMessage, setNewMessage] = useState("");

    // Task Composer State
    const [showTaskComposer, setShowTaskComposer] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskPriority, setTaskPriority] = useState("Medium");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("John Doe");

    const activeMessages = project ? messagesByProject[id] || [] : [];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeMessages, projectId]);

    if (!project) return <div>Project not found</div>;

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        setMessagesByProject((prev) => {
            const existing = prev[id] || [];
            const nextId = existing.length ? existing[existing.length - 1].id + 1 : 1;
            const updated = [
                ...existing,
                {
                    id: nextId,
                    text: newMessage.trim(),
                    time: "Now",
                    fromMe: true,
                    sender: "You",
                },
            ];
            return { ...prev, [id]: updated };
        });
        setNewMessage("");
    };

    const resetTaskForm = () => {
        setTaskTitle("");
        setTaskPriority("Medium");
        setTaskDueDate("");
        setTaskDescription("");
        setShowTaskComposer(false);
    };

    const handleCreateTaskFromMessage = (msg: ChatMessage) => {
        const base = msg.text.length > 120 ? msg.text.slice(0, 117) + "..." : msg.text;
        setTaskDescription(`From chat: "${base}"`);
        setShowTaskComposer(true);
    };

    const handleMockCreateTask = () => {
        if (!taskTitle.trim()) return;

        setMessagesByProject((prev) => {
            const existing = prev[id] || [];
            const nextId = existing.length ? existing[existing.length - 1].id + 1 : 1;
            const summaryLines = [
                `New task created: ${taskTitle.trim()}`,
                taskPriority ? `Priority: ${taskPriority}` : undefined,
                taskDueDate ? `Due: ${taskDueDate}` : undefined,
                assignedTo ? `Assigned to: ${assignedTo}` : undefined,
            ].filter(Boolean);

            const updated = [
                ...existing,
                {
                    id: nextId,
                    text: summaryLines.join("\n"),
                    time: "Now",
                    fromMe: true,
                    sender: "You",
                },
            ];
            return { ...prev, [id]: updated };
        });
        resetTaskForm();
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-background/50 backdrop-blur sticky top-0 z-10">
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {project.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="font-semibold">{project.name}</h2>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        8 Members • Online
                    </p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setShowTaskComposer(!showTaskComposer)}>
                        <ClipboardList className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-3xl  mx-auto">
                    <div className="text-center text-xs text-muted-foreground my-4">
                        <span>Today</span>
                    </div>
                    {activeMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                msg.fromMe
                                    ? "ml-auto bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}
                        >
                            <div className="flex justify-between items-baseline gap-4">
                                {!msg.fromMe && <span className="text-[10px] font-semibold opacity-70">{msg.sender}</span>}
                                {msg.fromMe && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <span className="cursor-pointer hover:opacity-80">
                                                <span className="text-[10px] font-semibold opacity-70">You</span>
                                            </span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleCreateTaskFromMessage(msg)}>
                                                Create Task
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                            <p className="whitespace-pre-wrap leading-snug">{msg.text}</p>
                            <span className="text-[9px] opacity-70 self-end block mt-0.5">{msg.time}</span>
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Task Composer Overlay - Desktop Adapted */}
            {showTaskComposer && (
                <div className="absolute right-4 bottom-20 w-80 bg-background border shadow-xl rounded-xl z-20 animate-in slide-in-from-bottom-5">
                    <div className="p-3 border-b flex justify-between items-center bg-muted/20 rounded-t-xl">
                        <span className="text-xs font-semibold flex items-center gap-2">
                            <ClipboardList className="h-3.5 w-3.5" />
                            New Task
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowTaskComposer(false)}>
                            <MoreVertical className="h-3 w-3 rotate-90" />
                        </Button>
                    </div>
                    <div className="p-3 space-y-3">
                        <div className="space-y-1">
                            <Label className="text-[10px]">Title</Label>
                            <Input
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                className="h-8 text-xs"
                                placeholder="Task title..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <Label className="text-[10px]">Priority</Label>
                                <Select value={taskPriority} onValueChange={setTaskPriority}>
                                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px]">Due Date</Label>
                                <Input
                                    value={taskDueDate}
                                    onChange={(e) => setTaskDueDate(e.target.value)}
                                    className="h-8 text-xs"
                                    placeholder="YYYY-MM-DD"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px]">Description</Label>
                            <Textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="h-16 text-xs resize-none"
                                placeholder="Details..."
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px]">Assigned To</Label>
                            <Select value={assignedTo} onValueChange={setAssignedTo}>
                                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="John Doe">John Doe</SelectItem>
                                    <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button size="sm" className="w-full text-xs" onClick={handleMockCreateTask}>Create Task</Button>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-background border-t">
                <div className="flex gap-2 max-w-3xl mx-auto">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder={`Message ${project.name}...`}
                        className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
