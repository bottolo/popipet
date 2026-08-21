import Star22 from "@/components/stars/s22";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileSection() {
	return (
		<section className="flex w-full shrink-0 flex-col items-start gap-4 lg:max-w-xs">
			<div className="relative mb-8 size-24">
				<div className="absolute top-[50%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-foreground">
					<div className="animate-spin-slow">
						<Star22 size={90} aria-hidden="true" />
					</div>
				</div>

				<Avatar className="relative z-10 size-24">
					<AvatarImage src="/avatar.jpg" alt="Sophyret" />
					<AvatarFallback>SR</AvatarFallback>
				</Avatar>
			</div>

			<div className="flex flex-col gap-2">
				<h1 className="text-3xl">Sophyret</h1>
				<p className="text-sm leading-relaxed">
					Sono POPIPET. Non farò mai più commissioni bro...
				</p>
			</div>
		</section>
	);
}
