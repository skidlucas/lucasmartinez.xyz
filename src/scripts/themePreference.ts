const theme = (() => {
	if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
		return localStorage.getItem("theme");
	}

	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}

	return "light";
})();

if (theme === "dark") {
	document.documentElement.setAttribute("data-theme", "dark");
}

const handleToggleClick = () => {
	const element = document.documentElement;
	const isDark = element.getAttribute("data-theme") === "dark";

	element.setAttribute("data-theme", isDark ? "light" : "dark");
	localStorage.setItem("theme", isDark ? "light" : "dark");
};

const toggleButton = document.getElementById("theme-toggle");

if (toggleButton instanceof HTMLButtonElement) {
	toggleButton.addEventListener("click", handleToggleClick);
}
