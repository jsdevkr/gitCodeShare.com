FROM node:9-alpine

# Source https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
# Installs latest Chromium package.
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN apk update && apk upgrade && \
      echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
      echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
      apk add --no-cache \
      chromium@edge \
      nss@edge \
      freetype@edge \
      harfbuzz@edge

# Default fonts
# && wget -qO- "${SCP_URL}" | tar xz -C /usr/share/fonts \
RUN apk --no-cache add \
      fontconfig \
      wget \
      && mkdir -p /usr/share/fonts \
      && wget -q "https://github.com/googlei18n/noto-cjk/raw/master/NotoSansKR-Regular.otf" -P /usr/share/fonts \
      && wget -q "https://github.com/googlei18n/noto-cjk/raw/master/NotoSansJP-Regular.otf" -P /usr/share/fonts \
      && fc-cache -fv

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install

COPY . .

RUN npm run build

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
      && mkdir -p /home/pptruser/Downloads \
      && chown -R pptruser:pptruser /home/pptruser \
      && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

ENV NODE_ENV production
EXPOSE 3000
CMD [ "npm", "start" ]
