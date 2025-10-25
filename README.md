### Escuela Colombiana de Ingeniería
### Arquiecturas de Software

---

### Juan David Zambrano Gonzalez

---

# Tutorial Spring.io, Websockets, ReactJs-18, P5.js,AWS: buenas prácticas de Diseño

> Vamos ahora a construir una aplicación interactiva en tiempo real usando una buena estrategia de diseño. Para esto vamos a construir una aplicación que permite dibujar de manera colaborativa en tiempo real.

> La aplicación soporta múltiples clientes. La comunicación es en tiempo real. 

## Arquitectura

> Queremos construir una aplicación web con comunicación bidirectional entre el
cliente y el servidor. Los clientes inician su dibujo y se puede diferenciar su trazo
del trazo de los clientes remotos.
La arquitectura usará ReactJs del lado del cliente y Spring.io del lado del servidor.
En le taller le mostraremos cómo construir una arquitectura escalable y entendible
usando estos elementos.


![alt text](<img/image copy 3.png>)

## ***1. Crear una aplicación java básica usando maven.***

> mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4


![alt text](img/image.png)


## 2. ***Actualizar el pom para utilizar la configuración web-MVC de spring boot.*** 

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>edu.eci</groupId>
  <artifactId>websockets</artifactId>
  <version>1.0-SNAPSHOT</version>

  <name>websockets</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>


    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>3.1.1</version>
    </dependency>

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-websocket</artifactId>
      <version>3.1.1</version>
    </dependency>

  </dependencies>

  <build>
      <plugins>

        <plugin>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>

      </plugins>  
  </build>
</project>
```

## 3. ***Cree la siguiente clase que iniciará el servidor de aplicaciones de Spring.***

```java
package edu.eci;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class BBAppStarter {
    public static void main(String[] args){
    SpringApplication.run(BBAppStarter.class,args);
    }
}
```

## 4. ***Cree un controlador Web que le permitirá cargar la configuración mínima Web-MVC.***

```java
package edu.eci.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class DrawingServiceController {
    @RequestMapping(
    value = "/status",
    method = RequestMethod.GET,
    produces = "application/json"
    )
    public String status() {
        return "{\"status\":\"Greetings from Spring Boot. "
        + java.time.LocalDate.now() + ", "
        + java.time.LocalTime.now()
        + ". " + "The server is Runnig!\"}";
    }
}
```

### 1. ***Cree un index html en la siguiente localización: /src/main/resources/static***
### 2. ***Corra la clase que acabamos de crear y su servidor debe iniciar la ejecución***
### 3. ***Verifique que se esté ejecutando accediendo a:***

> ### localhost:8080/status

![alt text](<img/image copy 2.png>)

> ### localhost:8080/index.html

![alt text](<img/image copy.png>)

