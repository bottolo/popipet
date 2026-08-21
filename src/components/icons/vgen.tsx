import { cn } from "@/lib/utils";
import type { ImgHTMLAttributes } from "react";

export function VGenIcon({
	className,
	...props
}: ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<img
			src="/vgen-badge.png"
			alt=""
			className={cn("size-6 object-contain", className)}
			aria-hidden="true"
			{...props}
		/>
	);
}
