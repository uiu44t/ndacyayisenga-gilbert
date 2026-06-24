import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { PRODUCTS } from "./src/data/products";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to support base64 image uploads
  app.use(express.json({ limit: '12mb' }));
  app.use(express.urlencoded({ limit: '12mb', extended: true }));

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for image recommendation
  app.post("/api/recommend-by-image", async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "No image file provided." });
      }

      // Filter catalog to represent essential info to keep token payload moderate
      const catalogSummary = PRODUCTS.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        subcategory: p.subcategory,
        brand: p.brand,
        price: p.price,
        description: p.description
      }));

      // Set up the parts for gemini-3.5-flash
      const imagePart = {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: imageBase64,
        },
      };

      const textPart = {
        text: `You are an expert AI curator for Bruce Rii's high-end boutique shop (motorcycles, luxury cars, airplanes, premium electronics).
Analyze this uploaded product photo and identify its key visual traits (product type, style, color palette, design language).
Then, compare it with our actual store catalog below and recommend the top 3-4 most similar products we sell.

For each recommended product, provide:
1. The matching product ID (must be one from the catalog list).
2. A match confidence score (0 to 100).
3. A clear explanation of why it matches (e.g. "Matches the vintage café racer leather styling and classic wheel spoke architecture in the photo").
4. A short title summarizing the visual similarity (e.g., "Vintage Aesthetic Match").

Catalog Inventory List:
${JSON.stringify(catalogSummary, null, 2)}
`
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [imagePart, textPart],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              detectedProductType: {
                type: Type.STRING,
                description: "Brief summary of what the AI detected in the user's uploaded photo (e.g., 'Retro Cruiser Motorcycle', 'Red Sports Car')"
              },
              detectedColorPalette: {
                type: Type.STRING,
                description: "Dominant colors in the image"
              },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productId: {
                      type: Type.STRING,
                      description: "The product ID matching one of our catalog products"
                    },
                    confidence: {
                      type: Type.INTEGER,
                      description: "Confidence rating (1-100)"
                    },
                    matchReason: {
                      type: Type.STRING,
                      description: "Detailed context of what visual qualities matched this catalog product"
                    },
                    matchTitle: {
                      type: Type.STRING,
                      description: "Short title highlighting the match reason"
                    }
                  },
                  required: ["productId", "confidence", "matchReason", "matchTitle"]
                }
              }
            },
            required: ["detectedProductType", "detectedColorPalette", "recommendations"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      const result = JSON.parse(responseText.trim());
      res.json(result);

    } catch (error: any) {
      console.error("Gemini Image Recommendation Error:", error);
      res.status(500).json({ error: error.message || "Internal server error analyzing the image." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
