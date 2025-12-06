import { Difficulty, VocabularyItem } from "../types.ts";

// --- STATIC DATA (MASSIVE COLLECTION) ---

// 1. Initial Game Data (초성 게임) - 50+ Sets
const INITIAL_DATA = [
    // 기존 데이터
    { initial: "ㄱ ㅅ", examples: ["감사", "구슬", "고수", "가슴", "기술", "기숙", "개선", "공사", "기사", "간식", "결석", "교실", "거실", "기습", "가설"] },
    { initial: "ㅇ ㅈ", examples: ["의자", "우주", "아주", "여자", "연주", "인정", "유저", "옷장", "운전", "이전", "약자", "일정", "여전", "완전", "역전"] },
    { initial: "ㅎ ㄱ", examples: ["한글", "학교", "한강", "휴가", "항공", "해골", "환경", "현관", "향기", "후기", "휴강", "해결", "합격", "현금", "효과"] },
    { initial: "ㅂ ㄴ", examples: ["비누", "배낭", "바늘", "보노", "분노", "본능", "밤눈", "배달", "비닐", "반납", "봄날", "배너", "분납", "발냄새"] },
    { initial: "ㅅ ㄱ", examples: ["사과", "수건", "시간", "시계", "소금", "성공", "수고", "사기", "수강", "세계", "생각", "수구", "사고", "순금", "서랍"] },
    { initial: "ㅁ ㅈ", examples: ["모자", "문자", "먼지", "맥주", "문제", "명절", "마중", "무지", "매주", "목주", "물주", "면적", "목적", "민족", "명작"] },
    { initial: "ㄱ ㅈ", examples: ["가족", "과자", "공장", "감자", "계절", "간장", "거울", "가지", "기적", "고장", "극장", "건조", "강자", "경주", "군주"] },
    { initial: "ㅇ ㄹ", examples: ["우리", "요리", "여름", "어른", "이름", "오리", "연락", "유리", "아래", "의뢰", "오류", "음료", "유래", "인력", "압력"] },
    { initial: "ㅈ ㄷ", examples: ["지도", "정답", "전등", "장독", "중독", "자동", "작동", "지대", "제도", "절대", "잔디", "전달", "진동", "중대", "지대"] },
    { initial: "ㅂ ㅈ", examples: ["바지", "반지", "부자", "배추", "박자", "반장", "봉지", "부정", "보장", "병정", "본질", "변주", "백지", "복제", "비자"] },
    { initial: "ㅅ ㅁ", examples: ["사막", "선물", "수면", "설명", "식물", "소망", "신문", "소문", "승마", "실내", "서명", "수명", "산맥", "사면", "세무"] },
    { initial: "ㅎ ㄴ", examples: ["하늘", "흉내", "훈남", "호남", "하녀", "학년", "효녀", "후년", "한눈", "희망", "형님", "훈녀", "흔남", "휘날리다"] },
    { initial: "ㄷ ㄹ", examples: ["다리", "도로", "달력", "대륙", "도루", "달리기", "동료", "대리", "둘리", "단락", "독립", "등록", "달러", "도료", "동력"] },
    { initial: "ㄱ ㅁ", examples: ["거미", "구멍", "고무", "가망", "고민", "국물", "가면", "경마", "골목", "교문", "구름", "기말", "가뭄", "고모", "국민"] },
    { initial: "ㅇ ㄱ", examples: ["야구", "연기", "악기", "안경", "입구", "얼굴", "아기", "일기", "인구", "인기", "안개", "여권", "요구", "연구", "입금"] },
    { initial: "ㅈ ㄱ", examples: ["지구", "장구", "전기", "저녁", "자국", "조각", "작가", "전공", "주기", "장갑", "조국", "자극", "제거", "증거", "종교"] },
    { initial: "ㅊ ㄱ", examples: ["축구", "친구", "천국", "출구", "초기", "총기", "추구", "최고", "철구", "창고", "청국장", "충격", "추가", "참기름", "출국"] },
    { initial: "ㅍ ㄷ", examples: ["포도", "파동", "폭동", "파도", "판돈", "필독", "평등", "풀독", "포대", "폭도", "푸딩", "파닭", "팔도", "팬덤"] },
    { initial: "ㅋ ㅍ", examples: ["커피", "쿠폰", "카피", "캠프", "키퍼", "큰폭", "코피", "쿵푸", "컴퓨터", "키패드", "카페", "쿠파", "콤프"] },
    { initial: "ㄴ ㅁ", examples: ["나무", "나머지", "남매", "눈물", "농민", "낭만", "내무", "너머", "노모", "논문", "내막", "낙마", "눈멀다"] },
    { initial: "ㄷ ㅈ", examples: ["돼지", "동전", "된장", "도장", "단장", "도전", "대장", "단지", "동장", "동점", "답장", "도적", "대전", "독점", "대조"] },
    { initial: "ㄹ ㄷ", examples: ["라디오", "랜턴", "리듬", "롯데", "레드", "리더", "런던", "로동", "레이다", "리들"] },
    { initial: "ㅁ ㄱ", examples: ["미국", "몽골", "물감", "모기", "무기", "만개", "미각", "무게", "망고", "목구멍", "물고기", "문구", "마감", "미궁", "목공"] },
    { initial: "ㅂ ㅎ", examples: ["비행기", "방학", "번호", "병원", "백화점", "보호", "변화", "부활", "배회", "반항", "부호", "비호", "박하", "방해", "발휘"] },
    
    // 신규 추가 데이터
    { initial: "ㅇ ㅇ", examples: ["우유", "오이", "여우", "아이", "이유", "언어", "운영", "인형", "여행", "예약", "영웅", "얼음", "용용", "연어", "양말"] },
    { initial: "ㄱ ㄱ", examples: ["고기", "건강", "감기", "경기", "국기", "광고", "구경", "가곡", "공구", "기간", "개그", "계곡", "고구마", "국가", "관객"] },
    { initial: "ㄴ ㄴ", examples: ["누나", "나나", "남녀", "내년", "나눔", "노노", "낙농", "녹내장", "남남"] },
    { initial: "ㄷ ㄷ", examples: ["도둑", "당당", "대답", "단독", "도달", "대두", "담당", "동동", "두통"] },
    { initial: "ㅂ ㅂ", examples: ["부부", "방법", "바보", "비빔", "반복", "부분", "발발", "보보", "배배"] },
    { initial: "ㅅ ㅅ", examples: ["사슴", "사실", "생선", "소설", "수술", "세상", "상상", "실수", "식사", "순서", "선수", "사설", "신세", "수수", "소속"] },
    { initial: "ㅈ ㅈ", examples: ["자주", "직장", "전쟁", "지진", "제주", "주전자", "전자", "조직", "저장", "재정", "주주", "정전", "진주", "집중", "조조"] },
    { initial: "ㅊ ㅊ", examples: ["추천", "최초", "친척", "청춘", "침체", "출처", "차창", "척추", "천체"] },
    { initial: "ㅎ ㅎ", examples: ["하하", "호호", "후회", "화해", "흔한", "현황", "황혼", "협회", "항해", "흑백", "활동"] },
    { initial: "ㅁ ㅁ", examples: ["문명", "미모", "마마", "무명", "매매", "목명", "문맥", "마무리", "모모"] },
    { initial: "ㅍ ㄹ", examples: ["파란", "포로", "피로", "폭력", "편리", "풍력", "파리", "피리", "표류", "펄럭"] },
    { initial: "ㅌ ㄲ", examples: ["토끼", "터키", "티켓", "태권", "특권", "토큰", "통쾌"] },
    { initial: "ㅁ ㄹ", examples: ["머리", "모래", "미래", "물리", "무리", "마루", "무릎", "몰래", "밀랍", "명령"] },
    { initial: "ㅂ ㄷ", examples: ["바다", "배달", "반대", "바닥", "복도", "부대", "빈대", "본당", "부도", "비대"] },
    { initial: "ㅅ ㅇ", examples: ["수영", "시월", "수업", "상어", "사업", "사용", "석유", "신용", "소음", "승인"] },
    { initial: "ㅎ ㅈ", examples: ["휴지", "화장", "회장", "현재", "형제", "혼자", "행정", "흔적", "협조", "화재"] },
    { initial: "ㅈ ㅅ", examples: ["주소", "점심", "자신", "장소", "조심", "전설", "정성", "재산", "죄송", "짐승"] },
    { initial: "ㅊ ㅋ", examples: ["치킨", "체크", "차키", "초코", "축카", "체키"] },
    { initial: "ㄱ ㅊ", examples: ["김치", "기차", "경찰", "고추", "건축", "가출", "관찰", "교체", "근처", "기초"] },
    { initial: "ㄴ ㅈ", examples: ["남자", "낮잠", "내장", "농장", "냉장고", "나중", "낙조", "난장"] },
    { initial: "ㄷ ㅎ", examples: ["대학", "대화", "도형", "대회", "동화", "단합", "다행", "독해", "당황"] }
];

