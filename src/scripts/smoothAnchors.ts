document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
	anchor.addEventListener("click", (e: Event) => {
		e.preventDefault();
		const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
		const target = href ? document.querySelector(href) : null;

		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});
