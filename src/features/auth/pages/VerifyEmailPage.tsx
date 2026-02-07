import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { GoogleIcon } from "@/assets/Icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { useAuthState, useSendEmailVerification } from "../hooks/useAuth";
import { emailVerificationSchema, type EmailVerificationFormValues } from "../schemas/auth.schemas";

const EMAIL_STORAGE_KEY = "emailForVerification";

const VerifyEmailPage = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  const sendEmailVerificationMutation = useSendEmailVerification();

  const emailForm = useForm<EmailVerificationFormValues>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      name: "",
      email: user?.email ?? "",
    },
  });

  const onSendEmail = (values: EmailVerificationFormValues) => {
    sendEmailVerificationMutation.mutate(
      { name: values.name, email: values.email },
      {
        onSuccess: () => {
          localStorage.setItem(EMAIL_STORAGE_KEY, values.email);
          toast.success("Verification email sent");
          navigate(`/verify-email/code?email=${encodeURIComponent(values.email)}`);
        },
        onError: onError
      },
    );
  };

  const onGoogleSignIn = () => {
    toast.info("Google sign-in is not supported yet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl pt-0 rounded-xl overflow-hidden">
        <CardHeader className="px-8 pt-8 pb-4">
          <h1 className="text-3xl text-primary font-bold">Verify your email</h1>
          <p className="text-sm">
            Required for new accounts.
          </p>
        </CardHeader>

        <CardContent className="px-6 space-y-6">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSendEmail)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoaderButton
                type="submit"
                className="w-full"
                isLoading={sendEmailVerificationMutation.isPending}
                loadingText="Sending verification email..."
              >
                Send verification code
              </LoaderButton>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={onGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              <GoogleIcon className="fill-primary h-4 w-4 text-primary" />
              Verify with Google
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
