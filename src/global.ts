export type FieldValueResult = {
	result:string
	fields_list:string[]
};

/**
@class Global

This is the global class. It is used to create helpfull functions for the dataset structures.
*/
export class Global{


	private static readonly FIELD_SEPARATOR:string = ";";
	private static readonly RAW_FIELD:RegExp = /`/g;
	private static readonly RAW_FIELD_STR:string = "`";


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

	static createStringValue(string_pattern:string, value_object:any): FieldValueResult{
		let result:FieldValueResult = {
			result:'',
			fields_list:[]
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
			result.result += field_result;
		}

		return result;
	}

	static getFieldsLength(string_pattern:string): number{
		return string_pattern.split(Global.FIELD_SEPARATOR).length;
	}
}
