import type { LinkItem } from "@/data/links";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LinkCard({
	label,
	handle,
	href,
	icon: Icon,
	strokeIcon,
}: LinkItem) {
	return (
		<Button
			asChild
			variant="default"
			className="h-auto w-full flex-col items-start gap-2 p-4 text-left"
		>
			<a href={href} target="_blank" rel="noopener noreferrer">
				<Icon
					className={cn("size-6 shrink-0", strokeIcon && "stroke-[2.5]")}
					aria-hidden="true"
				/>
				<span className="font-heading text-base">{label}</span>
				<span className="text-sm opacity-80">{handle}</span>
			</a>
		</Button>
	);
}
