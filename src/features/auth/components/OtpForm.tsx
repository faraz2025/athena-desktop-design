import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/ui/loader-button";
import { onError } from "@/lib/utils";
import { useVerifyOtp } from "../hooks/useAuth";
import { otpSchema, type OtpFormValues } from "../schemas/auth.schemas";


interface OtpFormProps {
    mobileNumber: string;
    onSuccess: () => void;
    onBack: () => void;
}

export const OtpForm = ({ mobileNumber, onSuccess, onBack }: OtpFormProps) => {
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
                onError: onError
            }
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <p className="text-sm"> Please enter the OTP sent to {" "}
                    <button type="button" onClick={onBack} className="cursor-pointer font-semibold underline text-primary">{mobileNumber}</button>
                </p>


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

                <LoaderButton
                    type="submit"
                    className="w-full"
                    isLoading={verifyOtpMutation.isPending}
                    loadingText="Verifying OTP..."
                >
                    Verify OTP
                </LoaderButton>
            </form>
        </Form>
    );
};
