/**
@class Network

@param url{string}
@param method{string}
@param parameters{any}
@param parse_params_to_json[boolean]

This is the Network class. It is used for requests and similar.
*/
export class Network{

	private url:string;
	private method:string;
	private params:any;
	private parse_params_to_json:boolean;

	constructor(url:string, method:string, parameters:any, parse_params_to_json:boolean=true){
		this.url = url;
		this.method = method;
		this.params = parameters;
		this.parse_params_to_json = parse_params_to_json;
	}


	/**
		@param success_callback{any}
   		@param failed_callback{any}

	   This function is to do the request of the given resource.
	*/
	public call(success_callback:any, failed_callback:any){
		let xhr:XMLHttpRequest = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let data_json:any = null;

				try {
					data_json = JSON.parse(xhr.responseText);
				} catch (ex) {
					data_json = xhr.responseText;
				}

				success_callback(xhr, data_json);
			} else if (xhr.readyState === 4 && xhr.status !== 200) {
				failed_callback(xhr);
			}
		};

		if (failed_callback !== undefined){
			xhr.ontimeout = failed_callback;
		}

		xhr.open(this.method, this.url, true);

		xhr.timeout = 30000;

		xhr.setRequestHeader('Referer', this.url);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

		if (this.method === 'POST' && this.params !== undefined){
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

			if(typeof this.params === 'string' && this.parse_params_to_json){
				this.params = JSON.parse(this.params);
			}

			if(this.params.time !== undefined && this.params.time ==='DATE_NOW'){
				let date_now:Date = new Date();

				this.params.time = `${date_now.getHours()}:${date_now.getMinutes()}`;
			}

			xhr.send(JSON.stringify(this.params));
		}else{
			xhr.send();
		}
	}
}

