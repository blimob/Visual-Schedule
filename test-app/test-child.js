import { Child } from '../src/Child.js'

console.log('=== CHILD NAME & AGE TEST ===\n')

// Test 1: Valid child
console.log('🧒 Test 1: Valid child')
try {
  const child1 = new Child('Anna', 6)
  console.log('   Name:', child1.name)
  console.log('   Age:', child1.age)
  console.log('   ID:', child1.id)
} catch (error) {
  console.log('❌ Wrong:', error.message)
}
console.log()

// Test 2: Invalid name
console.log('🧒 Test 2: Invalid name')
try {
  const child2 = new Child('', 5)
  console.log('   Name:', child2.name)
  console.log('   Age:', child2.age)
  console.log('   ID:', child2.id)
} catch (error) {
  console.log('❌ Wrong:', error.message)
}
console.log()