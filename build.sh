set -o errexit

yarn
yarn build
yarn typeorm migration:run -d dist/src/data-source