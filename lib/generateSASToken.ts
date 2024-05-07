import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";

export const containerName = "posts";

const accountName = process.env.AZURE_STORAGE_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

if (!accountName || !accountKey) {
  throw new Error("Azure Storage account name or key not found");
}

// Create a new SharedKeyCredential object for authentication
const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

// Create a blob service client using the storage account name and account key
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

export async function generateSASToken() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const permissions = new BlobSASPermissions();
  permissions.write = true;
  permissions.create = true;
  permissions.read = true;

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 60);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions,
      startsOn: new Date(),
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
}
