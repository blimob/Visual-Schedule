import { Child } from '../src/Child.js'

console.log('=== CHILD NAME & AGE TEST ===\n')

// Test 1: Valid child
console.log('🧒 Test 1: Valid child')
try {
  const child1 = new Child('Anna', 6)
  console.log('   Name:', child1.name)
  console.log('   Age:', child1.age)
  console.log('   ID:', child1.id)
  console.log('   Created:', child1.createdAt)
} catch (error) {
  console.log('❌ Fel:', error.message)
}
console.log()