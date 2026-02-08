import { MessageSquareDashed } from "lucide-react";

export default function ChatPage() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-muted/5">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <MessageSquareDashed className="h-8 w-8 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Select a Project</h3>
            <p className="max-w-xs mt-2">
                Choose a project from the sidebar to start collaborating with your team.
            </p>
        </div>
    );
}
