// Cloudflare Pages Function
// KV 네임스페이스 바인딩: JD_STORE
// wrangler.toml 또는 Cloudflare Dashboard에서 설정 필요

export async function onRequestGet({ env }) {
  try {
    const raw = await env.JD_STORE.get("jd_data");
    const data = raw ? raw : "{}";
    return new Response(data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.text();
    // 유효한 JSON인지 검증
    JSON.parse(body);
    await env.JD_STORE.put("jd_data", body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
