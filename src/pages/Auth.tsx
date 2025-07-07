import { AuthForms } from "@/components/Authentication/auth-forms";

export default function Auth() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted ">
            <div className="w-full max-w-sm md:max-w-3xl">
                <AuthForms />
            </div>
        </div>
    );
}