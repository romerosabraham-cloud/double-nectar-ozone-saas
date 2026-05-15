import { auth } from "@clerk/nextjs/server";
import { ragChat } from "@/lib/rag";
import { deductCredits } from "@/lib/billing";

export async function POST(request: Request) {
  try {
    const { userId, orgId } = await auth();
    
    if (!orgId) {
      return new Response("No autorizado", { status: 401 });
    }

    const { message } = await request.json();

    if (!message || message.trim() === "") {
      return new Response("El mensaje es requerido", { status: 400 });
    }

    const result = await ragChat(message, orgId);

    if (!result.success) {
      return Response.json(result, { status: 500 });
    }

    const creditsDeducted = await deductCredits(orgId, result.tokensUsed);

    if (!creditsDeducted) {
      return new Response(
        JSON.stringify({ error: "Créditos insuficientes. Por favor actualiza tu plan." }), 
        { status: 402 }
      );
    }

    return Response.json(result);

  } catch (error: any) {
    console.error("Error en /api/rag/chat:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}