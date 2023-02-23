// disables the right click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

// disable the scroll page
document.addEventListener('wheel', (e) => {
  e.preventDefault()
})

const game = document.getElementById('game')

// make the canvas full screen
const app = new PIXI.Application(
  {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1
  }
)

// add the canvas to the html
game.appendChild(app.view)

// make the canvas responsive
const container = new PIXI.Container()

// add the container to the canvas
app.stage.addChild(container)

// make the box
const box = new PIXI.Graphics()
box.beginFill(0x000000)
box.drawRect(0, 0, 10, 10)
box.endFill()

// adiciona o box no container
container.addChild(box)

// grid
const grid = new PIXI.Graphics()
grid.interactive = true

const size = 70
const gap = 2

for (let i = 0; i < 700; i += size + gap) {
  for (let j = 0; j < 700; j += size + gap) {
    grid.beginFill(0x000000)
    grid.drawRect(i, j, size, size)
    grid.endFill()
    container.addChild(grid)
  }
}

// cria um sprite com a imagem 01.png mudando o tamanho para 70x70
const sprite = PIXI.Sprite.from('01.png')
sprite.width = 70
sprite.height = 70
sprite.interactive = true
sprite.buttonMode = true
sprite.anchor.set(0.5, 0.5)
sprite.x = 70 * 5 / 2
sprite.y = 70 * 5 / 2

// adiciona o sprite no container
container.addChild(sprite)

// adiciona o evento de click esquerdo para movere o sprite
// deverá ser acionado se o mouse estiver sobre o sprite

// create viewport and set to center
const viewport = new PIXI.Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,

  interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
})

viewport.interactive = true

// verifica se apertou alt + d
document.addEventListener('keydown', (e) => {
  if (e.key == 'c') {
    viewport.moveCenter(500, 500)
  }
})

// add the viewport to the stage
app.stage.addChild(viewport)

// activate plugins
viewport.drag(
  {
    mouseButtons: 'right',
    wheel: true,
    wheelScroll: 10,
    reverse: true,
    underflow: 'center'
  }
).pinch().wheel(
  {
    percent: 0.1,
    smooth: 5

  }
).decelerate()

// limita o zoom out
viewport.on('zoomed', (e) => {
  if (viewport.scale.x < 0.5) {
    viewport.scale.x = 0.5
    viewport.scale.y = 0.5
  }
})

// adiciona o container no viewport
viewport.addChild(container)

let player_cliked = false

sprite.on('pointerdown', (e) => {
  if (e.data.button == 0) {
    player_cliked = true
    // cria uma borda vermelha no sprite
    const border = new PIXI.Graphics()
    border.lineStyle(2, 0xFF0000)
    border.drawRect(sprite.x - sprite.width / 2, sprite.y - sprite.height / 2, sprite.width, sprite.height)
    sprite.parent.addChild(border)
  }
})

grid.on('pointerdown', (e) => {
  if (e.data.button == 0) {
    if (player_cliked) {
      sprite.position.copyFrom(viewport.toWorld(e.data.global))
      player_cliked = false
      // remove a borda vermelha do sprite
      sprite.parent.removeChild(sprite.parent.children[sprite.parent.children.length - 1])
    }
  }
})
