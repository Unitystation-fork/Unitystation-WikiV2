FROM node:20-alpine AS build
WORKDIR /usr/src/app

# npm ci (pas npm install) : plus rapide et déterministe, s'appuie sur
# package-lock.json déjà verrouillé au lieu de re-résoudre les versions.
COPY package*.json ./
RUN npm ci

COPY . .

# --max-old-space-size sous la RAM réelle du VPS (1 vCPU/2GB, partagé avec
# 13 autres conteneurs) : force V8 à garbage-collecter plus tôt plutôt que
# de laisser le kernel OOM-killer intervenir brutalement en pleine
# compilation webpack.
RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

# static/img/ (67MB) est copié intégralement par Docusaurus dans le
# dossier de sortie de CHAQUE locale (comportement natif de
# staticDirectories, pas un bug applicatif) : build/img, build/fr/img,
# build/ru/img, build/de/img sont 4 copies identiques. On ne garde que la
# copie racine et on remplace les 3 autres par des liens symboliques —
# busybox httpd les suit nativement (vérifié), le contenu servi est
# identique, seule la taille de l'image finale change (~268MB -> ~67MB
# pour les images).
RUN for l in fr ru de; do \
      if [ -d "build/$l/img" ]; then \
        rm -rf "build/$l/img" && ln -s ../img "build/$l/img"; \
      fi; \
    done

# Deployment step
# Ce stage n'est jamais publié (multi-stage) : il ne sert qu'à builder,
# node:20-alpine réduit juste l'empreinte disque pendant le build (pas
# d'effet sur l'image finale, déjà minimale via busybox ci-dessous).

FROM busybox:1.36 AS deploy

RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=build /usr/src/app/build/ ./

EXPOSE 3000

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
