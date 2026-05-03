export interface ErrorMessage {
  headline: string;
  subtext: string;
  microLine?: string;
  quote?: {
    text: string;
    attribution: string;
  };
}

export const errorMessages: ErrorMessage[] = [
  // Messages will be added here by the user
];

// Get a random message that isn't the same as the last one shown
export function getRandomErrorMessage(): ErrorMessage {
  if (errorMessages.length === 0) {
    return {
      headline: "Something went wrong.",
      subtext: "Even the best editors make mistakes. Let's try that again.",
    };
  }

  // Check sessionStorage for last shown message index
  if (typeof window !== "undefined") {
    const lastIndex = sessionStorage.getItem("lastErrorMessageIndex");
    const lastIdx = lastIndex ? parseInt(lastIndex, 10) : -1;

    // Get random index, avoiding immediate repetition
    let randomIdx: number;
    if (errorMessages.length === 1) {
      randomIdx = 0;
    } else {
      do {
        randomIdx = Math.floor(Math.random() * errorMessages.length);
      } while (randomIdx === lastIdx);
    }

    // Store the index
    sessionStorage.setItem("lastErrorMessageIndex", randomIdx.toString());

    return errorMessages[randomIdx];
  }

  // Fallback for SSR
  return errorMessages[Math.floor(Math.random() * errorMessages.length)];
}
