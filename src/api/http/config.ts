export const CURRENT_CONFIG = {
  // license
  appId: '144694', // You need to go to the development website to apply.
  appKey: 'c85976e3dec9b0028557b0cc79631ab', // You need to go to the development website to apply.
  appLicense:
    'GwyqGQWpOTOhIxf6K2RclRZ4ZrY+RWPBkRtJJvwr39Hsxrf0n25RE3dTQ/Yp59p6jKfFD2k7nkFBFLDiI781HA7waieOPXkTrd7qqdHzKYHspAbGb8wVzbGlSWBIWQtWTrPfW45lmn4LHVi4jzm9U9rP68mzlnrt5GajaXEYRag=', // You need to go to the development website to apply.

  // http
  baseURL: 'http://192.168.2.49:6789/', // This url must end with "/". Example: 'http://192.168.1.1:6789/'
  websocketURL: 'ws://192.168.2.49:6789/api/v1/ws', // Example: 'ws://192.168.1.1:6789/api/v1/ws'
  // baseURL: 'http://42.193.19.33:6789/', // This url must end with "/". Example: 'http://192.168.1.1:6789/'
  // websocketURL: 'ws://42.193.19.33:6789/api/v1/ws', // Example: 'ws://192.168.1.1:6789/api/v1/ws'

  // livestreaming
  // RTMP  Note: This IP is the address of the streaming server. If you want to see livestream on web page, you need to convert the RTMP stream to WebRTC stream.
  rtmpURL: 'http://42.193.19.33:8080/live/7CTDM1R00B40GS-165-0-7.flv', // Example: 'rtmp://192.168.1.1/live/'
  // webRtc: 'http://42.193.19.33:1985/rtc/v1/whip/?app=live&stream=livestream&eip=42.193.19.33',
  // GB28181 Note:If you don't know what these parameters mean, you can go to Pilot2 and select the GB28181 page in the cloud platform. Where the parameters same as these parameters.
  gbServerIp: 'video.lushanjkq.cn',
  gbServerPort: '5060',
  gbServerId: '44010200492000000001',
  gbAgentId: 'admin',
  gbPassword: 'yunhe@2020',
  gbAgentPort: '18080',
  gbAgentChannel: '34020000001320001001',
  // RTSP
  rtspUserName: 'Please enter the username.',
  rtspPassword: 'Please enter the password.',
  rtspPort: '8554',
  // Agora
  agoraAPPID: 'b015c196d2644e1fa0e8e95d80835587',
  // agoraToken: '007eJxTYHixbbsJi6K/qB2zZljQ1TYtdZ492aopehOuXZl/NO++sagCQ5KBoWmyoaVZipGZiUmqYVqiQapFqqVpioWBhbGpqYV5lRJ/ugAfA0NV4pV0RgYIBPHZGJIzUvPSE5kZLCzMAauxG+g=',
  agoraChannel: 'chenga',
  agoraUID: 887,

  // map
  // You can apply on the AMap website.
  amapKey: 'a6880eefc747eeb97b6c5c53468fe02c',

  // 机场位置
  lng: 104.57450730842426,
  lat: 30.713864892539547
}
