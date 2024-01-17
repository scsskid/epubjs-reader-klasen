export function FontSizeSlider(reader) {
	console.log("FontSizeSlider", reader);

	const input = document.createElement("input");
	input.type = "range";

	const label = document.createElement("div");
	label.style["position"] = "fixed";
	label.style["zIndex"] = "100";

	label.textContent = "Font Size";
	label.classList.add("font-size-slider-foo");
	label.appendChild(input);

	document.body.append(label);

	input.addEventListener("input", (e) => {
		console.log(e.target.value);
		reader.emit("styleschanged", {
			fontSize: parseInt(e.target.value) * 2,
		});
	});
}
