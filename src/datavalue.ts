import {Network} from './net';
import {Global} from './global';

class DataValue{
	constructor(element:HTMLElement) {
		let self:any = this;
		let element_dataset:any = element.dataset;

		let url:string = element_dataset.requestUrl;
		let requestMethod:string = element_dataset.requestMethod;
		let requestParams:string = element_dataset.requestParams;
		let data_value = element_dataset.value;

		new Network(url, requestMethod, requestParams, true).call((_, data_json)=>{
			self.construct_result(element, data_json, data_value);
		}, (_)=>{
			self.construct_result(element, {}, data_value);
		});	
	}

	public construct_result(element:HTMLElement, data_json:any, data_value:string){
		element.innerHTML = Global.getStringProperty(data_json, data_value);
	}

	public destroy(){
	}
}
