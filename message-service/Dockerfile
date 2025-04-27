FROM debian:latest
RUN adduser app-user
WORKDIR /tmp
RUN apt-get update && \
    apt-get install -y \
    ca-certificates \
    curl \
    gnupg2 \
    lsb-release \
    wget \
    && wget https://download.java.net/java/GA/jdk21/fd2272bbf8e04c3dbaee13770090416c/35/GPL/openjdk-21_linux-x64_bin.tar.gz \
    && mkdir -p /opt/openjdk-21 \
    && tar -xzf openjdk-21_linux-x64_bin.tar.gz -C /opt/openjdk-21 --strip-components=1 \
    && chmod -R +x /opt/openjdk-21/bin/* \
    && chown -R app-user:app-user /opt/openjdk-21 \
    && rm -f ./* \
    && apt-get clean
USER app-user
ENV JAVA_HOME=/opt/openjdk-21
ENV PATH=$JAVA_HOME/bin:$PATH
RUN java -version
WORKDIR /home/app-user
COPY target/message-service-1.0-SNAPSHOT.jar message-service-1.0-SNAPSHOT.jar
EXPOSE 8081/tcp
CMD ["java", "-Xmx512m", "-server", "-Djava.awt.headless=true", "-Duser.timezone=Asia/Colombo", "-jar", "message-service-1.0-SNAPSHOT.jar"]
