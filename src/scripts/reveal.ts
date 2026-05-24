const observerOptions: IntersectionObserverInit = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(
	(entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	},
	observerOptions,
);

document.querySelectorAll("[data-reveal]").forEach((element: Element) => {
	observer.observe(element);
});
