let encendida = false;
let tirando = false;
let cuerdaY = 165;
let intensidadLuz = 0;

let colorLuz;
let colorDestino;

let formulario;
let email;
let contrasena;

function setup() {
    document.body.classList.add("login-lampara");
    createCanvas(windowWidth, windowHeight);

    colorLuz = color(230, 174, 80);
    colorDestino = color(230, 174, 80);

    crearFormulario();
    formulario.hide();
}

function draw() {
    // Cambia el color de la luz gradualmente
    colorLuz = lerpColor(colorLuz, colorDestino, 0.035);
    intensidadLuz = lerp(intensidadLuz, encendida ? 1 : 0, 0.035);

    // Fondo oscuro
    background(24, 30, 28);

    const centroX = width / 2;
    const centroY = height / 2;

    const escala = min(width / 800, height / 500, 1);
    const lamparaX = centroX - 400 * escala;
    const lamparaY = centroY - 200 * escala;

    // Resplandor sobre el fondo
    if (intensidadLuz > 0.001) {
        const contexto = drawingContext;

        const degradado = contexto.createRadialGradient(
            lamparaX + 220 * escala,
            lamparaY + 110 * escala,
            0,
            lamparaX + 220 * escala,
            lamparaY + 110 * escala,
            max(width, height) * 0.9
        );

        degradado.addColorStop(
            0,
            `rgba(${red(colorLuz)}, ${green(colorLuz)}, ${blue(colorLuz)}, ${0.25 * intensidadLuz})`
        );

        degradado.addColorStop(
            1,
            `rgba(${red(colorLuz)}, ${green(colorLuz)}, ${blue(colorLuz)}, ${0.015 * intensidadLuz})`
        );

        contexto.fillStyle = degradado;
        contexto.fillRect(0, 0, width, height);

        // Haz de luz orientado hacia el formulario
        const origenX = lamparaX + 220 * escala;
        const origenY = lamparaY + 105 * escala;
        const haz = contexto.createLinearGradient(origenX, origenY, centroX + 260 * escala, centroY + 100 * escala);
        haz.addColorStop(0, `rgba(${red(colorLuz)}, ${green(colorLuz)}, ${blue(colorLuz)}, ${0.23 * intensidadLuz})`);
        haz.addColorStop(1, `rgba(${red(colorLuz)}, ${green(colorLuz)}, ${blue(colorLuz)}, 0)`);
        contexto.save();
        contexto.filter = `blur(${45 * escala}px)`;
        contexto.beginPath();
        contexto.moveTo(origenX, origenY);
        contexto.lineTo(centroX + 430 * escala, centroY - 180 * escala);
        contexto.lineTo(centroX + 430 * escala, centroY + 300 * escala);
        contexto.closePath();
        contexto.fillStyle = haz;
        contexto.fill();
        contexto.restore();
    }

    // Coloca y dibuja la lámpara
    push();
    translate(lamparaX, lamparaY);
    scale(escala);
    dibujarLampara();
    pop();

    // Sitúa el formulario a la derecha
    if (encendida) {
        formulario.position(
            centroX + 40 * escala,
            centroY - 150
        );
    }
}

function dibujarLampara() {
    // Base
    fill(45);
    stroke(12);
    strokeWeight(2);
    ellipse(180, 350, 150, 25);

    // Brazo
    stroke(170);
    strokeWeight(8);
    line(180, 345, 145, 200);
    line(145, 200, 205, 90);

    // Pantalla
    stroke(15);
    strokeWeight(2);
    fill(55);
    arc(220, 100, 120, 100, PI, TWO_PI, CHORD);

    // Bombilla
    noStroke();

    if (encendida) {
        fill(colorLuz);
    } else {
        fill(90);
    }

    ellipse(220, 100, 35, 12);

    // Cuerda
    stroke(230, 200, 130);
    strokeWeight(2);
    line(220, 100, 220, cuerdaY);

    // Halo de la bolita
    if (encendida) {
        noStroke();

        fill(
            red(colorLuz),
            green(colorLuz),
            blue(colorLuz),
            35
        );
        circle(220, cuerdaY, 38);

        fill(
            red(colorLuz),
            green(colorLuz),
            blue(colorLuz),
            80
        );
        circle(220, cuerdaY, 26);
    }

    // Bolita dorada
    noStroke();
    fill(230, 200, 130);
    circle(220, cuerdaY, 14);

}

function crearFormulario() {
    // Usamos los elementos que ya existen en login.ejs
    formulario = select(".loginContainer");
    email = select("#email");
    contrasena = select("#password");

    // La luz cambia al seleccionar cada campo
    email.elt.addEventListener("focus", () => {
        colorDestino = color(48, 205, 207);
    });

    contrasena.elt.addEventListener("focus", () => {
        colorDestino = color(70, 190, 125);
    });
}

function estiloCampo(campo) {
    campo.style("display", "block");
    campo.style("width", "100%");
    campo.style("box-sizing", "border-box");
    campo.style("padding", "10px");
    campo.style("margin", "8px 0 20px");
    campo.style("border", "1px solid #69766e");
    campo.style("border-radius", "5px");
    campo.style("background", "#1c2520");
    campo.style("color", "white");
}

function mousePressed() {
    const escala = min(width / 800, height / 500, 1);
    const lamparaX = width / 2 - 400 * escala;
    const lamparaY = height / 2 - 200 * escala;

    const bolitaX = lamparaX + 220 * escala;
    const bolitaY = lamparaY + cuerdaY * escala;

    if (dist(mouseX, mouseY, bolitaX, bolitaY) < 25 * escala) {
        tirando = true;
    }
}

function mouseDragged() {
    if (tirando) {
        const escala = min(width / 800, height / 500, 1);
        const lamparaY = height / 2 - 200 * escala;

        cuerdaY = constrain(
            (mouseY - lamparaY) / escala,
            165,
            200
        );
    }
}

function mouseReleased() {
    if (tirando) {
        if (cuerdaY > 185) {
            encendida = !encendida;

            if (encendida) {
                colorLuz = color(230, 174, 80);
                colorDestino = color(230, 174, 80);
                formulario.show();
            } else {
                formulario.hide();
            }
        }

        cuerdaY = 165;
        tirando = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}