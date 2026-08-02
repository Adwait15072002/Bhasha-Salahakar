#!/bin/bash
set -euo pipefail

BUCKET="${S3_BUCKET:?S3_BUCKET required}"
DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:?CLOUDFRONT_DISTRIBUTION_ID required}"

npm ci
npm run build
aws s3 sync dist/ "s3://${BUCKET}/" --delete
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
