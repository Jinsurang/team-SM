# Team 직무기술서 — Cloudflare 배포 가이드

## 폴더 구조

```
team-jd/
├── public/
│   └── index.html        ← 프론트엔드 (여기 수정)
├── functions/
│   └── api/
│       └── jd.js         ← KV 읽기/쓰기 API
└── wrangler.toml         ← Cloudflare 설정
```

---

## 배포 방법 (처음 한 번만)

### 1단계 — KV Namespace 만들기

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **KV**
2. **Create a namespace** 클릭
3. 이름: `JD_STORE` (아무 이름이나 가능)
4. 생성 후 **ID 복사**

### 2단계 — wrangler.toml 수정

`wrangler.toml` 파일에서 아래 부분을 복사한 ID로 교체:

```toml
[[kv_namespaces]]
binding = "JD_STORE"
id = "여기에_복사한_ID_붙여넣기"
```

### 3단계 — Cloudflare Pages에 배포

**방법 A: 드래그 앤 드롭 (가장 쉬움)**
1. Cloudflare Dashboard → **Workers & Pages** → **Create application**
2. **Pages** → **Upload assets**
3. `team-jd` 폴더 전체를 드래그
4. 배포 완료 후 → **Settings** → **Functions** → **KV namespace bindings**
5. Variable name: `JD_STORE`, KV namespace: 방금 만든 것 선택

**방법 B: GitHub 연동 (자동 배포)**
1. `team-jd` 폴더를 GitHub 레포에 push
2. Cloudflare Pages에서 GitHub 레포 연결
3. Build output directory: `public`
4. KV 바인딩 위와 동일하게 설정

---

## 재배포 (내용 변경 시)

- `public/index.html` 수정 → GitHub push → 자동 배포
- 또는 Cloudflare Dashboard에서 새 파일 업로드

---

## 데이터 저장 방식

- **Cloudflare KV**에 JSON으로 저장 (`/api/jd` 엔드포인트)
- API 연결 실패 시 자동으로 **브라우저 localStorage** 폴백
- 상단에 `☁️ 클라우드 연동됨` 표시되면 팀 공유 저장 작동 중

---

## 마크다운 문법

| 문법 | 결과 |
|------|------|
| `**굵게**` | **굵게** |
| `==하이라이트==` | 노란 배경 강조 |
| `*기울임*` | *기울임* |
| `## 소제목` | 소제목 |
| `- 목록` | 불릿 목록 |
| `> 인용문` | 파란 왼쪽 선 인용 |
| `---` | 구분선 |
| `Ctrl+B` | 선택 텍스트 굵게 |
