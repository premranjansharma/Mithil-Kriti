// app/api/auth/route.ts

export async function GET(request: Request) {
  return Response.json({ message: "Hello" })
}

export async function POST(request: Request) {
  return Response.json({ message: "Login ho gaya" })
}
