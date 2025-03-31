#Docker File criado com a ajuda do chatGPT
# Usa uma imagem leve do Nginx para servir arquivos estáticos
FROM nginx:alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do seu projeto para a pasta do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx (já é o default do container, então pode até omitir)
CMD ["nginx", "-g", "daemon off;"]
