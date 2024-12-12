# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port 4000 (or whatever port your backend uses)
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
