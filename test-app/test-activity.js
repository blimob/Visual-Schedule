import { Activity } from '../src/Activity.js'

console.log("=== TESTAR ACTIVITY KLASS ===\n")

// Test 1: Skapa aktivitet
console.log("Test 1: Skapa aktivitet")
try {
  const frukost = new Activity("Frukost", "08:00", "08:30")
  console.log(`✅ Namn: ${frukost.name}`)
  console.log(`✅ Tid: ${frukost.startTime} - ${frukost.endTime}`)
  console.log(`✅ Varaktighet: ${frukost.duration} minuter`)
  console.log(`✅ Färg: ${frukost.visual.color}`)
  console.log(`✅ Ikon: ${frukost.visual.icon}`)
} catch (error) {
  console.log(`❌ Fel: ${error.message}`)
}

console.log("\n")

// Test 2: Testa överlappning
console.log("Test 2: Överlappning")
try {
  const aktivitet1 = new Activity("Frukost", "08:00", "08:30")
  const aktivitet2 = new Activity("Dusch", "08:15", "08:45")
  
  console.log(`Överlappar: ${aktivitet1.overlapsWith(aktivitet2)}`)
} catch (error) {
  console.log(`❌ Fel: ${error.message}`)
}

console.log("\n")

// Test 3: Felhantering
console.log("Test 3: Felhantering")
try {
  const felTid = new Activity("Test", "25:00", "26:00")
} catch (error) {
  console.log(`✅ Fångade fel: ${error.message}`)
}