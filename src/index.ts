import {DataFor} from './datafor';
import {VDOM} from './vdom';

declare global {
	interface Window { DataJS: any; }
}

class DataJS {

	constructor(){
		console.log('DataJS v1.0.0');

		const data_for_elements:NodeListOf<HTMLElement> = document.querySelectorAll('[data-for]');

		for(let elem_id:number=0;elem_id<data_for_elements.length;elem_id++){
			let element:HTMLElement=data_for_elements[elem_id];
			let data_element:DataFor = new DataFor(element);

			element.dataset.id= elem_id.toString();
			VDOM.add_element({
				id:'dfor-'+elem_id.toString(),
				element:element,
				element_class: data_element
			});
		}

		setInterval(function(){
			console.log(VDOM.dom_list);
		}, 10000);
	}


	public clear_datajs(){
		console.log('Clear DataJS...');
		VDOM.clear();
	}
}

window.DataJS = DataJS;
