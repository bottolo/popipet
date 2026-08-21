import { InstagramIcon } from "@/components/icons/instagram";
import { KofiIcon } from "@/components/icons/kofi";
import { VGenIcon } from "@/components/icons/vgen";
import { XIcon } from "@/components/icons/x";
import { Paintbrush, ShoppingBag, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export type LinkIcon = LucideIcon | ComponentType<{ className?: string }>;

export type LinkItem = {
	label: string;
	handle: string;
	href: string;
	icon: LinkIcon;
	strokeIcon?: boolean;
};

export const links: LinkItem[] = [
	{
		label: "Instagram",
		handle: "@sophy.ret",
		href: "https://www.instagram.com/sophy.ret/",
		icon: InstagramIcon,
	},
	{
		label: "X",
		handle: "@Sophyret",
		href: "https://x.com/Sophyret",
		icon: XIcon,
	},
	{
		label: "Ko-fi",
		handle: "@sophyret",
		href: "https://ko-fi.com/sophyret/shop",
		icon: KofiIcon,
	},
	{
		label: "ArtFight",
		handle: "ArtFight",
		href: "https://artfight.net/login",
		icon: Paintbrush,
		strokeIcon: true,
	},
	{
		label: "Shop",
		handle: "SumUp Store",
		href: "https://sophyret.sumupstore.com/",
		icon: ShoppingBag,
		strokeIcon: true,
	},
	{
		label: "VGen",
		handle: "@Sophyret",
		href: "https://vgen.co/Sophyret",
		icon: VGenIcon,
	},
];
