export async function GET() {
  return Response.json({
    status: "healthy",
    message: "Application is running",
  });
}