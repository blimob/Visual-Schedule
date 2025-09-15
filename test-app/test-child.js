import { Child } from '../src/Child.js'

const child = new Child('Test Child', 6)
console.log('Child created:', child.name)
console.log('Add activity test:', child.addActivity({ name: 'Test', startTime: '08:00', endTime: '08:30' }))
