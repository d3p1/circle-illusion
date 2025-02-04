/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class App {
  /**
   * @type {number}
   */
  count

  /**
   * @type {HTMLCanvasElement}
   */
  canvas

  /**
   * @type {CanvasRenderingContext2D}
   */
  context

  /**
   * Constructor
   *
   * @param {number} count
   */
  constructor(count = 20) {
    this.count = count

    this.#initCanvas()
  }

  /**
   * Run
   *
   * @param   {number} t
   * @returns {void}
   */
  run(t = 0) {
    const sec = t * 0.001

    this.context.clearRect(0,0, this.canvas.width, this.canvas.height)

    this.context.save()
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
    for (let i = 0; i < this.count; i++) {
      const offset = i * ((3 * Math.PI) / this.count)
      const y = Math.sin(offset + sec) * (this.canvas.height / 2)
      this.context.rotate(Math.PI / this.count)
      this.#drawCircle(0, y)
    }
    this.context.restore()

    requestAnimationFrame(this.run.bind(this))
  }

  /**
   * Draw circle
   *
   * @param   {number} x
   * @param   {number} y
   * @param   {number} radius
   * @returns {void}
   */
  #drawCircle(x, y, radius = 20) {
    this.context.beginPath()
    this.context.arc(x, y, radius, 0, 2 * Math.PI)
    this.context.fill()
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas() {
    this.canvas = document.createElement('canvas')
    this.#resizeCanvas()
    window.addEventListener('resize', this.#resizeCanvas.bind(this))
    document.body.append(this.canvas)

    this.context = this.canvas.getContext('2d')
  }

  /**
   * Resize canvas
   *
   * @returns {void}
   */
  #resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}