//円オブジェクト
class Elps {
    constructor(x, y, dia) {
        this.dia = dia;
        this.x = x;
        this.y = y;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.dia, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
        context.strokeStyle = 'rgba(255, 0, 0, 1)';
        context.lineWidth = 3;
        context.closePath();
        context.stroke();
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    delete() {
        //this.context.save()
        context.clearRect(this.x - this.dia / 2 - 12, this.y - this.dia / 2 - 12, this.dia + 25, this.dia + 25);
    }
}

//ユーザーが描く線のオブジェクト
class DragLines {
    constructor(context) {
        this.context = context
        this.isDrag = false;
    }

    draw(sx, sy, ex, ey) {
        this.context.save();
        this.context.lineCap = 'round';
        this.context.lineWidth = "3";
        this.context.strokeStyle = "blue";

        this.context.beginPath();
        this.context.moveTo(sx, sy);
        this.context.lineTo(ex, ey);
        this.context.stroke();

        this.context.restore();
    }

}

//grobal propatyes
const dia = 20;
const start_elps = new Elps(160, 190, dia);
const end_elps = new Elps(300, 190, dia);
const canvas = document.getElementById('draw_area');
const context = canvas.getContext('2d');
const drag_line = new DragLines(context);
const draw_text = document.getElementById('draw_text');
let complete = [false, false, false, false, false,];

//other functions
function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function draw_line() {
    canvas.addEventListener('mouseout', e => {
        drag_line.isDrag = false;
    });

    canvas.addEventListener('mouseup', e => {
        console.log('mouse released')
        drag_line.isDrag = false;
    });

    canvas.addEventListener('mousedown', e => {
        drag_line.isDrag = true;
    })

    canvas.addEventListener('mousemove', e => {
        const downX = e.offsetX;
        const downY = e.offsetY;

        let prex = downX;
        let prey = downY;

        if (drag_line.isDrag === true) {
            drag_line.draw(prex, prey, downX, downY);
            prex = downX;
            prey = downY;
        } else {
            return;
        }
    });
}

function next_elps(sx, sy, ex, ey) {
    canvas.addEventListener('mousemove', e => {
        while (drag_line.isDrag === true) {
            while(dist(e.offsetX, e.offsetY, end_elps.x, end_elps.y) > dia / 2) {
                console.log('not hit!!');
            }
            start_elps.delete();
            end_elps.delete();
            start_elps.move(sx, sy);
            end_elps.move(ex, ey);
            start_elps.draw(context);
            end_elps.draw(context);
        }
    });
}


function next(sx, sy, ex, ey) {
    while(end)
    next_elps(sx, sy, ex, ey)
}

function loop() {
    window.requestAnimationFrame(loop)
    draw_line();

    start_elps.draw(context);
    end_elps.draw(context);
    //あ
    next_elps(210, 190, 210, 300);
    console.log('1st end')
    next_elps(290, 210, 270, 320);
    //い
    if (complete[0] === true) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw_text.textContent = 'い';
    }
    //う
    //え
    //お
    console.log(drag_line.isDrag)
}

window.addEventListener('load', loop, false);