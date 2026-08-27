FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY shell/package.json shell/package.json
COPY boards/package.json boards/package.json
COPY reports/package.json reports/package.json
COPY settings/package.json settings/package.json
COPY libs libs
RUN npm ci

COPY . .

# shell:serve-static builds shell + all 3 remotes, then serves shell on 4200
# and proxies each remote's own port (module federation resolves remotes
# to http://localhost:<port> at build time, so all 4 ports must stay together).
EXPOSE 4200 4201 4202 4203
CMD ["npx", "nx", "run", "shell:serve-static:production"]
