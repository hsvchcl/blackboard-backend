import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Prefijo global (opcional)
  app.setGlobalPrefix('api');

  // Habilitar versionado de API
  app.enableVersioning({
    type: VersioningType.URI, // Usa /v1, /v2, etc.
  });

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setContact('Hans Vergara', '#', 'hans.vergara.cl@gmail.com')
    .setDescription(
      'Encuentra, crea, actualiza y elimina productos con nuestra API',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000).then(() => {
    Logger.log(
      `Server running on http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap();
