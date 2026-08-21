import LinkCard from "@/components/bento/LinkCard";
import ProfileSection from "@/components/bento/ProfileSection";
import { links } from "@/data/links";

export default function BentoPage() {
	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-start">
			<ProfileSection />
			<div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
				{links.map((link) => (
					<LinkCard key={link.href} {...link} />
				))}
			</div>
		</div>
	);
}
