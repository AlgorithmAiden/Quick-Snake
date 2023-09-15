//setup the canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

/**make the canvas always fill the screen**/;
(function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.onresize = resize
})()
//for this code (as in code before this line), I almost always use the same stuff, so its going to stay here

//define the grid size
let gx = 25
let gy = 25

let bx = canvas.width / gx
let by = canvas.height / gy

//create the apple
let apple = []

function resetApple() {
    apple[0] = Math.floor(Math.random() * gx)
    apple[1] = Math.floor(Math.random() * gy)
}
//and reset it
resetApple()

//create the snake
let snake = [[Math.round(gx / 2), Math.round(gy / 2)]]

//0=up,1=right,2=down,3=left
let direction = Math.floor(Math.random() * 4)

//listen for keys
document.addEventListener('keydown', e => {
    const key = e.key
    if (key == 'ArrowUp') direction = 0
    if (key == 'ArrowRight') direction = 1
    if (key == 'ArrowDown') direction = 2
    if (key == 'ArrowLeft') direction = 3
})

//the logic loop
const ups = 10
setInterval(() => {

    //move sometimes
    let move = true

    //check for apple eating
    let hit = false
    for (let block of snake)
        if (block[0] == apple[0] && block[1] == apple[1])
            hit = true

    //this will be changed to run if it would hit an apple next run
    if (hit) {
        move = false
        snake.unshift([...snake[0]])
        if (direction == 0) snake[0][1]--
        if (direction == 1) snake[0][0]++
        if (direction == 2) snake[0][1]++
        if (direction == 3) snake[0][0]--
        resetApple()
    }

    if (move) {
        //now to move the snake
        let last = [...snake[0]]
        if (direction == 0) snake[0][1]--
        if (direction == 1) snake[0][0]++
        if (direction == 2) snake[0][1]++
        if (direction == 3) snake[0][0]--
        for (let index = 1; index < snake.length; index++) {
            ;
            [snake[index], last] = [last, [...snake[index]]]
        }

    }
    //check for self hits
    hit = false
    for (let index = 0; index < snake.length - 1; index++) {
        for (let subIndex = index + 1; subIndex < snake.length; subIndex++) {
            const a = snake[index]
            const b = snake[subIndex]
            if (a[0] == b[0] && a[1] == b[1]) hit = true
        }
    }
    if (hit) navigation.reload()

    //now to check if the snake goes off the screen
    for (let block of snake)
        if (block[0] < 0 || block[1] < 0 || block[0] >= gx || block[1] >= gy[1])
            navigation.reload()

}, 1000 / ups)
    ;
(function render() {

    //clear the screen
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, gx * by, gy * by)

    //draw the snake
    ctx.fillStyle = 'rgb(0,255,0)'
    for (let block of snake) {
        ctx.fillRect(block[0] * bx, block[1] * by, bx, by)
    }

    //draw the apple
    ctx.fillStyle = 'rgb(255,0,0)'
    ctx.fillRect(apple[0] * bx, apple[1] * by, bx, by)

    requestAnimationFrame(render)
})()
