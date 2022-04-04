import {DataFor} from './datafor';
import {DataValue} from './datavalue';
import {DataImage} from './dataimage';
import {DataVideo} from './datavideo';

type DOMItem ={
	id:string
	element:HTMLElement
	element_class:any
}

export type DOMTagList = {
	id:string
	attr_name:string
}

/**
	@class VDOM

   	@static

   	Virtual DOM sector of the libary.
*/
export class VDOM {

	// Elements list
	public static dom_list:DOMItem[] = [];

	// Valid tag list
	public static readonly VALID_VDOM_LIST:DOMTagList[] = [
		{
			id:'dfor',
			attr_name:'[data-for]'
		},
		{
			id:'dvalue',
			attr_name:'[data-value]'
		},
		{
			id:'dimage',
			attr_name:'[data-image]'
		},
		{
			id:'dvideo',
			attr_name:'[data-video]'
		}
	];

	/**
	  Function to add an element into the virtual DOM.
	 */
	public static add_element(element: DOMItem){
		VDOM.dom_list.push(element);
	}


	/**
	  Clears outall the elements of the DOM and clears the virtual DOM list.
	 */
	public static clear(){
		for(let c:number =0;c<VDOM.dom_list.length;c++){
			VDOM.dom_list[c].element_class.destroy();
			VDOM.dom_list[c].element.remove();
		}

		VDOM.dom_list = [];
	}

	/**
		Removes an element by his ID.
		*/
	public static remove_element(id:string){
		for(let c:number =0;c<VDOM.dom_list.length;c++){
			let dom_i:DOMItem = VDOM.dom_list[c];

			if(dom_i.id === id){
				VDOM.dom_list[c].element_class.destroy();
				VDOM.dom_list[c].element.remove();
				VDOM.dom_list.splice(c, 1);
				break;
			}
		}
	}

	// Gets the class of the choosen attr
	public static get_class(id:string): any{
		let result:any = null;

		switch(id){
			case 'dfor':
				result = DataFor;
			break;

			case 'dvalue':
				result = DataValue;
			break;

			case 'dimage':
				result = DataImage;
			break;

			case 'dvideo':
				result = DataVideo;
			break;
		}

		return result;
	}
}

