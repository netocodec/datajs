/**
 * Data Value Class - This is to show the value.
 *
 * ```HTML
 * 
 * <TAGNAME data-redirect="URI" data-window-new></TAGNAME>
 * ```
 *	data-redirect --> Required
 *	data-window-new --> Optional
 *
 */
export class DataRedirect{

	private element:HTMLElement;

	constructor(element:HTMLElement) {
		this.element = element;

		let self:any = this;
		let element_dataset:any = element.dataset;
		let url:any = element_dataset.redirect;
		let open_new_window:any = element_dataset.windowNew;

		this.construct_result(element, url, open_new_window);
	}

	public construct_result(element:HTMLElement, data_value:any, data_window_new:any){
		element.onclick = () => {
			if(data_window_new !== undefined){
				window.open(data_value, '_blank');
			}else{
				window.location = data_value;
			}
		};
	}

	public destroy(){}
}
