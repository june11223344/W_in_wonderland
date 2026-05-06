# alice_in

앨리스 테마의 **개인 자기소개 웹사이트**입니다. 백엔드 없이 정적 페이지로 배포할 수 있습니다.

---

## 구성

| 경로 | 설명 |
|------|------|
| **`mypage/`** | Next.js 앱 (실제 홈페이지 코드) |
| `MdFiles/`, `UI/` 등 | 레포에 함께 있는 기타 자료·에셋 (앱 빌드와 무관할 수 있음) |

---

## 기술 스택 (`mypage`)

| 항목 | 버전·선택 |
|------|-----------|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| 스타일 | Tailwind CSS 3 |
| 모션 | Framer Motion |
| 아이콘 | Lucide React |

**런타임:** Node.js **20.x** (`package.json`의 `engines` 참고)

---

## 로컬에서 실행

**처음 한 번:** 의존성은 Next 앱 폴더에 설치합니다.

```bash
cd mypage
npm install
cd ..
```

**이후:** 저장소 루트(`alice_in`)에서 그대로:

```bash
npm run dev
```

브라우저에서 **http://localhost:3000** 을 엽니다.

루트 `package.json`이 `mypage`의 `dev` / `build` / `start` / `lint`를 `--prefix`로 실행합니다.

- **환경 변수:** 이 앱은 정적 소개 페이지만 쓰는 구성이라 **필수 `.env`는 없습니다.** (`mypage/.env.example` 참고)

---

## 내용·문구 바꾸기

| 파일 | 역할 |
|------|------|
| **`mypage/lib/site.ts`** | 제목, 히어로 카피, 네비, 스포트라이트 카드 데이터, 연락·GitHub 링크 등 **대부분의 영문 카피** |
| **`mypage/app/page.tsx`** | 섹션 순서, 레이아웃, 애니메이션, 인라인 UI |

이미지는 **`mypage/public/`** 및 **`mypage/public/assets/`** 에 두고 경로로 참조합니다.

---

## 배포 (Vercel 예시)

1. GitHub에 연결한 뒤 **Root Directory**를 **`mypage`** 로 지정합니다.  
2. **Node.js** 버전은 **20.x** 를 사용합니다.  
3. Build: `npm run build`, Output: Next 기본 동작.

---

## 프로젝트 구조 (`mypage` 실제 기준)

```
mypage/
├── app/
│   ├── layout.tsx          # 루트 레이아웃, 메타데이터, 폰트 링크
│   ├── page.tsx            # 단일 홈 페이지 (섹션 전부)
│   ├── globals.css
│   └── api/health/route.ts # 헬스 체크용 (선택)
├── lib/
│   └── site.ts             # 사이트 카피·데이터 단일 소스
├── public/                 # 정적 이미지·파비콘 등
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## 라이선스

MIT
