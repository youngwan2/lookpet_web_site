const proj4 = require('proj4');

// 원본 좌표 시스템과 타겟 좌표 시스템의 정의가 필요합니다.
const source = 'EPSG:5181'; // 원본 좌표 시스템
const target = 'EPSG:4326'; // 타겟 좌표 시스템 (경도, 위도)

// 원본 좌표값
const x = 190562.9092;
const y = 189333.0171;

// 좌표 변환
proj4.defs(source, '+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +towgs84=577.3,90.1,463.9,5.137,1.474,5.297,2.4232 +units=m +no_defs');
const converted = proj4(source, target, [x, y]);

console.log('경도:', converted[0]);
console.log('위도:', converted[1]);