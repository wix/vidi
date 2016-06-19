const Hls = require('hls.js');
import {MediaStream, MediaStreamHandler, MediaStreamTypes} from '../types';
import {envSupports} from '../utils';

export class HlsStreamHandler implements MediaStreamHandler {
    private hls = null;

    isSupported(): boolean {
        return envSupports.MSE && Hls.isSupported();
    };

    canHandleStream(mediaStream: MediaStream) {
        return mediaStream.type === MediaStreamTypes.HLS;
    }

    attach(videoElement: HTMLVideoElement, mediaStream: MediaStream) {
        this.hls = new Hls();
        this.hls.attachMedia(videoElement);
        this.hls.loadSource(mediaStream.url);
    }

    detach(videoElement: HTMLVideoElement) {
        this.hls.destroy();
        this.hls = null;
    }
}
