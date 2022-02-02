FROM python:slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
RUN mkdir /back
WORKDIR /back
COPY requirements.txt /back/
RUN pip install -r requirements.txt --no-cache-dir --disable-pip-version-check
COPY . /back/
EXPOSE 80
CMD ["gunicorn","pis6.wsgi:application","--bind","0.0.0.0:80", "--workers=1", "--log-level=DEBUG"]