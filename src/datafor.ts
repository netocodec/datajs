import {Global} from './global';
import {Network} from './net';

/**
 * Data For Class
 *
 * ```HTML
 * 
 * <TAGNAME data-for 
 *		data-fields="FIELD_NAME;FIELD_NAME;`STRING_FIELD`;FIELD_NAME;..."
 * 		data-request-url="URI"
 * 		data-request-method="METHOD_TYPE"
 * 		data-request-params='{ "FIELD_NAME": "FIELD_VALUE" }'
 * 		data-request-refresh="TIME_IN_SECONDS"></TAGNAME>
 * ```
 *	data-for --> Required
 *	data-fields --> Required
 *	data-request-url --> Required
 *	data-request-method --> Required
 *	data-request-params --> Required only on POST method
 *	data-request-refresh --> Optional
 *
 *
	On data-request-params attribute if you want use the date in real time you can use this "time": "DATE_NOW"
   and the DataJS will put on the request the current HOUR:MINUTE payload.
 *
 *	On data-fields you can explore the data structure object. For example "propertyname.insideproperty.array[0].valueproperty"
 *	
 *	For data-for work properly your request must return JSON structure
 */
export class DataFor{

	private readonly FIELD_SEPARATOR:string = ";";
	private readonly RAW_FIELD:RegExp = /`/g;
	private readonly RAW_FIELD_STR:string = "`";
	private readonly PROTOCOL:string = "://";

	private refreshTimer:any = null;

	constructor(element:HTMLElement) {
		const self:any = this;

		let element_tagname:string = element.tagName.toLowerCase();
		let element_dataset:any = element.dataset;


		let fields:string[] = element_dataset.fields.split(this.FIELD_SEPARATOR);
		let requestMethod:string = element_dataset.requestMethod;
		let requestParams:string = element_dataset.requestParams;
		let requestRefresh:string = element_dataset.requestRefresh;
		let url:string = element_dataset.requestUrl;

		if(url.indexOf(this.PROTOCOL) === -1){
			self.construct_result(element_tagname, window[url], fields);
		}else{
			let refresh:any = () => {
				new Network(url, requestMethod, requestParams, true).call((_, data_json)=>{
					self.construct_result(element_tagname, data_json, fields, element);
				}, (_)=>{
					self.construct_result(element_tagname, [], fields, element);
				});	

			};

			if(requestRefresh){
				this.refreshTimer = setInterval(() => {
					refresh();
				}, parseInt(requestRefresh)*1000);
			}

			refresh();
		}
	}

	public construct_result(element_tagname:string, data:any[], fields:string[], element:HTMLElement){
		for(let data_id=0;data_id<data.length;data_id++){
			let data_item:object = data[data_id];

			for(let field_id=0;field_id<fields.length;field_id++){
				let field_element:HTMLElement = document.createElement(element_tagname);
				let field:string = fields[field_id];
				let field_id_str:string = field_id.toString();
				let query_string:string = '[data-id="'+field_id_str+'"]';

				field_element.dataset.id = field_id_str;
				if(element.querySelector(query_string)){
					field_element = element.querySelector(query_string);
				}

				if(field.indexOf(this.RAW_FIELD_STR)!==-1){
					field_element.innerHTML = field.replace(this.RAW_FIELD, '');
				}else{
					field_element.innerHTML = Global.getStringProperty(data_item, field);
				}

				element.appendChild(field_element);
			}
		}
	}

	public error_result(element:HTMLElement, element_tagname:string){
		let field_element:HTMLElement = document.createElement(element_tagname);
		field_element.innerHTML = 'No Datasource found!';

		element.appendChild(field_element);

	}

	public destroy(){
		if(this.refreshTimer !== null){
			clearInterval(this.refreshTimer);
			this.refreshTimer = null;
		}
	}
}
