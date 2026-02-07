import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useVerifyOtp } from "../hooks/useAuth";
import { otpSchema, type OtpFormValues } from "../schemas/auth.schemas";


interface OtpFormProps {
    mobileNumber: string;
    onSuccess: () => void;
}

export const OtpForm = ({ mobileNumber, onSuccess }: OtpFormProps) => {
    const verifyOtpMutation = useVerifyOtp();

    const form = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = (values: OtpFormValues) => {
        verifyOtpMutation.mutate(
            { mobileNumber, otp: values.otp },
            {
                onSuccess: () => {
                    toast.success("Login successful");
                    onSuccess();
                },
            }
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter OTP</FormLabel>
                            <FormControl>
                                <Input
                                    maxLength={6}
                                    placeholder="••••••"
                                    className="text-center tracking-[0.4em]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={verifyOtpMutation.isPending}
                >
                    {verifyOtpMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Verify OTP"
                    )}
                </Button>
            </form>
        </Form>
    );
};
