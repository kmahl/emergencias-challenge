Se necesita crear una API RESTful para una "agenda de contactos". Donde cada contacto de
la agenda puede tener varios teléfonos asociados y varias direcciones. El siguiente esquema
es el modelo entidad-relación de la base de datos:

Al esquema anteriormente mencionado, debe agregarse la tabla “ContactActivities”, dicha
tabla registra las diversas actividades realizadas por o sobre los contactos, como llamadas,
reuniones o emails enviados.
Debe contar con las siguientes columnas:
• id: Identificador único de la actividad (Primary Key).
• personId: Foreign key referenciando la tabla Person (id)
• activityType: Tipo de actividad realizada (VARCHAR, no nulo, con únicamente estas tres
posibilidades ['call', 'meeting', 'email']).
• activityDate: Fecha y hora en que se realizó la actividad (TEXT, no nulo).
• description: Descripción de la actividad (TEXT, opcional).
La solución debe construirse en NodeJs con TypeScript, SQLite como base de datos, utilizando
Git como gestor de versiones, y subirse a un servicio de alojamiento gratuito como GitHub o
GitLab.

Las operaciones deseadas son:
• Creación de un contacto.
• Búsqueda de contacto por email.
• Búsqueda de contactos por datos personales.
• Búsqueda de contacto por número y tipo de teléfono.
• Edición de los datos personales de un contacto.
• Eliminación de un contacto.
• Creación de una actividad.
• Búsqueda de actividades por contacto y tipo de actividad específico. Retornando
detalles del contacto (nombre, apellido, email y fecha de nacimiento).
Es importante el buen uso de los verbos HTTP, y sus correctas respuestas de los status code.

Especificidades técnicas
• Realizarlo con NodeJS. Se puede utilizar frameworks de NodeJs.
• SQLite como motor de base de datos.
• El código debe estar completamente escrito en TypeScript y tipado.
• Uso correcto de los verbos HTTP y status code de respuestas.
Plus
• Documentación de la API con por ejemplo Swagger.
• Test unitarios con Jest o similar.
• Configuración de linter para controlar la estandarización del código.
Se evaluará
• Escritura de código limpio y buenas prácticas.
• Arquitectura.
• Patrones de diseño.