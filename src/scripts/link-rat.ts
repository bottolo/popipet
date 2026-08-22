import { initRatViewer } from "@/scripts/rat-viewer";

const CARD_SELECTOR = "[data-link-card]";
const RAT_SIZE = 56;
const RAT_INSET = 10;

let activeCleanup: (() => void) | null = null;

export function initLinkRat(): () => void {
	if (activeCleanup) return activeCleanup;

	const host = document.createElement("div");
	host.id = "link-rat";
	host.className = "link-rat";
	host.setAttribute("aria-hidden", "true");

	const canvas = document.createElement("canvas");
	canvas.width = RAT_SIZE;
	canvas.height = RAT_SIZE;
	canvas.className = "size-full";
	host.appendChild(canvas);
	document.body.appendChild(host);

	const disposeViewer = initRatViewer(canvas);

	let activeCard: HTMLElement | null = null;
	let touchActiveCard: HTMLElement | null = null;

	const cards = () =>
		Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));

	const placeOnCard = (card: HTMLElement) => {
		const rect = card.getBoundingClientRect();
		host.style.left = `${rect.right - RAT_SIZE - RAT_INSET}px`;
		host.style.top = `${rect.top + RAT_INSET}px`;
		host.style.opacity = "1";
	};

	const hide = () => {
		host.style.opacity = "0";
	};

	const setActiveCard = (card: HTMLElement | null) => {
		if (activeCard === card) return;
		activeCard = card;

		if (card) {
			placeOnCard(card);
		} else {
			hide();
		}
	};

	const resolveActiveCard = () => {
		if (touchActiveCard) {
			setActiveCard(touchActiveCard);
			return;
		}

		const hovered = cards().find((card) => card.matches(":hover"));
		if (hovered) {
			setActiveCard(hovered);
			return;
		}

		const focused = cards().find((card) => card === document.activeElement);
		setActiveCard(focused ?? null);
	};

	const onPointerDown = (event: PointerEvent) => {
		if (event.pointerType !== "touch") return;

		const card = (event.target as Element | null)?.closest<HTMLElement>(
			CARD_SELECTOR,
		);
		touchActiveCard = card;
		resolveActiveCard();
	};

	const onFocusIn = (event: FocusEvent) => {
		const card = (event.target as Element | null)?.closest<HTMLElement>(
			CARD_SELECTOR,
		);
		if (card) setActiveCard(card);
	};

	const onFocusOut = (event: FocusEvent) => {
		const card = (event.target as Element | null)?.closest<HTMLElement>(
			CARD_SELECTOR,
		);
		if (!card) return;
		window.requestAnimationFrame(() => resolveActiveCard());
	};

	const onScrollOrResize = () => {
		if (activeCard) placeOnCard(activeCard);
	};

	document.addEventListener("pointerdown", onPointerDown, { passive: true });
	document.addEventListener("focusin", onFocusIn);
	document.addEventListener("focusout", onFocusOut);
	window.addEventListener("scroll", onScrollOrResize, { passive: true });
	window.addEventListener("resize", onScrollOrResize);

	for (const card of cards()) {
		card.addEventListener("mouseenter", () => {
			if (touchActiveCard) return;
			setActiveCard(card);
		});
		card.addEventListener("mouseleave", () => {
			if (touchActiveCard) return;
			window.requestAnimationFrame(() => resolveActiveCard());
		});
	}

	function cleanup() {
		document.removeEventListener("pointerdown", onPointerDown);
		document.removeEventListener("focusin", onFocusIn);
		document.removeEventListener("focusout", onFocusOut);
		window.removeEventListener("scroll", onScrollOrResize);
		window.removeEventListener("resize", onScrollOrResize);
		disposeViewer();
		host.remove();
		activeCleanup = null;
	}

	activeCleanup = cleanup;
	return cleanup;
}
