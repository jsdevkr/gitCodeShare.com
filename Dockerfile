FROM node:10-alpine

# Source https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
# Installs latest Chromium package.
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN apk update && apk upgrade && \
      echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
      echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
      apk add --update ca-certificates && \
      apk add --no-cache \
      ttf-freefont \
      chromium@edge \
      nss@edge \
      harfbuzz@edge

# Help prevent zombie chrome processes
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Default fonts
ENV NOTO_KR="https://github.com/googlei18n/noto-cjk/raw/master/NotoSansKR-Regular.otf" \
      NOTO_JP="https://github.com/googlei18n/noto-cjk/raw/master/NotoSansJP-Regular.otf"
RUN apk --no-cache add \
      fontconfig \
      wget \
      && mkdir -p /usr/share/fonts \
      # && wget -qO- "${SCP_URL}" | tar xz -C /usr/share/fonts \
      && wget -q "${NOTO_KR}" -P /usr/share/fonts \
      && wget -q "${NOTO_JP}" -P /usr/share/fonts \
      && fc-cache -fv

# Set language to UTF8
ENV LANG="C.UTF-8"

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

# Change dns (because error: getaddrinfo EAI_AGAIN)
CMD echo "nameserver 1.1.1.1" > /etc/resolv.conf && \
      npm start
