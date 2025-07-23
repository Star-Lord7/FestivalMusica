import { src, dest, watch, series } from 'gulp'; // Importaciones desde la dependencia de GULP
import * as dartSass from 'sass'; // Importaciones desde la dependencia SASS
import gulpSass from 'gulp-sass'; // Importaciones desde la dependencia GULP-SASS

/* Inicializa el compilador SASS poniendo en marcha la dependencia de gulp-sass con "dartSass" */
const sass = gulpSass(dartSass);

/* Función para compilar JS y generar el archivo JS */
export function js(done){
    src('src/js/app.js') // Le pasamos la ruta del archivo a compilar
        .pipe(dest('build/js')) // Y luego le pasamos la ruta donde se guardara el archivo JS

    done() // Parametro para indicarle que la función a terminado
}

/* Función para compilar SASS y generar el archivo CSS */
export function css(done){
    src('src/scss/app.scss', { sourcemaps: true }) // Le pasamos la ruta del archivo a compilar
        .pipe( sass().on('error', sass.logError) ) // "pipe" se usa para llamar SASS y se usa el método "on" para manejar errores
        .pipe( dest('build/css', { sourcemaps: '.' }) ) // Y luego le pasamos la ruta donde se guardara el archivo CSS y generamos el mapa de origen
    done() // Parametro para indicarle que la función a terminado
}

/* Función para el entorno de desarrollo en donde se observa cambios en los archivos
para no tener que estar ejecutando el comando de compilación manualmente */
export function dev(){
    watch('src/scss/**/*.scss', css) // "watch" se usa para observar cambios en los archivos
    // y ejecutar la función "css" cada vez que se detecte un cambio. 
    // Los asteriscos se usan para indicar que se actualizaran todos los archivos de todas las carpetas
    watch('src/js/**/*.js', js) // Observa cambios en los archivos JS y ejecuta la función "js"
}

export default series(js, css, dev); // Exportamos las funciones para que se puedan ejecutar en la terminal