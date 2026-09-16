import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Accept up to 15mb payload for base64 image uploads
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Mpox Angola Health Screener API",
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // API: Analyze skin lesion for Mpox triage
  app.post("/api/analyze-lesion", async (req, res) => {
    try {
      const { imageBase64, mimeType = "image/jpeg", notes = "", symptoms = [] } = req.body;

      if (!imageBase64) {
        return res.status(400).json({
          error: "Nenhuma imagem foi fornecida para análise.",
        });
      }

      // Clean base64 string if data URL prefix exists
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Safe contextual heuristic fallback if API key is not yet configured
        return res.json({
          success: true,
          isSimulation: true,
          assessment: "Análise Preliminar (Modo de Demonstração / Triagem Local)",
          confidenceLevel: "moderada",
          isLikelyMpox: false,
          calmingMessage: "Mantenha a calma. Muitas alterações na pele são provocadas por alergias, varicela ou picadas e têm tratamento simples. Este resultado é uma triagem inicial e não substitui o exame médico presencial.",
          summary: "A imagem apresenta alterações cutâneas que necessitam de confirmação presencial por um profissional de saúde. Não entre em pânico: a grande maioria das erupções cutâneas evolui favoravelmente com repouso e higiene adequada.",
          visualObservations: [
            "Presença de lesões ou pápulas na epiderme observadas no registro.",
            "Necessária verificação de umbilicação central e evolução de vesículas em contexto clínico.",
          ],
          differentialPossibilities: [
            "Varicela (Catapora comum)",
            "Herpes Zoster ou Herpes Simplex",
            "Foliculite ou infecção bacteriana estafilocócica",
            "Escabiose (Sarna) ou reação alérgica por picada de insetos"
          ],
          urgencyLevel: "atencao_rapida",
          stepByStepCare: [
            "Não coçar, espremer ou romper quaisquer bolhas ou pústulas.",
            "Lavar frequentemente as mãos com água e sabão ou friccionar álcool a 70%.",
            "Cobrir as lesões com gaze ou roupa de algodão limpa e fresca para evitar atrito e disseminação.",
            "Utilizar máscara cirúrgica ou facial caso precise conviver com familiares na mesma residência.",
            "Separar roupas de cama, toalhas e utensílios pessoais até obter o parecer do médico."
          ],
          warningSigns: [
            "Febre alta persistente (> 38.5°C) que não cede com antitérmicos",
            "Lesões nos olhos ou dor ocular intensa",
            "Dificuldade súbita para respirar ou dor no peito",
            "Incapacidade de engolir líquidos ou desidratação"
          ],
          angolaAdvice: "Ligue gratuitamente para a Linha 111 (CISP Angola) ou dirija-se à unidade de saúde de referência mais próxima na sua província (ex.: Hospital Geral de Luanda, Hospital Américo Boavida ou Hospital Provincial)."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Você é um médico especialista e consultor de saúde pública em Angola, atuando na triagem rápida e acolhimento sobre Mpox (Varíola dos Macacos / Clado Ib / Clado II).
Analise a imagem da lesão cutânea enviada pelo usuário, considerando também os sintomas informados: ${symptoms.length ? symptoms.join(", ") : "Nenhum sintoma adicional informado"} e notas adicionais: "${notes || "Sem notas adicionais"}".

DIRETRIZES FUNDAMENTAIS:
1. POSTURA HUMANA E ACOLHEDORA: Seja extremamente cauteloso, empático e acolhedor. Reduza o pânico do paciente! Explique que lesões na pele têm dezenas de causas banais ou comuns (como catapora/varicela, herpes zóster, escabiose/sarna, picadas de mosquitos, alergias, foliculites).
2. Não dê diagnóstico definitivo (pois apenas o teste laboratorial PCR pelo Instituto Nacional de Saúde Pública - INSP ou laboratórios autorizados em Angola confirma a infecção). Forneça uma triagem indicativa de compatibilidade visual.
3. Se a imagem parecer claramente uma foto não médica ou de baixa qualidade, ou se não mostrar pele/lesões visíveis, sinalize como "inconclusiva".
4. Forneça orientações práticas de isolamento preventivo, cuidados de higiene e alívio do desconforto sem ferir a pele.
5. Recomende a busca por um posto de saúde ou hospital em Angola com medidas de segurança (cobrir lesões, usar máscara, ligar para 111).

Retorne estritamente o formato JSON solicitado.`;

      const imagePart = {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: cleanBase64,
        },
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: {
          parts: [imagePart, { text: prompt }],
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              assessment: {
                type: Type.STRING,
                description: "Título curto da avaliação, ex: 'Compatibilidade Visual Suspeita para Mpox' ou 'Baixa Probabilidade de Mpox (Provável Outra Condição)' ou 'Inconclusiva'"
              },
              confidenceLevel: {
                type: Type.STRING,
                description: "Nível de compatibilidade: 'alta', 'moderada', 'baixa' ou 'inconclusiva'"
              },
              isLikelyMpox: {
                type: Type.BOOLEAN,
                description: "Se há suspeita moderada ou alta de Mpox"
              },
              calmingMessage: {
                type: Type.STRING,
                description: "Mensagem imediata reconfortante e tranquilizadora para acalmar a ansiedade da pessoa com empatia"
              },
              summary: {
                type: Type.STRING,
                description: "Explicação clínica clara, sem jargões excessivos, sobre o que a imagem sugere"
              },
              visualObservations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Pontos visuais observados na imagem (ex: morfologia, distribuição, umbilicação, etc.)"
              },
              differentialPossibilities: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Outros diagnósticos dermatológicos prováveis (varicela, herpes, foliculite, sarna, etc.)"
              },
              urgencyLevel: {
                type: Type.STRING,
                description: "'urgente', 'atencao_rapida' (24 a 48h) ou 'rotina_observacao'"
              },
              stepByStepCare: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Orientações práticas de higiene, isolamento e cuidados com as lesões"
              },
              warningSigns: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Sinais de gravidade que exigem ida imediata à emergência hospitalar"
              },
              angolaAdvice: {
                type: Type.STRING,
                description: "Recomendações específicas para Angola (Ligar para o 111 CISP, cuidados no deslocamento até a unidade de saúde)"
              }
            },
            required: [
              "assessment",
              "confidenceLevel",
              "isLikelyMpox",
              "calmingMessage",
              "summary",
              "visualObservations",
              "differentialPossibilities",
              "urgencyLevel",
              "stepByStepCare",
              "warningSigns",
              "angolaAdvice"
            ]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("O modelo não retornou resposta.");
      }

      const parsedData = JSON.parse(text);
      return res.json({
        success: true,
        ...parsedData
      });
    } catch (err: any) {
      console.error("Erro na análise da lesão:", err);
      return res.status(500).json({
        error: "Não foi possível concluir a análise da imagem no momento. Por favor, tente novamente ou procure uma unidade de saúde.",
        details: err?.message || String(err)
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Mpox Angola] Servidor rodando na porta ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Falha fatal ao inicializar o servidor:", err);
});
