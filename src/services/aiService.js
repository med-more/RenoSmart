const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('VITE_GEMINI_API_KEY is not set. AI features will not work.');
}

// List available models
const listAvailableModels = async () => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      return data.models?.map(m => m.name) || [];
    }
    return [];
  } catch (error) {
    console.warn('Could not list models:', error);
    return [];
  }
};

// Use REST API directly - try v1beta first, then v1
const callGeminiAPI = async (prompt, modelName = 'gemini-pro') => {
  // Try v1beta first (newer API)
  const versions = ['v1beta', 'v1'];
  
  for (const version of versions) {
    try {
      const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${API_KEY}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }
      
      // If 404, try next version
      if (response.status === 404 && versions.indexOf(version) < versions.length - 1) {
        continue;
      }
      
      // For other errors, throw
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error (${response.status}): ${errorData.error?.message || response.statusText}`);
    } catch (error) {
      // If it's the last version, throw the error
      if (version === versions[versions.length - 1]) {
        throw error;
      }
      // Otherwise continue to next version
      continue;
    }
  }
  
  throw new Error('Failed to call Gemini API with all versions');
};

export const generateDashboardInsights = async (dashboardData) => {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  try {
    // First, try to get available models
    const availableModels = await listAvailableModels();
    console.log('Available Gemini models:', availableModels);
    
    // Try different model names in order of preference
    // Remove version prefix if present (e.g., "models/gemini-pro" -> "gemini-pro")
    const modelNames = [
      'gemini-2.0-flash-exp', // Latest experimental model
      'gemini-2.5-flash',     // Gemini 2.5 Flash
      'gemini-1.5-flash',     // Newer, faster model
      'gemini-1.5-pro',       // Newer, more powerful model
      'gemini-pro',           // Original model name (most compatible)
    ];
    
    // If we got available models, prioritize those
    const prioritizedModels = [];
    if (availableModels.length > 0) {
      // Add available models first
      for (const available of availableModels) {
        const modelName = available.replace('models/', '');
        if (!prioritizedModels.includes(modelName)) {
          prioritizedModels.push(modelName);
        }
      }
      // Then add our fallback list
      for (const model of modelNames) {
        if (!prioritizedModels.includes(model)) {
          prioritizedModels.push(model);
        }
      }
    } else {
      prioritizedModels.push(...modelNames);
    }

    const prompt = `Tu es un expert en analyse de données pour une entreprise de rénovation immobilière. 
Analyse les données suivantes du tableau de bord et génère des insights pertinents et actionnables.

Données du tableau de bord:
- Total de demandes: ${dashboardData.stats.total}
- Demandes en attente: ${dashboardData.stats.pending}
- Demandes en cours d'examen: ${dashboardData.stats.inReview}
- Demandes approuvées: ${dashboardData.stats.approved}
- Demandes rejetées: ${dashboardData.stats.rejected}
- Demandes actives: ${dashboardData.stats.active}
- Budget total: ${dashboardData.totalBudget.toLocaleString('fr-FR')} €
- Budget moyen: ${dashboardData.avgBudget.toLocaleString('fr-FR')} €

Répartition par type de travaux:
${Object.entries(dashboardData.workTypeStats).map(([type, count]) => `- ${type}: ${count} demandes`).join('\n')}

Activité des 7 derniers jours:
${dashboardData.requestsByDay.map((count, index) => `- Jour ${index + 1}: ${count} demandes`).join('\n')}

Tendance d'activité: ${dashboardData.activityTrend}

Génère 3 à 5 insights pertinents au format JSON suivant:
[
  {
    "type": "success|warning|info",
    "icon": "emoji approprié",
    "title": "Titre court et accrocheur",
    "message": "Message détaillé avec des données spécifiques et des recommandations actionnables"
  }
]

Les insights doivent être:
- Basés sur les données réelles fournies
- Actionnables (avec des recommandations concrètes)
- Pertinents pour la gestion d'une entreprise de rénovation
- Variés (mélange de succès, avertissements, et informations)
- En français
- Concis mais informatifs

Réponds UNIQUEMENT avec le JSON, sans texte supplémentaire.`;

    // Try each model using REST API directly
    let text;
    let lastError;
    
    for (const modelName of prioritizedModels) {
      try {
        console.log(`Trying Gemini model via REST API: ${modelName}`);
        text = await callGeminiAPI(prompt, modelName);
        if (text) {
          console.log(`✓ Successfully used model: ${modelName}`);
          break;
        }
      } catch (error) {
        lastError = error;
        console.warn(`✗ Model ${modelName} failed:`, error.message);
        // Continue to next model
        continue;
      }
    }
    
    if (!text) {
      throw lastError || new Error('Tous les modèles Gemini ont échoué. Vérifiez votre clé API et que l\'API Generative Language est activée dans Google Cloud Console.');
    }

    let insights;
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        insights = JSON.parse(jsonMatch[0]);
      } else {
        insights = JSON.parse(text);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw response:', text);
      throw new Error('Failed to parse AI response');
    }

    if (!Array.isArray(insights)) {
      throw new Error('AI response is not an array');
    }

    return insights.slice(0, 5);
  } catch (error) {
    console.error('Error generating insights with Gemini:', error);
    
    // Provide more helpful error messages
    if (error.message?.includes('404') || error.message?.includes('not found')) {
      throw new Error('Modèle Gemini non trouvé. Vérifiez que votre clé API est valide et que les modèles sont disponibles dans votre région.');
    } else if (error.message?.includes('API key') || error.message?.includes('401') || error.message?.includes('403')) {
      throw new Error('Clé API Gemini invalide ou expirée. Vérifiez votre clé API dans les variables d\'environnement.');
    } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      throw new Error('Quota API Gemini dépassé. Veuillez réessayer plus tard.');
    }
    
    throw error;
  }
};