// 2. Category Game Data (카테고리 게임) - 30+ Categories
const CATEGORY_DATA = [
    // 기존 데이터
    { category: "과일", examples: ["사과", "포도", "바나나", "수박", "딸기", "복숭아", "참외", "멜론", "귤", "배", "망고", "키위", "자두", "체리", "파인애플", "블루베리", "석류", "레몬", "감", "대추"] },
    { category: "동물", examples: ["호랑이", "사자", "토끼", "강아지", "고양이", "코끼리", "기린", "곰", "여우", "늑대", "사슴", "원숭이", "판다", "다람쥐", "햄스터", "얼룩말", "하마", "악어", "독수리", "펭귄"] },
    { category: "나라", examples: ["한국", "미국", "일본", "중국", "프랑스", "독일", "영국", "이탈리아", "캐나다", "호주", "브라질", "스페인", "러시아", "인도", "베트남", "태국", "멕시코", "스위스", "네덜란드", "터키"] },
    { category: "운동", examples: ["축구", "농구", "야구", "수영", "배구", "테니스", "골프", "탁구", "태권도", "배드민턴", "스키", "스케이트", "요가", "복싱", "볼링", "양궁", "육상", "유도", "펜싱", "하키"] },
    { category: "색깔", examples: ["빨강", "파랑", "노랑", "초록", "보라", "검정", "하양", "분홍", "주황", "회색", "갈색", "하늘색", "연두색", "금색", "은색", "남색", "베이지색", "자주색", "청록색", "살구색"] },
    { category: "학교", examples: ["연필", "지우개", "칠판", "책상", "선생님", "공책", "가방", "필통", "급식", "교복", "체육관", "운동장", "실내화", "숙제", "시험", "교과서", "방학", "졸업", "입학", "소풍"] },
    { category: "음식", examples: ["피자", "치킨", "햄버거", "라면", "김밥", "비빔밥", "떡볶이", "스파게티", "초밥", "만두", "돈까스", "스테이크", "샐러드", "샌드위치", "국수", "불고기", "갈비찜", "된장찌개", "김치찌개", "카레"] },
    { category: "직업", examples: ["의사", "선생님", "경찰관", "소방관", "요리사", "가수", "배우", "과학자", "운동선수", "변호사", "간호사", "군인", "디자이너", "프로그래머", "기자", "판사", "작가", "화가", "농부", "운전기사"] },
    { category: "탈것", examples: ["버스", "택시", "기차", "비행기", "자전거", "오토바이", "지하철", "배", "헬리콥터", "트럭", "소방차", "구급차", "경찰차", "우주선", "킥보드", "유모차", "휠체어", "케이블카", "열기구", "잠수함"] },
    { category: "가전제품", examples: ["냉장고", "세탁기", "청소기", "에어컨", "밥솥", "전자레인지", "텔레비전", "선풍기", "컴퓨터", "드라이기", "다리미", "오븐", "식기세척기", "가습기", "공기청정기", "토스터기", "믹서기", "제습기", "안마의자", "스피커"] },
    { category: "학용품", examples: ["가위", "풀", "자", "볼펜", "필통", "색연필", "노트", "지우개", "샤프", "크레파스", "물감", "붓", "스케치북", "화이트", "테이프", "스테이플러", "클립", "압정", "포스트잇", "컴퍼스"] },
    { category: "악기", examples: ["피아노", "기타", "바이올린", "드럼", "플루트", "하프", "단소", "리코더", "첼로", "트럼펫", "색소폰", "우쿨렐레", "실로폰", "탬버린", "캐스터네츠", "오르간", "가야금", "해금", "장구", "북"] },
    { category: "날씨", examples: ["맑음", "흐림", "비", "눈", "바람", "태풍", "번개", "안개", "우박", "장마", "폭염", "한파", "소나기", "무지개", "구름", "황사", "미세먼지", "서리", "이슬", "가뭄"] },
    { category: "감정", examples: ["기쁨", "슬픔", "화남", "놀람", "무서움", "행복", "사랑", "우울", "긴장", "부끄러움", "짜증", "신남", "심심함", "답답함", "즐거움", "편안함", "지루함", "외로움", "그리움", "고마움"] },
    { category: "신체", examples: ["눈", "코", "입", "귀", "손", "발", "머리", "어깨", "무릎", "배", "등", "엉덩이", "손가락", "발가락", "목", "허리", "팔꿈치", "발목", "손목", "이마"] },
    { category: "가구", examples: ["침대", "식탁", "의자", "소파", "책장", "서랍장", "옷장", "화장대", "거울", "책상", "신발장", "수납장", "협탁", "조명", "커튼", "카펫", "쿠션", "매트리스", "선반", "행거"] },
    { category: "야채/채소", examples: ["오이", "당근", "양파", "파", "마늘", "배추", "무", "감자", "고구마", "호박", "고추", "상추", "깻잎", "브로콜리", "토마토", "가지", "시금치", "콩나물", "버섯", "피망"] },
    { category: "간식", examples: ["과자", "초콜릿", "사탕", "젤리", "아이스크림", "케이크", "빵", "쿠키", "푸딩", "요거트", "떡", "와플", "마카롱", "도넛", "팝콘", "호떡", "붕어빵", "츄러스", "약과", "껌"] },
    { category: "꽃", examples: ["장미", "해바라기", "무궁화", "벚꽃", "진달래", "개나리", "튤립", "백합", "국화", "카네이션", "코스모스", "민들레", "라일락", "연꽃", "동백꽃", "안개꽃", "수국", "나팔꽃", "봉숭아", "매화"] },
    { category: "장소", examples: ["공원", "학교", "집", "병원", "도서관", "마트", "영화관", "놀이터", "수영장", "박물관", "미술관", "동물원", "식당", "카페", "백화점", "은행", "우체국", "약국", "미용실", "세탁소"] },
    
    // 신규 추가 카테고리
    { category: "음료", examples: ["물", "우유", "주스", "콜라", "사이다", "커피", "녹차", "홍차", "코코아", "스무디", "에이드", "요구르트", "두유", "보리차", "식혜"] },
    { category: "곤충", examples: ["개미", "나비", "벌", "잠자리", "매미", "무당벌레", "사마귀", "장수풍뎅이", "사슴벌레", "파리", "모기", "바퀴벌레", "거미", "지렁이", "달팽이"] },
    { category: "바다생물", examples: ["물고기", "오징어", "문어", "고래", "상어", "조개", "새우", "게", "불가사리", "해파리", "거북이", "돌고래", "멸치", "미역", "산호"] },
    { category: "부엌용품", examples: ["냄비", "후라이팬", "국자", "도마", "칼", "접시", "그릇", "컵", "숟가락", "젓가락", "포크", "주전자", "쟁반", "앞치마", "고무장갑"] },
    { category: "편의점", examples: ["삼각김밥", "컵라면", "도시락", "샌드위치", "햄버거", "음료수", "과자", "껌", "사탕", "아이스크림", "핫바", "소시지", "맥주", "휴지", "건전지"] },
    { category: "캠핑용품", examples: ["텐트", "침낭", "코펠", "버너", "의자", "테이블", "랜턴", "아이스박스", "돗자리", "망치", "모기향", "배낭", "수통", "나침반", "지도"] },
    { category: "영화장르", examples: ["액션", "코미디", "공포", "로맨스", "만화", "애니메이션", "다큐멘터리", "전쟁", "SF", "판타지", "뮤지컬", "스릴러", "드라마", "서부", "범죄"] },
    { category: "보석", examples: ["다이아몬드", "루비", "사파이어", "에메랄드", "진주", "금", "은", "수정", "호박", "옥", "비취", "오팔", "자수정", "터키석", "탄생석"] },
    { category: "우주", examples: ["태양", "지구", "달", "별", "화성", "목성", "토성", "금성", "수성", "천왕성", "해왕성", "명왕성", "혜성", "은하수", "블랙홀"] },
    { category: "계절/시간", examples: ["봄", "여름", "가을", "겨울", "아침", "점심", "저녁", "밤", "새벽", "오전", "오후", "주말", "평일", "휴일", "명절"] }
];

