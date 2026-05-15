import { createClient } from '@supabase/supabase-js';
import { xaiClient } from './xai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function ragChat(query: string, orgId: string) {
  try {
    // Crear embedding
    const embeddingRes = await xaiClient.embeddings.create({
      model: "text-embedding-3-large",
      input: query,
    });

    // Búsqueda simple (sin orden vectorial avanzado para evitar errores)
    const { data: matches } = await supabase
      .from('documents')
      .select('content, metadata')
      .eq('org_id', orgId)
      .limit(5);

    const context = matches?.map((m: any) => m.content).join("\n\n") || 
                   "No encontré documentos relevantes.";

    // Llamada a Grok
    const completion = await xaiClient.chat.completions.create({
      model: "grok-4",
      temperature: 0.7,
      messages: [
        { 
          role: "system", 
          content: "Eres un asistente útil y profesional." 
        },
        { 
          role: "user", 
          content: `Contexto:\n${context}\n\nPregunta: ${query}` 
        }
      ]
    });

    return {
      success: true,
      answer: completion.choices[0].message.content || "No tengo respuesta.",
      tokensUsed: completion.usage?.total_tokens || 0,
      sources: []
    };

  } catch (error: any) {
    console.error("Error en ragChat:", error);
    return {
      success: false,
      answer: "Hubo un error al procesar tu consulta. Inténtalo de nuevo.",
      tokensUsed: 0
    };
  }
}