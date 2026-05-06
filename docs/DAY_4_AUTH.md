✅ پرامپت نهایی برای چت جدید (نسخه حرفه‌ای و اجرایی)
این بلوک رو عیناً در چت جدید کپی کن:

md
تو نقش یک Senior Backend / Full‑Stack Engineer (Next.js + TypeScript + Drizzle + JWT) را داری.  
من (علی) در حال ساخت یک پروژه Job Board SaaS به نام `job-board-saas` هستم.

TECH STACK:
- Next.js (App Router) – نسخه 14/15
- TypeScript (strict)
- PostgreSQL
- Drizzle ORM
- JWT (jose)
- Edge Middleware
- Cookie‑based auth
- Rate Limiting
- Role‑based Access Control (RBAC)

هدف فعلی این چت:
1) **اول**: نهایی‌سازی و یکدست کردن Auth/JWT layer (types + utils + helpers) و صفر کردن خطاهای TypeScript مربوط به Auth.
2) **بعد**: طراحی Service Layer و پیاده‌سازی Job CRUD + Apply System روی Auth پایدار.

من تا اینجا در یک چت قبلی Auth Core را کامل پیاده‌سازی و ریفکتور کردم و حالا می‌خواهم ادامه‌ی توسعه را در این چت انجام بدهم، بدون اینکه معماری Auth از صفر دوباره عوض شود؛ فقط اگر inconsistency واضح هست، آن را fix و یکدست کن.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 1) وضعیت فعلی Auth / JWT (تصمیم‌های نهایی معماری)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1.1. Auth Architecture

- فقط **یک سیستم Auth مبتنی بر JWT** داریم (هیچ سیستم legacy دیگری نباید استفاده شود).
- Access Token + Refresh Token Rotation:
  - Access Token کوتاه‌مدت، در Cookie (`access_token`) ذخیره می‌شود.
  - Refresh Token بلندمدت، در DB (جدول `refresh_tokens`) ذخیره می‌شود و Rotation کامل دارد.
- سایر توکن‌ها:
  - Reset Password Token
  - Email Verification Token
- Auth روی این مفاهیم بنا شده:
  - `requireUser`
  - `optionalAuth`
  - `ensureRole` (RBAC)
  - Edge `middleware.ts`
  - Helpers مثل `getCurrentUser`

### 1.2. Role System (قطعی)

نقش‌ها (UserRole):

- `admin`
- `employer`
- `candidate`
- `user`

این union type باید واحد و در سراسر پروژه استفاده شود.

### 1.3. JWT Payload Design (نسخه نهایی که می‌خواهم)

