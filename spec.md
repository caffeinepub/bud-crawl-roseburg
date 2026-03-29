# Prints Charming

## Current State
Order forms (SmallOrders, Quote) use FormData with multipart encoding to attach artwork files to web3forms submissions. web3forms requires a paid plan for file attachments, causing all submissions to fail.

## Requested Changes (Diff)

### Add
- `src/frontend/src/utils/uploadArtwork.ts` — uploads a File to Caffeine blob storage and returns a public URL

### Modify
- `SmallOrders.tsx` OrderForm handleSubmit: upload file to blob storage first, include URL as text field, submit JSON to web3forms
- `Quote.tsx` handleSubmit: same approach

### Remove
- FormData/multipart usage in all order form submissions

## Implementation Plan
1. Create uploadArtwork utility using StorageClient
2. Update SmallOrders handleSubmit to use JSON submission with artwork URL
3. Update Quote handleSubmit to use JSON submission with artwork URL
