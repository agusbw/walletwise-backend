# Gunakan image resmi Node.js versi LTS sebagai base image
FROM node:alpine as base

# Install pnpm
RUN npm install -g pnpm

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies menggunakan pnpm
RUN pnpm install

# Salin seluruh kode sumber aplikasi
COPY . .

# Build aplikasi
RUN pnpm build

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Command untuk menjalankan aplikasi saat container dijalankan
CMD ["pnpm", "start"]
