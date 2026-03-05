import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = {
  width: 1200,
  height: 630,
};

const MAX_RAW_PARAM_LENGTH = 200;
const CACHE_CONTROL = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

function sanitizeParam(value: string | null, fallback: string, maxLength: number) {
  const normalized = (value ?? fallback)
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return fallback;
  return normalized.slice(0, maxLength);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title");
  const rawSubtitle = searchParams.get("subtitle");

  if (
    (rawTitle && rawTitle.length > MAX_RAW_PARAM_LENGTH) ||
    (rawSubtitle && rawSubtitle.length > MAX_RAW_PARAM_LENGTH)
  ) {
    return new Response("Invalid query params", {
      status: 400,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const title = sanitizeParam(rawTitle, "Amaro Junior", 64);
  const subtitle = sanitizeParam(rawSubtitle, "Portfolio V2", 96);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(circle at 20% 10%, rgba(74, 222, 128, 0.18) 0%, rgba(10, 10, 10, 1) 42%)",
          color: "#eaeaea",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#9ca3af",
          }}
        >
          JR Minimal
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 980,
              textWrap: "balance",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#9ca3af",
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#9ca3af",
          }}
        >
          <div style={{ display: "flex" }}>jrvalerio.dev</div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 9999,
              padding: "8px 20px",
            }}
          >
            Full-Stack Developer
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        "Cache-Control": CACHE_CONTROL,
      },
    }
  );
}
