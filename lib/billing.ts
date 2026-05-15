import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function deductCredits(orgId: string, tokensUsed: number) {
  if (tokensUsed <= 0) return true;

  try {
    // Obtener créditos actuales del cliente
    const { data, error } = await supabase
      .from('customer_credits')
      .select('credits_remaining')
      .eq('org_id', orgId)
      .single();

    if (error || !data) {
      console.error("Error al obtener créditos:", error);
      return false;
    }

    if (data.credits_remaining < tokensUsed) {
      return false; // Créditos insuficientes
    }

    // Descontar créditos
    const { error: updateError } = await supabase
      .from('customer_credits')
      .update({
        credits_remaining: data.credits_remaining - tokensUsed,
        last_updated: new Date().toISOString()
      })
      .eq('org_id', orgId);

    if (updateError) {
      console.error("Error al actualizar créditos:", updateError);
      return false;
    }

    return true;

  } catch (err) {
    console.error("Error en deductCredits:", err);
    return false;
  }
}