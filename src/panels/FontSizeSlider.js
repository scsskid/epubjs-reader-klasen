export class FontSizeSlider {
	constructor(reader) {
		this.input = document.createElement("input");
		this.container = document.createElement("div");
		this.toggle = document.getElementById("#btn-t");
		this.reader = reader;
		this.buildDomElements();
		this.listen();
		this.init();

		this.input.value = reader.settings?.styles?.fontSize || 100;

		reader.on("toggle font size slider", () => {
			console.log("toggle font size slider");
			this.container.classList.toggle("active");
		});

		// close font size slider if user clicks outside of it except for the toggle button
		document.addEventListener("click", (e) => {
			// Todo
		});

		// !throws webpack error
		// reader.on("bookready", (e) => {
		//   console.log("bookready -> init()", e);
		//   this.init();
		// }
	}

	// create Dom elements for font size widget
	buildDomElements() {
		this.container.classList.add("font-size-slider");
		this.container.textContent = "Font Size";

		this.input.type = "range";
		this.input.min = 90;
		this.input.max = 150;
		this.input.step = 10;

		this.container.appendChild(this.input);
	}

	// listen for changes to font size widget
	// emit styleschanged event to apply new font size
	// save settings to local storage
	listen() {
		this.input.addEventListener("input", (e) => {
			reader.emit("styleschanged", {
				fontSize: parseInt(e.target.value),
			});
			reader.saveSettings();
		});
	}

	init() {
		document.body.append(this.container);
	}
}
