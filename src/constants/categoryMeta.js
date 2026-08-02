export const getCategoryMeta = (slug, phraseCount = 0) => {
  const emojiMap = {
    'greetings-basics': '🙏',
    'grocery-shopping': '🛒',
    'auto-cab-communication': '🚕',
    'public-bus-train-metro': '🚌',
    'asking-directions': '🧭',
    'food-restaurant': '🍲',
    'workplace-construction': '👷',
    'hospital-emergency': '🏥',
    'police-legal-help': '🚔',
    'renting-accommodation': '🏠',
    'banking-money-transfer': '🏦',
    'sim-card-mobile-recharge': '📱',
    'children-s-school': '🎒',
    'laundry-household': '🧺',
    'local-government-civic': '🏛️',
    'religious-festival-greetings': '🪔',
    'emotional-social': '💬',
    'number-basics': '🔢',
    'time-numbers-expanded': '⏰'
  };

  return {
    emoji: emojiMap[slug] || '📚',
    estimatedMinutes: Math.max(Math.ceil(phraseCount / 2), 5),
    description: 'Practice essential phrases for daily life'
  };
};
