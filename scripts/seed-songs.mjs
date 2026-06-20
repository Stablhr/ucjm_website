import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import songsData from '../src/features/songs/songsData.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const envPath = resolve(__dirname, '../.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const envVars = Object.fromEntries(
  envContent
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => {
      const [key, ...rest] = line.split('=')
      return [key.trim(), rest.join('=').trim()]
    })
)

const supabaseUrl = envVars.VITE_SUPABASE_URL
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log(`Seeding ${songsData.length} songs into Supabase...\n`)

  let success = 0
  let failed = 0

  for (const song of songsData) {
    const { error } = await supabase.from('songs').insert({
      title: song.title,
      artist: song.artist,
      key: song.key,
      category: song.category,
      language: song.language,
      lyrics_with_chords: song.lyrics_with_chords,
    })

    if (error) {
      console.error(`  FAILED "${song.title}": ${error.message}`)
      failed++
    } else {
      console.log(`  OK "${song.title}"`)
      success++
    }
  }

  console.log(`\nDone. ${success} inserted, ${failed} failed.`)
}

seed().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
