import {VDOM, DOMTagList} from './vdom';

declare global {
	interface Window { DataJS: any; }
}

/**
  @class DataJS

  DataJS main class.
 */
class DataJS {
	constructor(){
		console.log('DataJS v1.0.1');

		for(let property_id:number = 0;property_id<VDOM.VALID_VDOM_LIST.length;property_id++){
			let tag:DOMTagList = VDOM.VALID_VDOM_LIST[property_id];
			const data_elements:NodeListOf<HTMLElement> = document.querySelectorAll(tag.attr_name);

			for(let elem_id:number=0;elem_id<data_elements.length;elem_id++){
				let element:HTMLElement=data_elements[elem_id];
				let data_element:any = VDOM.get_class(tag.id);

				if(data_element !== null){
					data_element = new data_element(element);

					element.dataset.id= elem_id.toString();
					VDOM.add_element({
						id:`${tag.id}-${elem_id.toString()}`,
						element:element,
						element_class: data_element
					});
				}
			}
		}
	}


	/**
		Clears all the timers, VDOM and every element connected with the DataJS.
		*/
	public clear_datajs(){
		console.log('Clear DataJS...');
		VDOM.clear();
	}
}

window.DataJS = DataJS;
