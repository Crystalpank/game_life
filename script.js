let canvas = document.getElementById('c1');
let ctx = canvas.getContext('2d');
let mas = [];
let masEnd = [];
let size = 600;
let count = 0;
let timer;

canvas.onclick = function(event) {
    let x = Math.floor(event.offsetX / 10);
    let y = Math.floor(event.offsetY / 10);
    mas[y][x] = 1;
    drawField();
};

function goLife() {
    for (let i = 0; i < size; i++) {
        mas[i] = [];
        for (let j = 0; j < size; j++) {
            mas[i][j] = 0;
        }
    }
}
goLife();

function drawField() {
    ctx.clearRect(0, 0, size, size);
    for (let i = 0; i < size / 10; i++) {
        for (let j = 0; j < size / 10; j++) {
            if (mas[i][j] == 1) {
                ctx.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }
}

function startLife() {
    let mas2 = [];
    for (let i = 0; i < size / 10; i++) {
        mas2[i] = [];
        for (let j = 0; j < size / 10; j++) {
            let neighbors = 0;
            if (mas[fpm(i) - 1][j] == 1) neighbors++; //up
            if (mas[i][fpp(j) + 1] == 1) neighbors++; //right
            if (mas[fpp(i) + 1][j] == 1) neighbors++; //down
            if (mas[i][fpm(j) - 1] == 1) neighbors++; //left
            if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
            if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
            if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
            if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;

            // (neighbors == 2 || neighbors == 3) ? mas2[i][j] = 1 : mas2[i][j] = 0;
            if ((mas[i][j] == 1 && neighbors == 2 || neighbors == 3) || (mas[i][j] == 0 && neighbors == 3)) {
                mas2[i][j] = 1;
            } else {
                mas2[i][j] = 0;
            }
        }
    }
    if (compare(mas, mas2) || compare(mas2, masEnd)) {
        alert('Игра окончена!');
    } else {
        masEnd = mas;
        mas = mas2;
        drawField();
        count++;
        document.getElementById('count').innerHTML = count;
        if (document.getElementsByName('choose')[0].checked) {
            //
        } else {
            timer = setTimeout(startLife, 100);
        }
    }
}

function fpm(i) {
    if (i == 0) return 60;
    else return i;
}

function fpp(i) {
    if (i == 59) return -1;
    else return i;
}
document.getElementById('start').onclick = startLife;

function compare(a1, a2) {
    return a1.every((v, i) => v === a2[i]);
}