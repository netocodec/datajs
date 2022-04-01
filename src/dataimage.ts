/**
 * Data Image Class - This is to show an image.
 *
 * ```HTML
 * 
 * <TAGNAME data-image="IMAGE_URI"></TAGNAME>
 * ```
 *	data-image --> Required
 *
 */
export class DataImage{

	private element:HTMLElement;

	constructor(element:HTMLElement) {
		this.element = element;

		let element_src:string = element.dataset.image;

		this.construct_result(element, element_src);
	}

	public construct_result(element:HTMLElement, src:string){
		let new_image_element:HTMLImageElement = document.createElement('img') as HTMLImageElement;

		new_image_element.src = src;

		element.appendChild(new_image_element);
	}

	public destroy(){}
}
