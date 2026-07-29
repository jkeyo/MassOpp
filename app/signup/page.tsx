"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function SignupPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"volunteer" | "org_admin">("volunteer");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName, role },
            },
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/");
    }

    return (
        <div className="mx-auto max-w-md px-4 py-12">
            <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">I am signing up as a...</label>
                    <div className="mt-1 flex gap-4">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="role"
                                value="volunteer"
                                checked={role === "volunteer"}
                                onChange={() => setRole("volunteer")}
                            />
                            Volunteer
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="role"
                                value="org_admin"
                                checked={role === "org_admin"}
                                onChange={() => setRole("org_admin")}
                            />
                            Organization
                        </label>
                    </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>

            <p className="mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="underline">
                    Log in
                </a>
            </p>
        </div>
    );
}