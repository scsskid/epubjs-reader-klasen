export class FontSizeSlider {
	constructor(reader) {
		console.log("FontSizeSlider2", reader);

		this.buildDomElements();
		this.listen();
		this.init();

		// !throws webpack error
		// reader.on("bookready", (e) => {
		//   console.log("bookready -> init()", e);
		// }
	}

	buildDomElements() {
		this.container = document.createElement("div");
		this.container.style["position"] = "fixed";
		this.container.style["zIndex"] = "100";
		this.container.textContent = "Font Size";
		this.container.classList.add("font-size-slider");

		this.input = document.createElement("input");
		this.input.type = "range";

		this.container.appendChild(this.input);
	}

	listen() {
		this.input.addEventListener("input", (e) => {
			console.log(e.target.value);
			reader.emit("styleschanged", {
				fontSize: parseInt(e.target.value) * 2,
			});
		});
	}

	init() {
		console.log("FontSizeSlider2 init");
		document.body.append(this.container);
	}
}
