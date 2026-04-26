export type Logger = {
  info: (message: string) => void;
  error: (message: string, error?: unknown) => void;
};

const formatError = (error: unknown) => {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}\n${error.stack ?? ""}`.trim();
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
};

const createLogPrefix = (level: "INFO" | "ERROR") => {
  return `[${level}] ${new Date().toISOString()}`;
};

export const consoleLogger: Logger = {
  info: (message) => {
    console.log(`${createLogPrefix("INFO")} ${message}`);
  },
  error: (message, error) => {
    const formattedMessage = `${createLogPrefix("ERROR")} ${message}`;

    if (typeof error === "undefined") {
      console.error(formattedMessage);
      return;
    }

    console.error(`${formattedMessage}\n${formatError(error)}`);
  },
};
