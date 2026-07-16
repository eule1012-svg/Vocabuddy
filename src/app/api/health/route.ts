export async function GET() {
  return Response.json({
    ok: true,
    service: "vocabuddy-web",
    timestamp: new Date().toISOString(),
  });
}
