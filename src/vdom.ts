type DOMItem ={
	id:string
	element:HTMLElement
	element_class:any
}

export class VDOM {

	public static dom_list:DOMItem[] = [];

	public static add_element(element: DOMItem){
		VDOM.dom_list.push(element);
	}


	public static clear(){
		for(let c:number =0;c<VDOM.dom_list.length;c++){
			VDOM.dom_list[c].element_class.destroy();
			VDOM.dom_list[c].element.remove();
		}

		VDOM.dom_list = [];
	}

	public static remove_element(id:string){
		let result_id:number=-1;

		for(let c:number =0;c<VDOM.dom_list.length;c++){
			let dom_i:DOMItem = VDOM.dom_list[c];

			if(dom_i.id === id){
				result_id = c;
				break;
			}
		}

		if(result_id !== -1){
			VDOM.dom_list[result_id].element_class.destroy();
			VDOM.dom_list[result_id].element.remove();
			VDOM.dom_list.splice(result_id, 1);
		}
	}
}

