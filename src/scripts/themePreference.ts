// The theme itself is applied before first paint by the inline bootstrap in
// src/layouts/BaseLayout.astro. This module only wires the toggle button.
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
