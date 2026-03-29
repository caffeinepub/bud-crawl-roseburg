import { HttpAgent } from "@icp-sdk/core/agent";
import { loadConfig } from "../config";
import { StorageClient } from "./StorageClient";

const FALLBACK_GATEWAY_URL = "https://blob.caffeine.ai";

/**
 * Uploads a file to Caffeine blob storage and returns a public URL.
 * This URL can be included in email form submissions instead of using
 * multipart/form-data file attachments.
 */
export async function uploadArtwork(file: File): Promise<string> {
  const config = await loadConfig();
  const agent = new HttpAgent({ host: config.backend_host });
  if (config.backend_host?.includes("localhost")) {
    await agent.fetchRootKey().catch(() => {});
  }

  // Use fallback if the build-time env var wasn't set
  const gatewayUrl =
    !config.storage_gateway_url ||
    config.storage_gateway_url === "nogateway" ||
    config.storage_gateway_url === "undefined"
      ? FALLBACK_GATEWAY_URL
      : config.storage_gateway_url;

  const storageClient = new StorageClient(
    config.bucket_name,
    gatewayUrl,
    config.backend_canister_id,
    config.project_id,
    agent,
  );
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { hash } = await storageClient.putFile(bytes);
  return await storageClient.getDirectURL(hash);
}
