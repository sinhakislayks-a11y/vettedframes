export interface Quote {
  text: string;
  attribution: string;
}

export interface InteractionConfig {
  ctaHoverText: string;
  cursorText: string;
}

export interface ErrorMessage {
  headline: string;
  subtext: string;
  microLine?: string;
  quote?: Quote;
  ctaText?: string;
}

export const interactionConfig: InteractionConfig = {
  ctaHoverText: "Are you sure this time?",
  cursorText: "Still clicking?",
};

export const errorMessages: ErrorMessage[] = [
  {
    headline: "Looks like this frame didn't make the final cut.",
    subtext: "The page you're looking for was removed, moved, or never made it past the edit.",
    quote: {
      text: "In the end, we only regret the chances we didn't take.",
      attribution: "Lewis Carroll",
    },
    ctaText: "Go back to the timeline",
  },
  {
    headline: "This page lost retention.",
    subtext: "And the algorithm didn't forgive it.",
    quote: {
      text: "What gets measured gets managed.",
      attribution: "Peter Drucker",
    },
  },
  {
    headline: "This page went to touch grass.",
    subtext: "We couldn't convince it to stay online.",
    quote: {
      text: "Almost everything will work again if you unplug it for a few minutes.",
      attribution: "Anne Lamott",
    },
    ctaText: "Back to something more productive",
  },
  {
    headline: "You weren't supposed to see this.",
    subtext: "And yet, here we are.",
    quote: {
      text: "The real voyage of discovery… is seeing with new eyes.",
      attribution: "Marcel Proust",
    },
  },
  {
    headline: "Nothing here.",
    subtext: "Not even a mistake.",
    quote: {
      text: "Silence is also an answer.",
      attribution: "Ludwig Wittgenstein",
    },
  },
  {
    headline: "You got curious.",
    subtext: "It rarely ends well.",
    microLine: "(…and sometimes the end of it)",
    quote: {
      text: "Curiosity is the beginning of wisdom.",
      attribution: "Socrates",
    },
  },
  {
    headline: "You weren't supposed to end up here.",
    subtext: "But then again, you don't usually click things this randomly. Interesting.",
    ctaText: "Let's pretend this didn't happen",
  },
  {
    headline: "Nothing here.",
    subtext: "Just like most decisions made on the internet. This one included.",
    quote: {
      text: "The unexamined life is not worth living.",
      attribution: "Socrates",
    },
  },
  {
    headline: "Not everything leads somewhere.",
    subtext: "This is one of those times.",
    quote: {
      text: "Sometimes the journey is the destination.",
      attribution: "Dan Eldon",
    },
  },
  {
    headline: "Nothing here.",
    subtext: "But you stayed long enough to check.",
    quote: {
      text: "Attention is the rarest and purest form of generosity.",
      attribution: "Simone Weil",
    },
  },
  {
    headline: "You clicked something you weren't sure about.",
    subtext: "Turns out, that feeling was right.",
    quote: {
      text: "Trust yourself. You know more than you think.",
      attribution: "Benjamin Spock",
    },
  },
  {
    headline: "That didn't go where you expected.",
    subtext: "It rarely does.",
    quote: {
      text: "Man plans, and God laughs.",
      attribution: "Yiddish proverb",
    },
  },
  {
    headline: "You followed the wrong instinct.",
    subtext: "Subtle, but consistent.",
    quote: {
      text: "We are what we repeatedly do.",
      attribution: "Aristotle",
    },
  },
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
