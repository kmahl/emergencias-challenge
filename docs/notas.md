## Cosas que mejoraria
- Normalizar las localidades
- Implementar middleware de seguridad, ya sea validando por api-key, jwt o alguna otra estrategia dependiendo de como se va a usar el servicio
- Implementar rate limits en endpoints criticos publicos
- Configurar cors
- Por temas de tiempo del challenge deje las respuestas crudas, puede mejorarlas solo devolviendo lo necesario.
- Mejorar la obsevabilidad
- Sumar logs de auditoria
- Puntos para generar metricas en DD por ejemplo
- Alertas
- Armar los casos de test y branches faltantes.

## Decisiones tomadas
- Iba a crear una funcion de busqueda para cada uno de los requisitos, pero preferí cambiarlo a una busqueda general tipo query de todos los campos (como para aplicarlo en una barra de busqueda global) y de opcionales parametros especficos para cada campo y así cumplir con el requisito de busqueda.
- Solo arme algunos casos de test a modo de demo
- Utilice repository + service pattern ya que es un proyecto chico y queda ordenado
- Sume una libreria para validar la firma de los request (zod)
- Cambie en la query los nombres de los campos number por phone y typeName por phoneType para mayor claridad en los queryparams


## Notas
- Puede que salte un warning en el esquema de prima tipo "The datasource property `url` is no longer supported in schema files." si tienen el plugin de intelliSense de prisma en la ultima versiona ya que prima 7 salio estos días y yo aun prefiero usar la v6