لطفاً در این چت، JWT layer را **با این قرارداد نهایی** یکدست کن:
```ts
export type UserRole = "admin" | "employer" | "candidate" | "user";

export interface AccessTokenPayload {
  userId: number;
  email: string;
  role: UserRole;
  type: "access";
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  tokenId: string;
  userId: number;
  type: "refresh";
  iat?: number;
  exp?: number;
}

export interface ResetPasswordTokenPayload {
  userId: number;
  email: string;
  type: "reset";
  iat?: number;
  exp?: number;
}

export interface EmailVerifyTokenPayload {
  userId: number;
  email: string;
  type: "email-verify";
  iat?: number;
  exp?: number;
}

export interface StoredRefreshToken {
  id: string;          // همان tokenId
  userId: number;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  isRevoked: boolean;
}
اصول کلیدی:

userId در کل سیستم باید number باشد (نه string).
AccessToken همیشه email و role را هم داشته باشد.
RefreshToken حتماً tokenId داشته باشد تا با جدول DB sync شود.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2) فایل‌ها و ماژول‌های Auth که الان وجود دارند
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2.1. Auth Core
src/lib/auth/auth.context.ts (AuthContext با userId, role, email, …)
src/lib/auth/require-user.ts → requireUser() (بر اساس JWT)
src/lib/auth/optional-auth.ts → optional auth برای routeهای public
src/lib/auth/role-guard.ts → RBAC (ensureRole(req, roles))
src/lib/auth/token.extractor.ts→ خواندن JWT از Cookie و در صورت نیاز از Header
src/lib/auth/get-current-user.ts → helper برای استخراج user از Access Token
src/lib/auth/get-user.ts → helper سطح پایین‌تر برای کار با payload
2.2. JWT Layer
src/lib/jwt/jwt.types.ts → تعریف typeهای بالا (ولی در حال حاضر در پروژه ممکن است inconsistent باشد)
src/lib/jwt/jwt.utils.ts → توابع:
signAccessToken / verifyAccessToken
signRefreshToken / verifyRefreshToken
signResetPasswordToken / verifyResetPasswordToken
signEmailVerificationToken / verifyEmailVerificationToken
Secrets فعلی به‌صورت مفهومی:

JWT_SECRET → برای access/refresh
JWT_RESET_SECRET → برای reset password
JWT_EMAIL_VERIFY_SECRET → برای email verification
توقع من در این چت:

این سه secret به‌صورت استاندارد و consistent استفاده شوند.
تمام verifyها دقیقاً با types بالا align شوند (بدون any و بدون cast غیرضروری).
2.3. Database Schema (Drizzle)
users
فایل: src/db/schema/users.schema.ts

ستون جدید:
emailVerified: boolean("email_verified").default(false).notNull()
refresh_tokens
فایل: src/db/schema/refresh_tokens.schema.ts (اسم دقیق ممکن است کمی فرق کند، ولی مفهوم این است):

ستون‌ها:
id (همان tokenId / primary key)
userId
tokenHash
expiresAt
createdAt
isRevoked
2.4. Auth API Routes
در src/app/api/auth این routeها پیاده‌سازی شده‌اند:

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
POST /api/auth/refresh → Refresh Token Rotation
POST /api/auth/logout → revoke session فعلی
POST /api/auth/logout-all → revoke تمام sessionها
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/resend-verification
GET /api/auth/verify-email
2.5. Middleware / Mail
middleware.ts (Edge middleware برای pre-check JWT)
src/lib/mail/send-password-reset.ts (fake sender)
src/lib/mail/send-verification.ts (fake sender)
2.6. Legacy Files (حذف شده‌اند)
token.utils.ts → حذف شده
middleware/auth.middleware.ts → حذف شده
اگر importهای باقیمانده به این فایل‌ها وجود داشته باشند، باید پاک شوند.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3) باگ‌ها و ناسازگاری‌هایی که قبلاً داشتیم
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

این موارد در چت قبلی رخ داده و بعضی‌شان حل شده، بعضی ناقص هستند. در این چت می‌خواهم آن‌ها را کامل و قطعی حل کنیم:

userId در JWT payload در بعضی جاها string بود، در بعضی number.

تصمیم نهایی: همه‌جا number.
لذا توابع sign/verify و types باید align شوند.
خطا: Property 'email' does not exist on type 'AccessTokenPayload'

علت: در نسخه‌ای از jwt.types.ts، email در AccessTokenPayload تعریف نشده بود.
الان باید نسخه نهایی types حتماً email را داشته باشد و verifyAccessToken هم آن را validate کند.
Refresh Token Payload vs. Type:

type: RefreshTokenPayload شامل tokenId است.
در برخی نسخه‌های signRefreshToken, tokenId به payload اضافه نمی‌شد.
باید اصلاح شود تا signRefreshToken دقیقاً payload { tokenId, userId, type: 'refresh' } را امضا کند.
Secrets مختلف:

بعضی توابع از JWT_SECRET استفاده می‌کردند و بعضی مستقیم از environment های دیگر.
باید استاندارد شود:
access/refresh: JWT_SECRET
reset: JWT_RESET_SECRET
email verify: JWT_EMAIL_VERIFY_SECRET
get-current-user.ts:

در یک نسخه از این فایل، payload را از JWT می‌گرفت ولی type آن با AccessTokenPayload فعلی align نبود (به‌خصوص email).
اکنون باید:
از extractor مشترک برای گرفتن token استفاده کند (ترجیحاً cookie)
از verifyAccessToken استفاده کند
خروجی را به صورت:
ts
{ userId: number; email: string; role: UserRole }

   برگرداند.
خطای قبلی TypeScript:
اجرای npx tsc --noEmit --pretty خطاهایی مثل:
Property 'email' does not exist on type 'AccessTokenPayload' در get-current-user.ts
در این چت می‌خواهم تمام خطاهای TypeScript مربوط به Auth/JWT را از بین ببری.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4) انتظارات من در این چت (TODO دقیق)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

گام 1 – نهایی‌سازی JWT Layer
لطفاً یک نسخه نهایی و کامل از این دو فایل برای من طراحی کن:

src/lib/jwt/jwt.types.ts
src/lib/jwt/jwt.utils.ts
با رعایت این اصول:

userId در تمام payloadها number باشد.
AccessTokenPayload شامل userId, email, role, type: "access" باشد.
RefreshTokenPayload شامل tokenId, userId, type: "refresh" باشد.
Reset و Verify payloadها مطابق بخش 1.3.
در verifyAccessToken و verifyRefreshToken:
payload را type‑safe validate کن (typeof checks).
در صورت invalid بودن، خطای مناسب پرتاب کن.
از jose استفاده کن (SignJWT, jwtVerify).
Secrets و expiration ها را به صورت ثابت‌های واضح تعریف کن:
ACCESS_TOKEN_EXPIRES = "15m"
REFRESH_TOKEN_EXPIRES = "30d"
RESET_TOKEN_EXPIRES = "15m"
EMAIL_VERIFY_EXPIRES = "30m"
لطفاً حواست باشد که implementation پیشنهادی را کامل و بدون شکستگی بدهی (نه نیمه‌کاره).

گام 2 – اصلاح get-current-user.ts
یک نسخه نهایی برای: src/lib/auth/get-current-user.ts بده:

الزامات:

از NextRequest استفاده کند.
token را از req.cookies.get("access_token")?.value (یا از token.extractor مشترک) بخواند.
verifyAccessToken را صدا بزند.
در صورت نداشتن یا invalid بودن token، یا:
خطا پرتاب کند (اگر برای routeهای protected استفاده می‌شود)، یا
null برگرداند (اگر قرار است optional باشد) – ترجیح من این است که این helper خطا پرتاب کند و برای optional از optionalAuth استفاده شود.
خروجی:
ts
{
userId: number;
email: string;
role: UserRole;
}

گام 3 – TypeScript Safety
در کدی که ارائه می‌کنی، حتماً TypeScript strict را رعایت کن.
انواع return value ها دقیق باشند.
از cast های غیرضروری as any پرهیز کن.
اگر لازم است، interfaceهای کمکی برای error types یا context اضافه کن.
گام 4 – آماده‌سازی برای فاز بعدی (Service Layer + Job CRUD)
بعد از اینکه:

jwt.types.ts
jwt.utils.ts
get-current-user.ts
را نهایی کردیم و تو فرض گرفتی که npx tsc --noEmit بدون خطا است (حداقل در بخش Auth/JWT)، در همین چت می‌خواهم با هم برویم سراغ:

طراحی یک Service Layer تمیز برای SaaS:

job.service
application.service
separation of concerns: route → service → repository (Drizzle)
پیاده‌سازی Job CRUD:

POST /api/jobs → فقط employer / admin
GET /api/jobs → public (با pagination/filters)
GET /api/jobs/:id → public
PATCH /api/jobs/:id → فقط owner (employer) یا admin
DELETE /api/jobs/:id → فقط owner (employer) یا admin
سپس Apply System:

candidate می‌تواند روی job apply کند.
جلوگیری از duplicate apply.
employer می‌تواند applicants را ببیند.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5) قدم عملی بعدی
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

در پاسخ اولت در این چت جدید:

لطفاً ابتدا یک نسخه کامل و تمیز از این دو فایل به من بده:

src/lib/jwt/jwt.types.ts
src/lib/jwt/jwt.utils.ts
بعدش نسخه‌ی نهایی src/lib/auth/get-current-user.ts را هم ارائه بده.

اگر نیاز به فرض خاصی درباره نام کوکی، مسیر فایل‌ها، یا UserRole داری، صریح بگو تا من در پروژه واقعی‌ام تنظیمش کنم.

text

---

### نکته پایانی برای تو، علی

الان:

- این پرامپت دیگه تکراری و شلخته نیست؛
- معماری و وضعیت فعلی Auth/JWT رو خیلی شفاف منتقل می‌کنه؛
- دقیقا به مدل می‌گه: «اول JWT/types/get-current-user رو نهایی کن، بعد بریم Service Layer و Job CRUD».

اگر دوست داری، می‌تونم در یک پیام جدا:
- یک نسخه «خیلی کوتاه‌تر» هم بسازم که فقط برای ادامه توسعه (بعد از اینکه خودت دستی JWT رو فیکس کردی) استفاده بشه.
