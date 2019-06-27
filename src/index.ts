const isGoodAttitude = (attitude: string) => attitude === 'good'
const isJediColor = (color: string) => color === 'blue' || color === 'green'
const getSection = (name: string) => document.querySelector(`[data-section="${name}"]`)
const domNodesToArray = (nodes: NodeListOf<HTMLInputElement>) => Array.prototype.slice.call(nodes)

const updateView = () => {
    const attitude = state.getValue('attitude')
    const color = state.getValue('color')
    const isAttitudeSelected = !!attitude
    const isColorSelected = !!color
    const colorSection = getSection('color') as HTMLElement
    const lightsaber = document.querySelector('.lightsaber') as HTMLElement
    const lightsaberLight = document.querySelector('.lightsaber__light')
    const lightsaberPossibleClasses = [
        'lightsaber__light--red',
        'lightsaber__light--blue',
        'lightsaber__light--green',
        'lightsaber__light--purple',
    ]

    colorSection.hidden = !isAttitudeSelected
    lightsaber.hidden = !isColorSelected

    document.querySelectorAll('input[name="color"]').forEach((input: HTMLInputElement) => {
        input.parentElement.hidden = (
            !isJediColor(input.value) && isGoodAttitude(attitude) ||
            isJediColor(input.value) && !isGoodAttitude(attitude)
        )
    })

    lightsaberLight.classList.remove(...lightsaberPossibleClasses)
    lightsaberLight.classList.toggle(`lightsaber__light--${color}`)
}

const state = {
    reactToInputChange(name: string, value: string) {
        this[name] = value
        updateView()
    },
    getValue(key: string) {
        return this[key]
    }
}

const handleInputChange = (event: Event) => {
    const {name, value} = event.target as HTMLInputElement
    state.reactToInputChange(name, value)
}

const bindInputs = () => {
    const inputs = document.querySelectorAll('input')

    if (!inputs) {
        return
    }

    domNodesToArray(inputs).forEach((input: HTMLInputElement) => {
        input.addEventListener('change', handleInputChange)
    })
}

bindInputs()
updateView()
