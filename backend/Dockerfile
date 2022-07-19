FROM python:3.10.5

WORKDIR /app

EXPOSE 8000

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app"]