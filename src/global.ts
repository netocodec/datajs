/**
@class Global

This is the global class. It is used to create helpfull functions for the dataset structures.
*/
export class Global{

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
}
