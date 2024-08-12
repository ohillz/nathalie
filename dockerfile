FROM python:3.12-alpine3.20

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"]