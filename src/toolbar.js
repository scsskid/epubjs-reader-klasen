import { UIPanel, UIDiv, UIInput } from "./ui.js";
import { MetadataPanel } from "./panels/metadata_panel.js";

export class Toolbar {
	constructor(reader) {
		const strings = reader.strings;

		const container = new UIDiv().setId("toolbar");

		const start = new UIPanel().setId("start");
		const opener = new UIInput("button").setId("btn-s");
		const openerStr = strings.get("toolbar/opener");
		opener.dom.title = openerStr;
		opener.dom.onclick = () => {
			const isOpen = opener.dom.classList.length > 0;

			reader.emit("sidebaropener", !isOpen);

			if (!isOpen) {
				opener.addClass("open");
			} else {
				opener.removeClass("open");
			}
		};

		// sidebar-opener
		start.add(opener);

		const center = new MetadataPanel(reader);

		const end = new UIPanel().setId("end");

		// font size button

		const fontSize = new UIInput("button").setId("btn-t");
		const fontSizeStr = "change font size";
		fontSize.dom.title = fontSizeStr;
		fontSize.dom.addEventListener("click", () => {
			// alert("open font size panel");
			reader.emit("toggle font size slider");
		});

		end.add(fontSize);

		//bookmark button
		const bookmark = new UIInput("button").setId("btn-b");
		const bookmarkStr = strings.get("toolbar/bookmark");
		bookmark.dom.title = bookmarkStr;
		bookmark.dom.addEventListener("click", () => {
			const cfi = reader.rendition.currentLocation().start.cfi;
			reader.emit("bookmarked", reader.isBookmarked(cfi) === -1);
		});

		end.add(bookmark);

		// close issue button
		const closeEPub = new UIInput("button").setId("btn-f");
		const closeEPubStR = "X"; //strings.get('toolbar/fullsceen');
		closeEPub.dom.title = closeEPubStR;
		closeEPub.dom.addEventListener("click", () => {
			alert("close the issue");
			purple.closeView();
		});

		end.add(closeEPub);

		container.add([start, center, end]);
		document.body.appendChild(container.dom);

		//-- events --//

		reader.on("relocated", (location) => {
			const cfi = location.start.cfi;

			if (reader.isBookmarked(cfi) === -1) {
				bookmark.removeClass("bookmarked");
			} else {
				bookmark.addClass("bookmarked");
			}
		});

		reader.on("bookmarked", (value) => {
			if (value) {
				bookmark.addClass("bookmarked");
			} else {
				bookmark.removeClass("bookmarked");
			}
		});
	}

	// disable fullscreen
	// toggleFullScreen() {

	// 	document.activeElement.blur();

	// 	if (document.fullscreenElement === null) {
	// 		document.documentElement.requestFullscreen();
	// 	} else if (document.exitFullscreen) {
	// 		document.exitFullscreen();
	// 	}
	// }
}