// 3. Speed Game Data (단어 짓기) - 200+ Words
const SPEED_WORDS_POOL = [
    // ㄱ
    { text: "과자", hint: "Snack" }, { text: "가방", hint: "Bag" }, { text: "가위", hint: "Scissors" },
    { text: "거울", hint: "Mirror" }, { text: "구름", hint: "Cloud" }, { text: "김치", hint: "Kimchi" },
    { text: "경찰", hint: "Police" }, { text: "기차", hint: "Train" }, { text: "공책", hint: "Notebook" },
    { text: "가족", hint: "Family" }, { text: "구두", hint: "Shoes" }, { text: "국기", hint: "Flag" },
    { text: "고기", hint: "Meat" }, { text: "가을", hint: "Autumn" }, { text: "겨울", hint: "Winter" },
    { text: "공원", hint: "Park" }, { text: "공항", hint: "Airport" }, { text: "가수", hint: "Singer" },
    { text: "가게", hint: "Store" }, { text: "그림", hint: "Picture" }, { text: "구슬", hint: "Marble" },
    { text: "감자", hint: "Potato" }, { text: "고구마", hint: "Sweet Potato" }, { text: "귤", hint: "Tangerine" },
    // ㄴ
    { text: "나무", hint: "Tree" }, { text: "나비", hint: "Butterfly" }, { text: "낚시", hint: "Fishing" },
    { text: "남자", hint: "Man" }, { text: "날씨", hint: "Weather" }, { text: "노래", hint: "Song" },
    { text: "눈사람", hint: "Snowman" }, { text: "농구", hint: "Basketball" },
    { text: "냉장고", hint: "Refrigerator" }, { text: "냄비", hint: "Pot" }, { text: "누나", hint: "Older Sister" },
    { text: "남동생", hint: "Younger Brother" }, { text: "눈", hint: "Eye/Snow" }, { text: "날개", hint: "Wing" },
    // ㄷ
    { text: "다리", hint: "Bridge/Leg" }, { text: "달력", hint: "Calendar" }, { text: "도서관", hint: "Library" },
    { text: "도시락", hint: "Lunch box" }, { text: "돼지", hint: "Pig" }, { text: "동물원", hint: "Zoo" },
    { text: "두부", hint: "Tofu" }, { text: "딸기", hint: "Strawberry" }, { text: "떡볶이", hint: "Spicy Rice Cake" },
    { text: "달", hint: "Moon" }, { text: "당근", hint: "Carrot" }, { text: "도넛", hint: "Donut" },
    { text: "동화", hint: "Fairy Tale" }, { text: "동전", hint: "Coin" }, { text: "대문", hint: "Gate" },
    // ㄹ
    { text: "라디오", hint: "Radio" }, { text: "라면", hint: "Ramen" }, { text: "로봇", hint: "Robot" },
    { text: "리모컨", hint: "Remote Control" }, { text: "레몬", hint: "Lemon" }, { text: "리본", hint: "Ribbon" },
    // ㅁ
    { text: "마음", hint: "Mind/Heart" }, { text: "모자", hint: "Hat" }, { text: "무지개", hint: "Rainbow" },
    { text: "문", hint: "Door" }, { text: "물", hint: "Water" }, { text: "미국", hint: "USA" },
    { text: "미술", hint: "Art" }, { text: "머리", hint: "Head" },
    { text: "마을", hint: "Village" }, { text: "마트", hint: "Mart" }, { text: "만두", hint: "Dumpling" },
    { text: "말", hint: "Horse/Word" }, { text: "모기", hint: "Mosquito" }, { text: "목걸이", hint: "Necklace" },
    { text: "무", hint: "Radish" }, { text: "물고기", hint: "Fish" },
    // ㅂ
    { text: "바나나", hint: "Banana" }, { text: "바다", hint: "Sea" }, { text: "바람", hint: "Wind" },
    { text: "박수", hint: "Clap" }, { text: "반지", hint: "Ring" }, { text: "발", hint: "Foot" },
    { text: "배", hint: "Ship/Pear/Belly" }, { text: "버스", hint: "Bus" }, { text: "병원", hint: "Hospital" },
    { text: "비행기", hint: "Airplane" }, { text: "빵", hint: "Bread" },
    { text: "방", hint: "Room" }, { text: "밤", hint: "Night/Chestnut" }, { text: "밥", hint: "Rice" },
    { text: "바지", hint: "Pants" }, { text: "비누", hint: "Soap" }, { text: "비", hint: "Rain" },
    { text: "뱀", hint: "Snake" }, { text: "별", hint: "Star" }, { text: "불", hint: "Fire" },
    // ㅅ
    { text: "사과", hint: "Apple" }, { text: "사랑", hint: "Love" }, { text: "사진", hint: "Photo" },
    { text: "산", hint: "Mountain" }, { text: "선물", hint: "Gift" }, { text: "선생님", hint: "Teacher" },
    { text: "소방관", hint: "Firefighter" }, { text: "손", hint: "Hand" }, { text: "수박", hint: "Watermelon" },
    { text: "수영", hint: "Swimming" }, { text: "시간", hint: "Time" }, { text: "시계", hint: "Clock" },
    { text: "신발", hint: "Shoes" },
    { text: "사자", hint: "Lion" }, { text: "사탕", hint: "Candy" }, { text: "새", hint: "Bird" },
    { text: "색종이", hint: "Colored Paper" }, { text: "소", hint: "Cow" }, { text: "소금", hint: "Salt" },
    { text: "숟가락", hint: "Spoon" }, { text: "숲", hint: "Forest" }, { text: "스키", hint: "Ski" },
    // ㅇ
    { text: "아기", hint: "Baby" }, { text: "아빠", hint: "Dad" }, { text: "아이스크림", hint: "Ice Cream" },
    { text: "안경", hint: "Glasses" }, { text: "약국", hint: "Pharmacy" }, { text: "양말", hint: "Socks" },
    { text: "어머니", hint: "Mother" }, { text: "얼굴", hint: "Face" }, { text: "여름", hint: "Summer" },
    { text: "여행", hint: "Travel" }, { text: "연필", hint: "Pencil" }, { text: "영화", hint: "Movie" },
    { text: "우산", hint: "Umbrella" }, { text: "우유", hint: "Milk" }, { text: "운동", hint: "Exercise" },
    { text: "의자", hint: "Chair" }, { text: "이불", hint: "Blanket" }, { text: "인형", hint: "Doll" },
    { text: "악어", hint: "Crocodile" }, { text: "앞치마", hint: "Apron" }, { text: "약", hint: "Medicine" },
    { text: "엘리베이터", hint: "Elevator" }, { text: "여우", hint: "Fox" }, { text: "연", hint: "Kite" },
    { text: "오리", hint: "Duck" }, { text: "오이", hint: "Cucumber" }, { text: "옷", hint: "Clothes" },
    { text: "왕", hint: "King" }, { text: "요리사", hint: "Cook" }, { text: "우체국", hint: "Post Office" },
    { text: "원숭이", hint: "Monkey" }, { text: "은행", hint: "Bank" }, { text: "입", hint: "Mouth" },
    // ㅈ
    { text: "자전거", hint: "Bicycle" }, { text: "자동차", hint: "Car" }, { text: "장갑", hint: "Gloves" },
    { text: "장난감", hint: "Toy" }, { text: "전화", hint: "Telephone" }, { text: "접시", hint: "Plate" },
    { text: "지갑", hint: "Wallet" }, { text: "지도", hint: "Map" }, { text: "지우개", hint: "Eraser" },
    { text: "집", hint: "House" },
    { text: "잠자리", hint: "Dragonfly" }, { text: "저녁", hint: "Dinner" }, { text: "주스", hint: "Juice" },
    { text: "쥐", hint: "Mouse" }, { text: "지하철", hint: "Subway" }, { text: "창문", hint: "Window" },
    // ㅊ
    { text: "책", hint: "Book" }, { text: "책상", hint: "Desk" }, { text: "청소기", hint: "Vacuum Cleaner" }, 
    { text: "축구", hint: "Soccer" }, { text: "친구", hint: "Friend" }, { text: "치과", hint: "Dentist" }, 
    { text: "치마", hint: "Skirt" }, { text: "칫솔", hint: "Toothbrush" },
    { text: "참새", hint: "Sparrow" }, { text: "천사", hint: "Angel" }, { text: "초콜릿", hint: "Chocolate" },
    { text: "치즈", hint: "Cheese" }, { text: "치킨", hint: "Chicken" }, { text: "칠판", hint: "Blackboard" },
    // ㅋ
    { text: "카메라", hint: "Camera" }, { text: "컴퓨터", hint: "Computer" }, { text: "코", hint: "Nose" },
    { text: "코끼리", hint: "Elephant" }, { text: "케이크", hint: "Cake" },
    { text: "칼", hint: "Knife" }, { text: "캥거루", hint: "Kangaroo" }, { text: "컵", hint: "Cup" },
    { text: "콩", hint: "Bean" }, { text: "크레파스", hint: "Crayon" }, { text: "키위", hint: "Kiwi" },
    // ㅌ
    { text: "택시", hint: "Taxi" }, { text: "태권도", hint: "Taekwondo" }, { text: "텔레비전", hint: "TV" },
    { text: "토끼", hint: "Rabbit" }, { text: "토마토", hint: "Tomato" },
    { text: "타조", hint: "Ostrich" }, { text: "태양", hint: "Sun" }, { text: "트럭", hint: "Truck" },
    { text: "티셔츠", hint: "T-shirt" },
    // ㅍ
    { text: "파", hint: "Green Onion" }, { text: "파랑", hint: "Blue" }, { text: "편지", hint: "Letter" },
    { text: "포도", hint: "Grape" }, { text: "피아노", hint: "Piano" }, { text: "피자", hint: "Pizza" },
    { text: "파인애플", hint: "Pineapple" }, { text: "펭귄", hint: "Penguin" }, { text: "포크", hint: "Fork" },
    { text: "표", hint: "Ticket" }, { text: "풀", hint: "Glue/Grass" }, { text: "풍선", hint: "Balloon" },
    // ㅎ
    { text: "학교", hint: "School" }, { text: "한국", hint: "Korea" }, { text: "할머니", hint: "Grandmother" },
    { text: "햄버거", hint: "Hamburger" }, { text: "호랑이", hint: "Tiger" }, { text: "화장실", hint: "Restroom" },
    { text: "회사", hint: "Company" }, { text: "휴지", hint: "Tissue" },
    { text: "하마", hint: "Hippo" }, { text: "하늘", hint: "Sky" }, { text: "해", hint: "Sun" },
    { text: "해바라기", hint: "Sunflower" }, { text: "호박", hint: "Pumpkin" }, { text: "화가", hint: "Painter" },
    { text: "화분", hint: "Flowerpot" }
];

