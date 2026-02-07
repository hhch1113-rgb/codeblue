// main.js - 연애 스타일 테스트 (모바일 최적화 + 16가지 완전 버전)
const cleanText = (text) => {
    if (!text) return '';
    return text
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

const questions = [
    // ① 감정 표현 (O / C)
    { id: 1, question: "연인이 서운하게 했을 때 나는", options: { A: "바로 말하는 편이다", B: "혼자 정리한 뒤 넘어간다" }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
    { id: 2, question: "좋아하는 감정은", options: { A: "말이나 행동으로 표현해야 한다고 생각한다", B: "굳이 말하지 않아도 느껴질 수 있다고 생각한다" }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
    { id: 3, question: "다툰 뒤 나는", options: { A: "바로 풀고 싶다", B: "시간을 두고 싶다" }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
    { id: 4, question: "연애 중 내 감정 상태를", options: { A: "상대가 잘 알고 있는 편이다", B: "잘 모를 것 같다고 느낀다" }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
    { id: 5, question: "연인에게 애정 표현을", options: { A: "자주 하는 편이다", B: "마음속으로만 하는 경우가 많다" }, axis: '감정 표현', value: { A: 'O', B: 'C' } },
    // ② 안정 vs 설렘 (S / T)
    { id: 6, question: "연애에서 가장 중요한 건", options: { A: "믿을 수 있는 안정감", B: "계속 설레는 감정" }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
    { id: 7, question: "데이트가 반복될 때", options: { A: "익숙해도 편하면 좋다", B: "지루해지면 힘들다" }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
    { id: 8, question: "연애 초반보다 중반 이후가", options: { A: "더 편하고 좋다", B: "아쉬운 경우가 많다" }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
    { id: 9, question: "연인의 예측 가능한 행동은", options: { A: "신뢰감을 준다", B: "재미가 줄어든다" }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
    { id: 10, question: "연애는", options: { A: "일상의 일부가 되는 게 좋다", B: "특별한 이벤트여야 한다" }, axis: '안정감 추구', value: { A: 'S', B: 'T' } },
    // ③ 계획 vs 즉흥 (P / F)
    { id: 11, question: "데이트 약속은", options: { A: "미리 정해두는 게 좋다", B: "그날 기분 따라 정하는 게 좋다" }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
    { id: 12, question: "여행을 간다면", options: { A: "일정이 있어야 편하다", B: "즉흥이 더 재밌다" }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
    { id: 13, question: "연인이 갑자기 약속을 바꾸면", options: { A: "당황하거나 불편하다", B: "크게 신경 쓰지 않는다" }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
    { id: 14, question: "데이트 장소를", options: { A: "미리 찾아본다", B: "가서 정한다" }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
    { id: 15, question: "연애는", options: { A: "어느 정도 예측 가능해야 한다", B: "변수가 있어야 재미있다" }, axis: '관계 운영 방식', value: { A: 'P', B: 'F' } },
    // ④ 연인 중심 vs 개인 중심 (B / I)
    { id: 16, question: "연애를 하면", options: { A: "연인이 내 생활의 중심이 된다", B: "기존 생활 패턴을 유지하고 싶다" }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
    { id: 17, question: "혼자만의 시간이", options: { A: "크게 필요하지 않다", B: "꼭 필요하다" }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
    { id: 18, question: "연인이 자주 보자고 하면", options: { A: "좋다", B: "부담스러울 수 있다" }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
    { id: 19, question: "연애 중에도", options: { A: "웬만한 일은 함께 하고 싶다", B: "각자의 시간이 중요하다" }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
    { id: 20, question: "연애는", options: { A: "둘이 하나의 팀이 되는 거다", B: "두 사람이 각자 존재하는 관계다" }, axis: '개인 영역 인식', value: { A: 'B', B: 'I' } },
];

const results = {
    "OSPB": {
        title: "🏡 다정한 현실주의 연애형",
        summary: "감정 표현에 솔직하고, 안정적인 관계를 계획적으로 만들어가며 연인 중심으로 움직이는 현실적인 헌신형. 장기 연애의 기반을 단단히 다지는 타입이다.",
        description: "사랑을 말과 행동으로 꾸준히 보여주고, 미래 계획이나 기념일을 자연스럽게 챙긴다. 연인을 삶의 중요한 축으로 두고 일상을 함께 설계한다.",
        pros: ["상대에게 강한 신뢰감과 안정감을 준다.", "연인이 사랑받고 있다는 느낌을 지속적으로 받는다.", "장기적인 관계 유지 능력이 뛰어나다."],
        cons: ["헌신이 과도해지면서 상대가 부담을 느낄 수 있다.", "상대의 반응이 미지근하면 서운함이 쉽게 쌓인다.", "자기 희생이 많아져 번아웃이 올 수 있다."],
        advice: "상대의 페이스와 독립성을 존중하는 여유를 가져라. 모든 걸 완벽히 챙기려 하지 말고 자연스러운 흐름도 받아들여라. 자신의 감정도 솔직하게 나누는 연습이 필요하다."
    },
    "OSPI": {
        title: "🧘 헌신적이지만 균형을 아는 연애형",
        summary: "솔직한 감정 표현과 안정감을 추구하면서도 개인의 공간과 균형을 잃지 않는 성숙한 타입. 건강한 장기 연애에 적합한 현실주의자.",
        description: "진심 어린 애정 표현을 하되 모든 시간을 붙잡지 않는다. 각자의 루틴을 존중하며 안정적인 교류를 유지한다. 관계가 무거워지지 않도록 자연스러운 거리감을 둔다.",
        pros: ["감정 소통이 원활하고 갈등이 적다.", "서로의 자유를 존중해 관계가 건강하게 유지된다.", "감정 소모가 적어 장기적으로 안정적이다."],
        cons: ["상대가 “너무 차분하거나 관심이 덜한 것 같다”고 느낄 수 있다.", "감정의 강도가 약해 보일 때 오해가 생긴다.", "깊은 몰입이 늦어 초반 만족도가 낮아 보일 수 있다."],
        advice: "필요할 때 의도적으로 감정 표현의 강도를 높여라. 상대가 원하는 애정 신호를 미리 체크하는 습관을 들여라. 균형 잡힌 거리감이 오히려 더 큰 매력이 될 수 있다."
    },
    "OSFB": {
        title: "🎢 설렘 가득한 올인형 연애가",
        summary: "감정 표현이 풍부하고 설렘을 최우선으로 여기며 연인에게 깊이 몰입하는 열정적인 올인형. 초반 불꽃이 매우 강한 로맨티스트.",
        description: "즉흥적인 데이트와 깜짝 이벤트를 즐기고 연인을 삶의 중심에 두며 하루 종일 생각한다. 감정의 온도가 높아 관계가 빠르게 뜨거워진다.",
        pros: ["연애의 재미와 설렘이 매우 크다.", "상대가 특별하고 소중하다는 느낌을 강하게 준다.", "열정적인 에너지로 관계에 활력을 불어넣는다."],
        cons: ["설렘이 줄면 사랑이 식었다고 크게 불안해한다.", "감정 기복이 심해 관계가 롤러코스터가 된다.", "과도한 몰입으로 스스로 지치기 쉽다."],
        advice: "설렘만큼 안정과 일상의 소중함도 배워라. 감정의 고저를 상대와 함께 이야기하는 습관을 들여라. 작은 루틴이 오히려 더 깊은 사랑으로 이어질 수 있다."
    },
    "OSFI": {
        title: "🕊️ 자유로운 로맨티스트",
        summary: "솔직한 표현과 설렘을 즐기면서도 개인 자유와 독립성을 절대 포기하지 않는 타입. 밝고 자유로운 로맨티스트.",
        description: "감정은 적극적으로 표현하지만 구속은 싫어한다. 즉흥 데이트를 좋아하고 각자의 삶을 존중한다. 연애를 삶의 즐거운 일부로 자연스럽게 받아들인다.",
        pros: ["밝고 매력적인 분위기를 지속적으로 만든다.", "서로 숨 막히지 않는 건강한 거리감을 유지한다.", "신선한 자극과 자유로운 에너지를 준다."],
        cons: ["상대가 더 많은 안정감과 확신을 원할 때 불안해한다.", "자유로움이 무책임하게 보일 수 있다.", "깊은 헌신 단계로 넘어가는 게 늦어진다."],
        advice: "자유 속에서도 “너를 소중히 여긴다”는 신호를 꾸준히 줘라. 상대의 불안 포인트를 미리 대화로 풀어라. 작은 약속 하나가 오히려 더 큰 자유를 지켜준다."
    },
    "OTPB": {
        title: "💞 열정적인 미래 설계자",
        summary: "솔직한 표현과 설렘을 즐기면서도 계획과 헌신을 놓치지 않는 열정적 미래 설계자. 재미와 안정의 균형을 추구한다.",
        description: "즉흥적인 재미도 즐기지만 미래를 함께 그린다. 이벤트와 계획을 동시에 챙겨 로맨스를 만든다. 연인을 중심에 두고 적극적으로 움직인다.",
        pros: ["재미와 안정이 동시에 느껴지는 연애를 한다.", "상대가 설레면서도 안심할 수 있다.", "에너지와 책임감이 공존한다."],
        cons: ["모든 걸 완벽히 하려다 스스로 지친다.", "계획이 틀어지면 크게 실망한다.", "상대의 자유를 제한할 수 있다."],
        advice: "완벽함보다 유연함을 조금 더 가져라. 작은 변화도 설렘으로 받아들이는 연습을 해라. 상대의 속도에 맞춰주는 여유가 필요하다."
    },
    "OTPI": {
        title: "🌪️ 활기찬 현실 감각형",
        summary: "설렘과 자유를 사랑하면서도 현실 감각을 잃지 않는 활기차고 균형 잡힌 연애형. 밝지만 집착하지 않는 매력.",
        description: "즉흥 데이트와 새로운 자극을 즐긴다. 감정 표현은 적극적이지만 구속은 하지 않는다. 각자의 삶을 존중하며 가볍게 즐긴다.",
        pros: ["밝고 매력적인 에너지를 준다.", "서로 부담 없이 즐거운 관계를 만든다.", "신선함이 지속된다."],
        cons: ["깊이나 진지함이 부족하다는 평가를 받는다.", "상대가 더 많은 확신을 원할 때 어색해진다.", "장기적인 안정감이 약해 보일 수 있다."],
        advice: "감정의 깊이를 천천히 쌓아가는 시간을 가져라. 작은 약속으로 안정감을 더해라. 즐거움과 진심은 함께 갈 수 있다."
    },
    "OTFB": {
        title: "🔥 불꽃형 연애 몰입가",
        summary: "즉흥적이고 감정 표현이 강렬하며 연인에게 완전히 몰입하는 불꽃형 연애가. 강렬한 로맨스를 추구한다.",
        description: "사랑하면 바로 불태우고 즉흥적으로 움직인다. 연인을 삶의 전부처럼 여기며 몰입한다. 감정의 강도가 매우 높다.",
        pros: ["강한 로맨스와 열정이 넘친다.", "상대가 강렬하게 사랑받는 느낌을 받는다.", "추억이 매우 풍부하다."],
        cons: ["감정이 식으면 급격히 흔들린다.", "번아웃이 쉽게 온다.", "관계가 롤러코스터처럼 불안정하다."],
        advice: "속도를 조절하고 숨 고를 타이밍을 가져라. 감정의 고저를 상대와 공유하는 습관을 들여라. 강렬함만큼 안정도 소중히 여겨라."
    },
    "OTFI": {
        title: "🕊️ 자유로운 연애 탐험가",
        summary: "설렘과 자유를 동시에 추구하는 가볍고 탐험적인 연애 스타일. 독립적이면서도 로맨틱한 자유인.",
        description: "즉흥적이고 적극적인 애정 표현을 한다. 연애를 즐기되 서로를 묶지 않는다. 새로운 경험을 함께 추구한다.",
        pros: ["가볍고 신나는 매력이 있다.", "서로의 자유를 존중해 스트레스가 적다.", "항상 신선한 자극이 있다."],
        cons: ["상대가 불안정함을 느끼고 불안해한다.", "깊은 헌신으로 이어지기 어렵다.", "책임감 부족으로 오해받는다."],
        advice: "자유 속에서도 최소한의 안심 신호를 줘라. 상대의 기대치를 미리 확인하고 맞춰라. 즐거움과 책임은 공존할 수 있다."
    },
    "CSPB": {
        title: "🪵 묵묵한 책임형 연애가",
        summary: "감정 표현은 적지만 행동으로 책임을 다하는 안정적이고 계획적인 헌신형. 묵묵히 오래 가는 관계의 강자.",
        description: "말보다 행동으로 애정을 증명하고 미래를 함께 설계하며 연인을 중심에 둔다. 예측 가능하고 신뢰할 수 있는 연애를 만든다.",
        pros: ["신뢰감과 안정감이 매우 높다.", "위기 상황에서도 흔들리지 않고 버틴다.", "장기 연애와 결혼에 가장 강하다."],
        cons: ["감정이 잘 안 보인다는 오해를 받는다.", "상대가 설렘 부족을 느끼기 쉽다.", "표현 부족으로 초반에 밀릴 수 있다."],
        advice: "작은 말 한마디, 메시지 하나가 큰 차이를 만든다. 의도적으로 애정 표현을 연습해라. 안정감이 지루함이 아니라는 걸 상대와 공유해라."
    },
    "CSPI": {
        title: "🧊 차분한 장기 연애형",
        summary: "안정감을 추구하면서도 개인의 삶과 균형을 잃지 않는 차분하고 현실적인 장기 연애형. 감정 소모가 적은 성숙한 스타일.",
        description: "감정 기복 없이 꾸준히 관계를 유지한다. 각자의 루틴을 존중하며 자연스러운 교류를 한다. 연애를 삶의 한 부분으로 건강하게 받아들인다.",
        pros: ["관계가 매우 안정적이고 흔들림이 적다.", "감정적·시간적 소모가 적어 오래간다.", "서로의 독립성을 존중하는 성숙함이 있다."],
        cons: ["설렘이나 열정이 부족하다는 평가를 받는다.", "상대가 관심 부족으로 느낄 수 있다.", "감정 교류가 적어 깊이가 얕아 보일 때가 있다."],
        advice: "의도적인 작은 이벤트나 표현으로 활력을 더해라. 상대의 정서적 요구를 가볍게 넘기지 마라. 균형 잡힌 안정이 진짜 사랑의 기반임을 믿어라."
    },
    "CSFB": {
        title: "🤍 조용하지만 깊은 애착형",
        summary: "표현은 절제되지만 설렘과 애정이 깊고 연인 중심으로 헌신하는 조용한 몰입형. 속 깊은 로맨티스트.",
        description: "겉으로는 차분하지만 내면은 뜨겁게 타오른다. 상대를 세심하게 챙기며 깊은 유대감을 만든다. 말보다는 행동과 시간으로 애정을 보여준다.",
        pros: ["헌신적이고 진심 어린 애정이 느껴진다.", "정서적 유대가 깊고 오래간다.", "신뢰를 바탕으로 한 안정적인 관계를 만든다."],
        cons: ["감정이 쌓이다가 한 번에 터져버린다.", "표현 부족으로 상대가 불안해할 수 있다.", "서운함을 혼자 삭이다가 폭발한다."],
        advice: "작은 감정이라도 바로 나누는 연습을 해라. 상대가 읽을 수 없는 마음은 말로 전달해라. 감정 배출구를 미리 만드는 게 관계를 지킨다."
    },
    "CSFI": {
        title: "🌱 자기만의 리듬을 지키는 연애형",
        summary: "설렘은 느끼지만 표현과 의존은 최소화하며 자기 리듬과 독립성을 최우선으로 하는 타입. 성숙하고 자유로운 독립 연애자.",
        description: "연애에 과몰입하지 않고 각자의 공간을 지킨다. 감정은 깊지만 드러내는 양은 적다. 자연스러운 만남과 거리감을 즐긴다.",
        pros: ["서로의 자유를 존중해 숨 막히지 않는다.", "감정 소모가 적고 자존감이 높다.", "성숙하고 차분한 매력이 있다."],
        cons: ["상대가 차갑거나 무관심하다고 오해한다.", "온도 차로 인해 거리감이 벌어진다.", "깊은 감정 교류가 늦어진다."],
        advice: "상대에게 “너를 소중히 여긴다”는 신호를 적극 줘라. 작은 표현 하나가 오해를 크게 줄인다. 독립성과 애정은 동시에 존재할 수 있다."
    },
    "CTPB": {
        title: "🪵 조용한 헌신형 로맨티스트",
        summary: "겉으로는 조용하지만 설렘과 책임이 공존하는 은근한 헌신형 로맨티스트. 깊이 있는 안정 로맨스.",
        description: "말수는 적지만 행동으로 확실히 보여준다. 계획적으로 미래를 준비하며 설렘을 유지한다. 연인을 중심에 두고 조용히 헌신한다.",
        pros: ["신뢰도와 깊이가 매우 높다.", "설렘과 안정이 함께 간다.", "장기적으로 강한 유대감을 만든다."],
        cons: ["감정 전달이 부족해 오해가 생긴다.", "상대가 관심 부족으로 느낄 수 있다.", "초반에 매력이 덜 드러난다."],
        advice: "표현은 관계의 윤활유라는 걸 기억해라. 작은 말과 행동으로 애정을 더 자주 보여라. 조용한 헌신도 말로 전달하면 빛난다."
    },
    "CTPI": {
        title: "🧊 차분한 자유 연애형",
        summary: "설렘은 느끼되 과몰입하지 않고 거리감과 자유를 유지하는 차분한 자유 연애형. 성숙하고 냉정함이 매력.",
        description: "감정은 깊지만 드러내는 양은 적다. 각자의 리듬을 존중하며 가볍게 즐긴다. 연애를 삶의 일부로 자연스럽게 받아들인다.",
        pros: ["성숙하고 안정적인 태도가 돋보인다.", "감정 소모가 적고 자존감이 높다.", "서로 부담 없는 관계를 만든다."],
        cons: ["온도 차가 커서 상대가 외로움을 느낀다.", "무관심으로 오해받기 쉽다.", "깊은 교류가 늦어진다."],
        advice: "연인의 기대치와 감정 요구를 확인해라. 작은 표현으로 안심을 주는 습관을 들여라. 차분함이 무관심이 아님을 보여줘라."
    },
    "CTFB": {
        title: "🔥 은근히 불타는 타입",
        summary: "겉은 차분하지만 속은 뜨겁게 타오르는 즉흥적 감정 폭발형. 은근히 불타는 숨겨진 열정가.",
        description: "평소에는 조용하지만 감정이 쌓이면 강렬하게 터진다. 즉흥적인 로맨스와 깊은 몰입을 동시에 가진다. 예측 불가능한 매력이 있다.",
        pros: ["깊은 애정과 열정이 느껴진다.", "한 번 터지면 강렬한 유대감이 생긴다.", "숨겨진 로맨틱함이 매력 포인트."],
        cons: ["감정이 예측 불가해 상대가 당황한다.", "평소 무심함과 폭발의 갭이 크다.", "서운함이 쌓이다가 한 번에 터진다."],
        advice: "감정 배출구를 미리 만들어 작은 단위로 나눠라. 평소에도 가벼운 표현으로 온도를 유지해라. 갭을 줄이는 게 관계를 안정시킨다."
    },
    "CTFI": {
        title: "🌌 독립적 감정 절제형",
        summary: "설렘은 느끼지만 표현과 의존 모두 최소화하는 독립적이고 감정을 절제하는 타입. 자기 세계가 확실한 내면 중심 연애자.",
        description: "감정은 깊지만 쉽게 드러내지 않는다. 개인 시간과 공간을 최우선으로 지킨다. 조용하고 독립적인 관계를 선호한다.",
        pros: ["자존감과 독립성이 매우 높다.", "감정에 휘둘리지 않아 안정적이다.", "성숙한 태도로 관계를 유지한다."],
        cons: ["상대가 큰 거리감과 소외감을 느낀다.", "애정 표현 부족으로 사랑이 식었다고 오해한다.", "감정 교류가 적어 관계가 얕아 보인다."],
        advice: "연애는 혼자가 아니라 둘이라는 사실을 기억해라. 작은 표현 하나가 상대의 불안을 크게 줄인다. 독립성과 애정 표현은 동시에 가능하다."
    }
};

// DOM Elements (기존 그대로)
const headerSection = document.querySelector('header');
const testArea = document.getElementById('test-area');
const startTestBtn = document.getElementById('start-test');
const questionSection = document.getElementById('question-section');
const questionNumberEl = questionSection.querySelector('.question-number');
const questionTextEl = questionSection.querySelector('.question-text');
const optionsContainer = questionSection.querySelector('.options-container');
const progressBarEl = questionSection.querySelector('.progress-bar');
const resultSection = document.getElementById('result-section');
const resultTitleEl = resultSection.querySelector('.result-title');
const resultCodeEl = resultSection.querySelector('.result-code');
const resultImageEl = resultSection.querySelector('.result-image');
const resultSummaryEl = resultSection.querySelector('.result-summary');
const resultDescriptionEl = resultSection.querySelector('.result-description');
const resultProsEl = resultSection.querySelector('.result-pros');
const resultConsEl = resultSection.querySelector('.result-cons');
const resultAdviceEl = resultSection.querySelector('.result-advice');
const shareResultBtn = document.getElementById('share-result');
const restartTestBtn = document.getElementById('restart-test');

// State
let currentQuestionIndex = 0;
let userAnswers = [];
let axisScores = { 'O': 0, 'C': 0, 'S': 0, 'T': 0, 'P': 0, 'F': 0, 'B': 0, 'I': 0 };

// Functions (기존 그대로, calculateResult에 디버그 로그 유지)
function startTest() {
    headerSection.style.display = 'none';
    testArea.style.display = 'block';
    currentQuestionIndex = 0;
    userAnswers = [];
    axisScores = { 'O': 0, 'C': 0, 'S': 0, 'T': 0, 'P': 0, 'F': 0, 'B': 0, 'I': 0 };
    displayQuestion();
    resultSection.style.display = 'none';
    questionSection.style.display = 'block';
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        questionNumberEl.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
        questionTextEl.textContent = cleanText(q.question);

        optionsContainer.innerHTML = '';
        for (const key in q.options) {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.textContent = cleanText(q.options[key]);
            btn.dataset.option = key;
            btn.addEventListener('click', () => handleAnswer(key));
            optionsContainer.appendChild(btn);
        }
        updateProgressBar();
    } else {
        calculateResult();
    }
}

function handleAnswer(selectedOption) {
    const q = questions[currentQuestionIndex];
    userAnswers.push({
        questionId: q.id,
        selectedOption: selectedOption,
        axis: q.axis,
        value: q.value[selectedOption]
    });
    axisScores[q.value[selectedOption]]++;
    currentQuestionIndex++;
    displayQuestion();
}

function calculateResult() {
    questionSection.style.display = 'none';
    resultSection.style.display = 'block';

    const finalResult = [];
    finalResult.push(axisScores['O'] >= axisScores['C'] ? 'O' : 'C');
    finalResult.push(axisScores['S'] >= axisScores['T'] ? 'S' : 'T');
    finalResult.push(axisScores['P'] >= axisScores['F'] ? 'P' : 'F');
    finalResult.push(axisScores['B'] >= axisScores['I'] ? 'B' : 'I');

    const resultCode = finalResult.join('');

    // 디버그 로그 (콘솔에서 확인 가능)
    console.log('=== 결과 디버깅 ===');
    console.log('Axis Scores:', axisScores);
    console.log('Final Result Code:', resultCode);
    console.log('Result Exists:', !!results[resultCode]);
    console.log('Available Keys:', Object.keys(results));

    displayResult(resultCode);
}

function displayResult(resultCode) {
    const resultData = results[resultCode];
    if (!resultData) {
        resultTitleEl.textContent = "결과를 찾을 수 없습니다.";
        resultCodeEl.textContent = `(${resultCode})`;
        resultImageEl.style.display = 'none';
        resultSummaryEl.textContent = "죄송합니다. 해당 결과 조합을 찾을 수 없습니다.";
        resultDescriptionEl.textContent = "";
        resultProsEl.innerHTML = '';
        resultConsEl.innerHTML = '';
        console.error('결과 코드를 찾을 수 없음:', resultCode);
        return;
    }

    resultTitleEl.textContent = cleanText(resultData.title);
    resultCodeEl.textContent = `(${resultCode})`;

    if (resultData.image) {
        resultImageEl.src = resultData.image;
        resultImageEl.alt = `${resultData.title} 결과 이미지`;
        resultImageEl.style.display = 'block';
        resultImageEl.onerror = () => resultImageEl.style.display = 'none';
    } else {
        resultImageEl.style.display = 'none';
    }

    resultSummaryEl.textContent = cleanText(resultData.summary);
    resultDescriptionEl.textContent = cleanText(resultData.description);
    resultAdviceEl.textContent = cleanText(resultData.advice);

    resultProsEl.innerHTML = '';
    (resultData.pros || []).forEach(item => {
        const li = document.createElement('li');
        li.textContent = cleanText(item);
        resultProsEl.appendChild(li);
    });

    resultConsEl.innerHTML = '';
    (resultData.cons || []).forEach(item => {
        const li = document.createElement('li');
        li.textContent = cleanText(item);
        resultConsEl.appendChild(li);
    });
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBarEl.style.width = `${progress}%`;
}

function shareResult() {
    const shareText = `내 연애 스타일은 ${cleanText(resultTitleEl.textContent)} ${resultCodeEl.textContent}!\n${window.location.href}`;
    if (navigator.share) {
        navigator.share({ title: '내 연애 스타일은?', text: shareText, url: window.location.href })
            .then(() => alert('결과가 공유되었습니다!'))
            .catch(() => {
                navigator.clipboard.writeText(shareText).then(() => alert('클립보드에 복사되었습니다!'));
            });
    } else {
        navigator.clipboard.writeText(shareText).then(() => alert('클립보드에 복사되었습니다!'));
    }
}

// Event Listeners
startTestBtn.addEventListener('click', startTest);
shareResultBtn.addEventListener('click', shareResult);
restartTestBtn.addEventListener('click', startTest);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    headerSection.style.display = 'block';
    testArea.style.display = 'none';
});