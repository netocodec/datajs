export class Global{

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
