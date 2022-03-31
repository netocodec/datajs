type DOMItem ={
	id:string
	element:HTMLElement
	element_class:any
}

/**
	@class VDOM

   	@static

   	Virtual DOM sector of the libary.
*/
export class VDOM {

	// Elements list
	public static dom_list:DOMItem[] = [];

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
}

