import {Network} from './net';
import {Global} from './global';

/**
 * Data Value Class - This is to show the value.
 *
 * ```HTML
 * 
 * <TAGNAME data-value="VALUE_FIELD" 
 * 		data-escaped-fields
 * 		data-request-url="URI"
 * 		data-request-method="METHOD_TYPE"
 * 		data-request-params='{ "FIELD_NAME": "FIELD_VALUE" }'
 *		data-request-value="FIELD_NAME"></TAGNAME>
 * ```
 *	data-value --> Required
 *	data-request-url --> Required
 *	data-request-method --> Required
 *	data-request-params --> Required only on POST method
 *	data-request-value --> Optional
 *	data-escaped-fields --> Optional
 *
 *	The field "data-request-value" is used to tell the code where is the real result.
 *
 *	Example:
 *		Result of the request is: {  result: [ "hello", "world", "123"] }
 *
 *		But your result on HTML is : [object] Object.
 *		You use the attiribute "data-request-value='result'" and then you have the result in the HTML "helloworld123"
 *
 *	On data-request-params attribute if you want use the date in real time you can use this "time": "DATE_NOW"
 *  and the DataJS will put on the request the current HOUR:MINUTE payload.
 *
 *	On data-value you can explore the data structure object. For example "propertyname.insideproperty.array[0].valueproperty"
 *	
 *	For data-value works properly withJSON structure
 */
export class DataValue{

	private element:HTMLElement;
	private escapedFields:boolean = false;

	constructor(element:HTMLElement) {
		this.element = element;

		let self:any = this;
		let element_dataset:any = element.dataset;

		let url:string = element_dataset.requestUrl;
		let requestMethod:string = element_dataset.requestMethod;
		let requestParams:string = element_dataset.requestParams;
		let data_value = element_dataset.value;
		let escaped_fields:string = element_dataset.escapedFields;
		
		this.escapedFields = (escaped_fields !== undefined);

		new Network(url, requestMethod, requestParams, true).call((_, data_json)=>{
			self.construct_result(element, data_json, data_value);
		}, (_)=>{
			self.construct_result(element, {}, data_value);
		});	
	}

	public construct_result(element:HTMLElement, data_json:any, data_value:string){
		let obj:any = Global.createStringValue(data_value, data_json);

		if(!this.escapedFields){
			obj.result = Global.escapeHTMLCode(obj.result);
		}

		element.innerHTML = obj.result;
	}

	public destroy(){}
}
