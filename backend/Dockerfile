# Use the official Python runtime as a parent image
FROM python:3.10-slim
# Set the working directory
WORKDIR /app
# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
# Copy requirements file
COPY requirements.txt .
# Install dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt
# Copy the rest of the application code
COPY . .
# Expose the port
EXPOSE 8000
# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
    