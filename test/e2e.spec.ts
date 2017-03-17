import {expect} from 'chai';
import {Vidi} from '../src';
import {NativeEnvironmentSupport} from '../src/utils/environment-detection';

describe('Vidi e2e', function () {
    this.timeout(10000);

    let videoElement: HTMLVideoElement;
    const formatsToTest = [
        { type: 'MP4', url: 'http://localhost:3000/sample.mp4', supportedByEnv: NativeEnvironmentSupport.MP4 },
        { type: 'WEBM', url: 'http://localhost:3000/sample.webm', supportedByEnv: NativeEnvironmentSupport.WEBM },
        { type: 'HLS', url: 'http://localhost:3000/sample.m3u8', supportedByEnv: NativeEnvironmentSupport.HLS || NativeEnvironmentSupport.MSE },
        { type: 'DASH', url: 'http://localhost:3000/sample.mpd', supportedByEnv: NativeEnvironmentSupport.DASH || NativeEnvironmentSupport.MSE }
    ];

    beforeEach(function () {
        videoElement = document.createElement('video');
        document.body.appendChild(videoElement)
    });

    afterEach(function () {
        document.body.removeChild(videoElement);
    });


    formatsToTest.forEach(formatToTest => {
        if (formatToTest.supportedByEnv) {
            it(`allows playback of ${formatToTest.type}`, function (done) {
                const vidi = new Vidi(videoElement);

                vidi.on('durationchange', (newDuration) =>{
                    if (newDuration > 0) {
                        vidi.off('durationchange');
                        done();
                    }
                });
                vidi.src = formatToTest.url;
            });
        }
    });
});
