"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@repo/ui/components/themetoggle";
import { Button } from "@repo/ui/components/ui/button";
import { toast } from "@repo/ui/components/ui/sonner";
import { Input } from "@repo/ui/components/ui/input";
import {
	InputOTP, InputOTPGroup, InputOTPSlot
} from "@repo/ui/components/ui/input-otp";
import { signIn } from "@repo/auth/client";
import { handleRegisterAction, verifyOtp } from "@/actions/auth.action";

export default function LandingPage() {
	const [step, setStep] = useState<1 | 2>(1);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const requestOtpOrSignIn = async () => {
		const normalizedEmail = email.trim().toLowerCase();
		if (!normalizedEmail || !password) return;

		setLoading(true);
		try {
			const result = await handleRegisterAction(normalizedEmail, password);

			if (!result.success) {
				toast.error(result.message || "Failed to continue. Please try again.");
				return;
			}

			if (result.canSignIn) {
				const signInResult = await signIn("credentials", {
					email: normalizedEmail,
					password,
					redirect: false,
				});

				if (signInResult?.error) {
					toast.error("Unable to sign in. Please check your credentials.");
					return;
				}

				toast.success("Welcome back.");
				router.replace("/home");
				return;
			}

			if (result.requiresOtp) {
				setStep(2);
				toast.success(result.message || "OTP sent to your email.");
				return;
			}

			toast.error("Something went wrong. Please try again.");
		} catch {
			toast.error("Failed to continue. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		await requestOtpOrSignIn();
	};

	const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email.trim() || !otp.trim()) return toast.error("Enter your email and OTP.");

		setLoading(true);
		try {
			const result = await verifyOtp(email, otp);
			if (!result.success) {
				toast.error(result.message || "Invalid or expired OTP.");
				return;
			}

			const signInResult = await signIn("credentials", {
				email: email.trim(),
				password: "verified", // Special case to indicate OTP verification
				redirect: false,
			});

			if (signInResult?.error) {
				toast.error("Unable to sign in after verification. Please try again.");
				return;
			}

			toast.success("Welcome to AfterClass.");
			router.replace("/home");
		} catch {
			toast.error("Unable to verify OTP.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative h-screen overflow-hidden bg-[#f7f7f5] text-zinc-900 selection:bg-zinc-200 dark:bg-[#0d0d0c] dark:text-zinc-100 dark:selection:bg-zinc-800">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-zinc-300/40 blur-3xl dark:bg-zinc-700/20" />
				<div className="absolute -right-24 bottom-10 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-800/20" />
			</div>

			<header className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
				<div className="text-lg font-bold tracking-tight" style={{ fontFeatureSettings: '"ss01", "cv01"' }}>
					AfterClass
				</div>
				<ThemeToggle />
			</header>

			<main className="mx-auto grid h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 pt-24 pb-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
				<section className="animate-in fade-in slide-in-from-left-4 duration-700 text-left">
					<div className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
						</span>
						Live now · Campus rooms active
					</div>
					<h1 className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ fontFeatureSettings: '"ss01", "cv01"' }}>
						The place your campus logs in after class.
					</h1>
					<p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
						AfterClass helps students find live study rooms, meet batchmates, and stay connected to campus conversations in one clean space.
					</p>

					<div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
						<div className="rounded-xl border border-zinc-200/90 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
							<p className="text-xs uppercase tracking-wide text-zinc-500">Rooms</p>
							<p className="mt-1 text-sm font-semibold">Drop in instantly</p>
						</div>
						<div className="rounded-xl border border-zinc-200/90 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
							<p className="text-xs uppercase tracking-wide text-zinc-500">People</p>
							<p className="mt-1 text-sm font-semibold">Meet your batch</p>
						</div>
						<div className="rounded-xl border border-zinc-200/90 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
							<p className="text-xs uppercase tracking-wide text-zinc-500">Flow</p>
							<p className="mt-1 text-sm font-semibold">OTP-secure login</p>
						</div>
					</div>
				</section>

				<section className="animate-in fade-in slide-in-from-right-4 duration-700">
					<div className="rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-xl shadow-zinc-300/20 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/25 sm:p-6">
						<div className="mb-4 text-left">
							<p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Continue to AfterClass</p>
							<h2 className="mt-1 text-xl font-bold tracking-tight">Sign in with your campus email</h2>
						</div>

						{step === 1 ? (
							<form onSubmit={handleRegister} className="space-y-4">
								<div className="space-y-3">
									<Input
										type="email"
										placeholder="you@college.edu"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className="h-11 border-zinc-200 bg-white/80 font-medium placeholder:text-zinc-400 focus-visible:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-950"
									/>
									<Input
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="h-11 border-zinc-200 bg-white/80 font-medium placeholder:text-zinc-400 focus-visible:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-950"
									/>
								</div>
								<Button
									type="submit"
									disabled={loading || !email || !password}
									className="h-11 w-full rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
								>
									{loading ? "Checking account..." : "Continue"}
								</Button>
							</form>
						) : (
							<form onSubmit={handleVerifyOtp} className="space-y-4">
								<div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-left dark:border-zinc-800 dark:bg-zinc-950">
									<p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Enter verification code</p>
									<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
										Code sent to <span className="font-semibold text-zinc-700 dark:text-zinc-300">{email}</span>.{" "}
										<button
											type="button"
											onClick={() => setStep(1)}
											className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-200"
										>
											Change
										</button>
									</p>
								</div>
								<div className="flex justify-center py-1">
									<InputOTP
										maxLength={6}
										value={otp}
										onChange={(value) => setOtp(value)}
									>
										<InputOTPGroup className="gap-2">
											<InputOTPSlot index={0} className="!h-11 !w-10 rounded-md border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950" />
											<InputOTPSlot index={1} className="!h-11 !w-10 rounded-md border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950" />
											<InputOTPSlot index={2} className="!h-11 !w-10 rounded-md border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950" />
											<InputOTPSlot index={3} className="!h-11 !w-10 rounded-md border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950" />
											<InputOTPSlot index={4} className="!h-11 !w-10 rounded-md border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950" />
											<InputOTPSlot index={5} className="!h-11 !w-10 rounded-md border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950" />
										</InputOTPGroup>
									</InputOTP>
								</div>
								<Button
									type="submit"
									disabled={loading || otp.length !== 6}
									className="h-11 w-full rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
								>
									{loading ? "Verifying..." : "Verify code"}
								</Button>
								<button
									type="button"
									onClick={requestOtpOrSignIn}
									className="w-full text-center text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
								>
									Resend code
								</button>
							</form>
						)}

						<p className="mt-4 text-center text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
							By continuing, you agree to use AfterClass responsibly within your campus community.
						</p>
					</div>
				</section>
			</main>
		</div>
	);
}