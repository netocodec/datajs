export type FieldValueResult = {
	result:string
	fields_list:string[]
	fields_id_list:string[]
};

/**
@class Global

This is the global class. It is used to create helpfull functions for the dataset structures.
 */
export class Global{


	public static readonly FIELD_SEPARATOR:string = ";";
	private static readonly RAW_FIELD:RegExp = /`/g;
	private static readonly ESCAPE_HTML:RegExp = /(<\/{1})|(<{1})/gmi;
	private static readonly RAW_FIELD_STR:string = "`";
	private static readonly OPERATORS_LIST:string[] = ['>', '<', '<=', '>=', '==', '!='];


	/**
	  @param variable{any}
	  @param pattern{string}

	  This function will search for the property inside of an JSON object.

	  For example:

	  ```
	  let obj_json:any = { foo: "bar", hello: "world", this_is: "a test", obj_t:{ foo:"bar2" } };

	// This will return "a test" has an output.
	console.log(Global.getStringProperty(obj_json, 'this_is'));

	// This will return "bar2" has a string output.
	console.log(Global.getStringProperty(obj_json, 'obj_t.foo'));
	```
	 */
	static getStringProperty(variable:any, pattern:string){
		let result:any = variable;
		let striped_pattern:string = pattern.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
		let pattern_list:string[] = striped_pattern.split('.');

		for(let i:number = 0;i<pattern_list.length;i++){
			let pattern_item:any = pattern_list[i];

			if(pattern_item in result){
				result = result[pattern_item]; 
			}else{
				return result;
			}
		}

		return result;
	}

	/**
		@param string_pattern {string}
	@param value_object {any}

	@return FieldValueResult

	Returns the string formatted with the values, this returns the variables names list and the fields value too.
		*/
	static createStringValue(string_pattern:string, value_object:any): FieldValueResult{
		let result:FieldValueResult = {
			result:'',
			fields_list:[],
			fields_id_list:[]
		};
		let fields:string[] = string_pattern.split(Global.FIELD_SEPARATOR);

		for(let field_id:number=0;field_id<fields.length;field_id++){
			let field:string = fields[field_id];
			let field_result:string = '';

			if(field.indexOf(Global.RAW_FIELD_STR)!==-1){
				field_result = field.replace(Global.RAW_FIELD, '');
			}else{
				field_result = Global.getStringProperty(value_object, field);
			}

			result.fields_list.push(field_result);
			result.fields_id_list.push(field);
			result.result += field_result;
		}

		return result;
	}

	/**
		@param string_pattern {string}

	@return number

	Gets the number of fields separated by semi-colon.
		*/
	static getFieldsLength(string_pattern:string): number{
		return string_pattern.split(Global.FIELD_SEPARATOR).length;
	}

	/**
		@param html_code {string}

	@return string

	Replace the "<" chars of the HTML code.
		*/
	static escapeHTMLCode(html_code:string): string{
		return html_code.replace(Global.ESCAPE_HTML, '');
	}


	static filterData(data:any[], fields:string):any[]{
		let fields_list:string[] = fields.split(Global.FIELD_SEPARATOR);
		let result:any[] = data;

		for(let c:number = 0;c<fields_list.length;c++){
			let field_item:string = fields_list[c];

			for(let x:number =0;x<Global.OPERATORS_LIST.length;x++){
				let seperator:string = Global.OPERATORS_LIST[x];

				if(field_item.indexOf(seperator)!==-1) {
					let s_fields:string[] = field_item.split(seperator);
					result = result.filter((item) => {
						return Global.compareData(Global.getStringProperty(item, s_fields[0]), seperator, s_fields[1]);
					});
				}
			}
		}


		return result;
	}

	static compareData(data:any, operator:string, value:any):boolean{
		let result:boolean = false;

		switch(operator){
			case '>':
				result = (data > value);
			break;

			case '<':
				result = (data < value);
			break;

			case '>=':
				result = (data >= value);
			break;

			case '<=':
				result = (data <= value);
			break;

			case '==':
				result = (data === value);
			break;

			case '!=':
				result = (data !== value);
			break;

		}

		return result;
	}
}