// --- HELPERS & STATE (NO REPETITION LOGIC) ---

const shuffle = <T>(array: T[]): T[] => {
    const newArr = [...array];
    return newArr.sort(() => Math.random() - 0.5);
};

// In-memory state to prevent repetition.
// These persist as long as the page is not reloaded.
let initialDeck: typeof INITIAL_DATA = [];
let categoryDeck: typeof CATEGORY_DATA = [];
let speedDeck: typeof SPEED_WORDS_POOL = [];

const getNextItemFromDeck = <T>(
    deck: T[], 
    masterData: T[], 
    refillThreshold: number = 0
): { item: T, newDeck: T[] } => {
    let currentDeck = deck;
    
    // If deck is empty (or below threshold), refill and shuffle
    if (currentDeck.length <= refillThreshold) {
        currentDeck = shuffle(masterData);
    }
    
    const item = currentDeck.pop()!;
    return { item, newDeck: currentDeck };
};

// --- INITIAL GAME (초성게임) ---

export const generateInitials = async (difficulty: Difficulty): Promise<string> => {
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Initial load check
    if (initialDeck.length === 0) {
        initialDeck = shuffle(INITIAL_DATA);
    }

    const { item, newDeck } = getNextItemFromDeck(initialDeck, INITIAL_DATA);
    initialDeck = newDeck;
    
    return item.initial;
};

