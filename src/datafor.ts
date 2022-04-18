import {Global, FieldValueResult} from './global';
import {Network} from './net';

/**
 * Data For Class - This is similar has a loop for to present the result on HTML code.
 *
 * ```HTML
 * 
 * <TAGNAME data-for 
 *		data-fields="FIELD_NAME;FIELD_NAME;`STRING_FIELD`;FIELD_NAME;..."
 *		data-escaped-fields="FIELD_NAME;FIELD_NAME;FIELD_NAME;..."
 * 		data-request-url="URI"
 * 		data-request-method="METHOD_TYPE"
 * 		data-request-params='{ "FIELD_NAME": "FIELD_VALUE" }'
 * 		data-request-refresh="TIME_IN_SECONDS"
 * 		data-filter-top="NUMBER_OF_RESULTS_TO_SHOW"
 *		data-filter-fields="FIELD_NAME OPERATOR VALUE_NAME;FIELD_NAME OPERATOR VALUE_NAME;FIELD_NAME OPERATOR VALUE_NAME;..."
 *		data-request-value="FIELD_NAME"
 *		data-no-message="NO_MESSAGE_ERROR"></TAGNAME>
 * ```
 *	data-for --> Required
 *	data-fields --> Required
 *	data-request-url --> Required
 *	data-request-method --> Required
 *	data-request-params --> Required only on POST method
 *	data-request-refresh --> Optional
 *	data-request-value --> Optional
 *	data-filter-top --> Optional
 *	data-filter-fields --> Optional
 *	data-escaped-fields --> Optional
 *	data-no-message --> Optional
 *
 *	The field "data-request-value" is used to tell the code where is the real result.
 *
 *	Example:
 *		Result of the request is: {  result: [ "hello", "world", "123"] }
 *
 *		But your result on HTML is : [object] Object.
 *		You use the attiribute "data-request-value='result'" and then you have the result in the HTML "helloworld123"
 *
 *	On data-request-params attribute if you want use the date in real time you can use this "time": "DATE_NOW" and the DataJS will put on the request the current HOUR:MINUTE payload.
 *
 *	On data-fields you can explore the data structure object. For example "propertyname.insideproperty.array[0].valueproperty"
 *	
 *	For data-for work properly your request must return JSON structure
 *	For data-filter-fields you can use comparation operators like this structure: data-filter-fields="gender==female;cell==95106057"
 *	Becareful doing the filters because it is very restrict about the rules you put. It does not allow spaces between the OPERATOR and the FIELD and VALUE, only the left side uses variable type and the right side operator uses value type.
 */
export class DataFor{

	private readonly PROTOCOL:string = "://";
	private readonly SEARCH_ELEMENTS:string = '[data-for-subid][data-for-id]';

	private refreshTimer:any = null;
	private escapedFields:string[] = [];
	private filterTop:number = -1;
	private noMessage:string;

	constructor(element:HTMLElement) {
		const self:any = this;

		let element_tagname:string = element.tagName.toLowerCase();
		let element_dataset:any = element.dataset;

		let fields:string = element_dataset.fields;
		let escaped_fields:string = element_dataset.escapedFields;
		let requestMethod:string = element_dataset.requestMethod;
		let requestParams:string = element_dataset.requestParams;
		let requestRefresh:string = element_dataset.requestRefresh;
		let requestValue:string = element_dataset.requestValue;
		let url:string = element_dataset.requestUrl;
		let filter_top:number = element_dataset.filterTop;
		let no_message:string = element_dataset.noMessage;
 		let filterFields:string = element_dataset.filterFields;

		if(escaped_fields){
			this.escapedFields = escaped_fields.split(Global.FIELD_SEPARATOR);
		}

		if(filter_top){
			this.filterTop = filter_top;
		}

		if(no_message){
			this.noMessage = no_message;
		}

		if(url.indexOf(this.PROTOCOL) === -1){
			self.construct_result(element_tagname, window[url], fields, element);
		}else{
			let refresh:any = () => {
				new Network(url, requestMethod, requestParams, true).call((_, data_json)=>{
					let request_result:any = data_json;

					if(requestValue){
						request_result = Global.getStringProperty(data_json, requestValue);
					}

					if(filterFields){
						request_result = Global.filterData(request_result, filterFields);
					}

					self.construct_result(element_tagname, request_result, fields, element);
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

	public construct_result(element_tagname:string, data:any[], field:string, element:HTMLElement){
		let data_total:number = data.length;

		if(this.filterTop !== -1){
			data_total = this.filterTop;
		}

		for(let data_id:number=0;data_id<data_total;data_id++){
			let data_item:object = data[data_id];

			if(data_item){
				let data_sub_id:string = data_id.toString();
				let fields:FieldValueResult = Global.createStringValue(field, data_item);

				for(let field_id:number=0;field_id<fields.fields_list.length;field_id++){
					let field_element:HTMLElement = document.createElement(element_tagname);
					let field:string = fields.fields_list[field_id];
					let field_id_list_item:string = fields.fields_id_list[field_id];
					let field_id_str:string = field_id.toString();
					let query_string:string = '[data-for-subid="'+data_sub_id+'"][data-for-id="'+field_id_str+'"]';

					field_element.dataset.forId = field_id_str;
					field_element.dataset.forSubid = data_sub_id;
					if(element.querySelector(query_string)){
						field_element = element.querySelector(query_string);
					}

					if(this.escapedFields.indexOf(field_id_list_item) === -1){
						field = Global.escapeHTMLCode(field.toString());
					}
					field_element.innerHTML = field;

					element.appendChild(field_element);
				}		
			}
		}
		this.clean_up_unwanted_result(data.length, Global.getFieldsLength(field), element);

		if(data_total===0 && this.noMessage){
			let field_element:HTMLElement = document.createElement(element_tagname);
			let query_string:string = '[data-for-subid="0"][data-for-id="0"]';

			field_element.dataset.forId = '0';
			field_element.dataset.forSubid = '0';


			if(element.querySelector(query_string)){
				field_element = element.querySelector(query_string);
			}
			field_element.innerHTML = Global.escapeHTMLCode(this.noMessage);

			element.appendChild(field_element);
		}
	}

	public clean_up_unwanted_result(total_data:number, total_fields:number, element:HTMLElement){
		let elements_to_clean:NodeListOf<HTMLElement> = element.querySelectorAll(this.SEARCH_ELEMENTS);

		for(let d:number=total_data;d<elements_to_clean.length;d++){
			for(let f:number=0;f<total_fields;f++){
				let query_string:string = '[data-for-subid="'+d+'"][data-for-id="'+f+'"]';
				let target_element:HTMLElement = element.querySelector(query_string);

				if(target_element){
					target_element.remove();
				}
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
