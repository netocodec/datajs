/**
 * Data Video Class - This is to show a video.
 *
 * ```HTML
 * 
 * <TAGNAME data-video="VIDEO_URI"></TAGNAME>
 * ```
 *	data-video --> Required
 *
 */
export class DataVideo{

	private element:HTMLElement;

	constructor(element:HTMLElement) {
		this.element = element;
		this.construct_result(element);
	}

	public construct_result(element:HTMLElement){
		let dataset:any  = element.dataset;
		let video_src:string = dataset.video;
		let autoplay:string = dataset.autoplay; 
		let preload:string = dataset.preload; 
		let texture:string = dataset.texture; 
		let width:string = dataset.width; 
		let height:string = dataset.height; 
		let volume:number = dataset.volume;
		let new_video_element:HTMLVideoElement = document.createElement('img') as HTMLVideoElement;

		new_video_element.src = src;

		if(autoplay){
			new_video_element.setAttribute('autoplay', '');
		}

		if(preload){
			new_video_element.setAttribute('preload', '');
		}

		if(texture){
			new_video_element.setAttribute('texture', '');
		}

		if(width){
			new_video_element.setAttribute('width', width);
		}

		if(height){
			new_video_element.setAttribute('height', height);
		}

		if(volume){
			new_video_element.volume = volume;
		}

		element.appendChild(new_image_element);
	}

	public destroy(){}
}
