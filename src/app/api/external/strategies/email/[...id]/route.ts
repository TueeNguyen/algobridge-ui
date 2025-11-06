import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_KEY = process.env.API_KEY;

const proxyRequest = async (
  request: NextRequest,
  method: string,
  path: string[]
) => {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = `${API_BASE}/${path.join("/")}${
      searchParams.toString() ? `?${searchParams}` : ""
    }`;

    // Convert Headers to plain object and add API key
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Add/override the API key
    headers["X-API-KEY"] = API_KEY!;

    const options: RequestInit = {
      method,
      headers,
    };

    // Add body for POST/PUT/PATCH requests
    if (["POST", "PUT", "PATCH"].includes(method)) {
      const body = await request.text();
      if (body) {
        options.body = body;
      }
    }

    const response = await fetch(targetUrl, options);

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> }
) {
  const { id } = await params;

  const jwtToken = await request.json();
  console.log(jwtToken);
  return;
  // return proxyRequest(request, "POST", path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, "DELETE", path);
}
