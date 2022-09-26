import * as local from "../dist";
import * as publish from "@compy-ryu/ts-module";

// 이곳에서 로컬 및 배포용 모듈을 테스트 하실 수 있습니다.
// npm run start
console.log("🦖 모듈 테스트용 패키지가 실행되었어요!");

// 실행 예시
console.log("로컬 빌드 모듈 실행", local.isNull(null));
console.log("배포 버전 모듈 실행", publish.isNull(null));
