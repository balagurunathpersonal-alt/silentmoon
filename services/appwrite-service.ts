import { APP_CONSTANTS, AppWrite_Constants } from "@/constants/app-constants";
import { Linking } from "react-native";
import {
    Account,
    Client,
    Databases,
    ID,
    Models,
    Query,
    type OAuthProvider,
} from "react-native-appwrite";
import InAppBrowser from "react-native-inappbrowser-reborn";
import "react-native-url-polyfill/auto";

export type CreateAccountInput = {
  email: string;
  password: string;
  name?: string;
};

export type CreateEmailSessionInput = {
  email: string;
  password: string;
};

export type CreatePasswordRecoveryInput = {
  email: string;
  redirectUrl: string;
};

export type OAuthSessionInput = {
  provider: OAuthProvider;
  path?: string;
  scopes?: string[];
};

export type DocumentTarget = {
  databaseId: string;
  collectionId: string;
};

export type CreateDocumentInput = DocumentTarget & {
  data: Record<string, unknown>;
  documentId?: string;
  permissions?: string[];
};

export type UpdateDocumentInput = DocumentTarget & {
  documentId: string;
  data: Record<string, unknown>;
  permissions?: string[];
};

export type GetDocumentInput = DocumentTarget & {
  documentId: string;
};

export type DeleteDocumentInput = GetDocumentInput;

export type ListDocumentsInput = DocumentTarget & {
  queries?: string[];
};

const getOAuthRedirectUrl = (path = "oauth") => {
  // Construct a deep link URL using the configured scheme
  return `${APP_CONSTANTS.scheme}://${path}`;
};

const readUrlParam = (url: string, name: string) => {
  try {
    const parsedUrl = new URL(url);
    const queryParam = parsedUrl.searchParams.get(name);

    if (queryParam) return queryParam;

    const hashParams = new URLSearchParams(parsedUrl.hash.replace(/^#/, ""));
    return hashParams.get(name) ?? undefined;
  } catch {
    return undefined;
  }
};

const getOAuthCredentials = (url: string | null | undefined) => {
  if (!url) {
    return null;
  }

  const userId = readUrlParam(url, "userId");
  const secret = readUrlParam(url, "secret");

  if (!userId || !secret) {
    return null;
  }

  return { userId, secret };
};

const waitForCurrentUser = async () => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      await account.get();
      return true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return false;
};

const client = new Client()
  .setEndpoint(AppWrite_Constants.endpoint)
  .setProject(AppWrite_Constants.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

export const appwriteService = {
  client,
  account,
  databases,
  id: ID,
  query: Query,

  createAccount: async ({ email, password, name }: CreateAccountInput) => {
    return account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
  },

  createEmailSession: async ({ email, password }: CreateEmailSessionInput) => {
    return account.createEmailPasswordSession({ email, password });
  },

  createPasswordRecovery: async ({
    email,
    redirectUrl,
  }: CreatePasswordRecoveryInput) => {
    return account.createRecovery({ email, url: redirectUrl });
  },

  createOAuthSession: async ({
    provider,
    path = "oauth",
    scopes = [],
  }: OAuthSessionInput) => {
    const redirectUrl = getOAuthRedirectUrl(path);
    const authUrl = account.createOAuth2Token({
      provider,
      success: redirectUrl,
      failure: redirectUrl,
      scopes,
    });

    if (!authUrl) {
      throw new Error("Unable to create OAuth URL for Appwrite.");
    }

    // Use InAppBrowser for OAuth flow on bare React Native
    const result = await InAppBrowser.openAuth(authUrl.toString(), redirectUrl);

    const credentials =
      result.type === "success"
        ? getOAuthCredentials(result.url)
        : getOAuthCredentials(await Linking.getInitialURL());

    if (credentials) {
      return account.createSession(credentials);
    }

    if (await waitForCurrentUser()) {
      return account.get();
    }

    if (result.type !== "success") {
      throw new Error(
        `OAuth sign-in did not complete. Result: ${result.type}.`,
      );
    }

    throw new Error("Missing OAuth token details in redirect URL.");
  },

  getCurrentUser: async () => {
    return account.get();
  },

  getSessions: async () => {
    return account.listSessions();
  },

  deleteCurrentSession: async () => {
    return account.deleteSession("current");
  },

  deleteAllSessions: async () => {
    return account.deleteSessions();
  },

  createDocument: async <T extends Models.Document = Models.DefaultDocument>({
    databaseId,
    collectionId,
    data,
    documentId = ID.unique(),
    permissions,
  }: CreateDocumentInput) => {
    return databases.createDocument<T>(
      databaseId,
      collectionId,
      documentId,
      data as any,
      permissions,
    );
  },

  listDocuments: async <T extends Models.Document>({
    databaseId,
    collectionId,
    queries = [],
  }: ListDocumentsInput) => {
    return databases.listDocuments<T>(databaseId, collectionId, queries);
  },

  getDocument: async <T extends Models.Document>({
    databaseId,
    collectionId,
    documentId,
  }: GetDocumentInput) => {
    return databases.getDocument<T>(databaseId, collectionId, documentId);
  },

  updateDocument: async <T extends Models.Document = Models.DefaultDocument>({
    databaseId,
    collectionId,
    documentId,
    data,
    permissions,
  }: UpdateDocumentInput) => {
    return databases.updateDocument<T>(
      databaseId,
      collectionId,
      documentId,
      data as any,
      permissions,
    );
  },

  deleteDocument: async ({
    databaseId,
    collectionId,
    documentId,
  }: DeleteDocumentInput) => {
    return databases.deleteDocument(databaseId, collectionId, documentId);
  },

  completeOAuthSession: async ({
    userId,
    secret,
  }: {
    userId: string;
    secret: string;
  }) => {
    return account.createSession({ userId, secret });
  },
};

export const buildDocumentQuery = (...queries: string[]) => queries;
