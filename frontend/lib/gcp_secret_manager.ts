import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

let client: SecretManagerServiceClient | null = null;
let projectId: string | null = null;

export const initializeSecretManager = (gcpProjectId: string) => {
  if (!client) {
    client = new SecretManagerServiceClient();
  }
  projectId = gcpProjectId;
};

export const getSecret = async (secretName: string): Promise<string | null> => {
  if (!client || !projectId) {
    console.warn('Secret Manager not initialized. Call initializeSecretManager first.');
    return null;
  }

  const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;

  try {
    const [version] = await client.accessSecretVersion({ name });
    const payload = version.payload?.data?.toString();
    return payload || null;
  } catch (error) {
    console.error(`Failed to access secret ${secretName}:`, error);
    return null;
  }
};