export const generateInitialExamples = async (initials: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const item = INITIAL_DATA.find(d => d.initial === initials);
    // Shuffle and return subset to make it feel dynamic
    return item ? shuffle(item.examples).slice(0, 6) : ["데이터 없음"];
}

// --- CATEGORY GAME (카테고리게임) ---

export const generateCategory = async (difficulty: Difficulty): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    // Initial load check
    if (categoryDeck.length === 0) {
        categoryDeck = shuffle(CATEGORY_DATA);
    }

    const { item, newDeck } = getNextItemFromDeck(categoryDeck, CATEGORY_DATA);
    categoryDeck = newDeck;

    return item.category;
}

export const generateCategoryExamples = async (category: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const item = CATEGORY_DATA.find(d => d.category === category);
    return item ? shuffle(item.examples).slice(0, 6) : ["데이터 없음"];
}

// --- SPEED GAME (단어짓기) ---

export const fetchSpeedWords = async (difficulty: Difficulty): Promise<VocabularyItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Speed game needs 10 items at once.
    // If deck has fewer than 10, refill it completely to ensure non-repeating sequence
    if (speedDeck.length < 10) {
        speedDeck = shuffle(SPEED_WORDS_POOL);
    }

    const selected = speedDeck.splice(0, 10);

    return selected.map((item, idx) => ({
        id: `speed-${Date.now()}-${idx}`,
        text: item.text,
        hint: item.hint
    }));
}

// --- UTILS ---

export const checkSpellingWithAI = async (userInput: string, correctWord: string): Promise<string> => {
    // Simple string matching instead of AI
    if (userInput.trim().replace(/\s+/g, '') === correctWord.replace(/\s+/g, '')) {
        return "CORRECT";
    }
    return "Incorrect spelling. Try again!";
};

export const getAIHint = async (word: string): Promise<string> => {
    return "오프라인 모드에서는 힌트가 제공되지 않습니다.";
};

// Unused placeholders kept for compatibility
export const validateInitialWord = async (initials: string, word: string) => ({ isValid: true, message: "" });
export const validateCategoryWord = async (category: string, word: string) => ({ isValid: true, message: "" });