/**
 * Data Video Class - This is to show a video.
 *
 * ```HTML
 * 
 * <TAGNAME data-video="VIDEO_URI"></TAGNAME>
 * ```
 *	data-video --> Required
 *	data-video-autoplay --> Optional
 *	data-video-preload --> Optional
 *	data-video-texture --> Optional
 *	data-video-width --> Optional
 *	data-video-height --> Optional
 *	data-video-volume --> Optional
 *	data-video-controls --> Optional
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
		let autoplay:string = dataset.videoAutoplay; 
		let preload:string = dataset.videoPreload; 
		let texture:string = dataset.videoTexture; 
		let width:string = dataset.videoWidth; 
		let height:string = dataset.videoHeight; 
		let volume:number = dataset.videoVolume;
		let controls:string = dataset.videoControls;
		let new_video_element:HTMLVideoElement = document.createElement('video') as HTMLVideoElement;

		new_video_element.src = video_src;

		if(autoplay !== undefined){
			new_video_element.setAttribute('autoplay', '');
		}

		if(preload !== undefined){
			new_video_element.setAttribute('preload', '');
		}

		if(texture !== undefined){
			new_video_element.setAttribute('texture', '');
		}

		if(width !== undefined){
			new_video_element.setAttribute('width', width);
		}

		if(height !== undefined){
			new_video_element.setAttribute('height', height);
		}

		if(controls !== undefined){
			new_video_element.setAttribute('controls', '');
		}

		if(volume !== undefined){
			new_video_element.volume = volume;
		}

		element.appendChild(new_video_element);
	}

	public destroy(){}
}
