export const questions = [
  { id: 1, text: 'Saya suka meneliti dan membandingkan informasi sebelum mengambil keputusan.', group: 'Analytical' },
  { id: 2, text: 'Saya senang mencari tahu alasan di balik suatu peristiwa atau masalah.', group: 'Analytical' },
  { id: 3, text: 'Saya lebih suka berpikir mendalam daripada langsung bertindak tanpa perencanaan.', group: 'Analytical' },
  { id: 4, text: 'Saya mudah memahami konsep atau ide yang rumit ketika dijelaskan secara logis.', group: 'Analytical' },
  { id: 5, text: 'Saya mudah menjelaskan ide saya agar dimengerti orang lain.', group: 'Communication' },
  { id: 6, text: 'Saya senang mendengarkan cerita orang lain dan merespons dengan antusias.', group: 'Social' },
  { id: 7, text: 'Saya sering membantu teman memahami hal-hal yang sulit bagi mereka.', group: 'Social' },
  { id: 8, text: 'Saya merasa percaya diri saat harus menyampaikan pendapat dalam diskusi kelompok.', group: 'Communication' },
  { id: 9, text: 'Saya lebih suka segera memulai pekerjaan daripada terlalu lama merencanakan.', group: 'Execution' },
  { id: 10, text: 'Saya senang jika bisa melihat hasil nyata dari usaha saya.', group: 'Execution' },
  { id: 11, text: 'Saya bisa tetap fokus meski pekerjaan terasa berat atau membosankan.', group: 'Execution' },
  { id: 12, text: 'Saya terbiasa menyelesaikan tanggung jawab yang sudah saya mulai.', group: 'Execution' },
  { id: 13, text: 'Saya suka bekerja dengan target dan tenggat waktu yang jelas.', group: 'Execution' },
  { id: 14, text: 'Saya mudah memahami suasana hati orang lain dari ekspresi atau nada bicaranya.', group: 'Social' },
  { id: 15, text: 'Saya cenderung menenangkan atau membantu orang yang sedang kesulitan.', group: 'Social' },
  { id: 16, text: 'Saya lebih mengutamakan perasaan orang lain daripada kepentingan pribadi.', group: 'Social' },
  { id: 17, text: 'Saya merasa tidak nyaman jika melihat seseorang diperlakukan tidak adil.', group: 'Social' },
  { id: 18, text: 'Saya mudah menjalin hubungan yang hangat dengan orang baru.', group: 'Communication' },
  { id: 19, text: 'Saya sering muncul dengan ide atau cara baru untuk melakukan sesuatu.', group: 'Creative' },
  { id: 20, text: 'Saya menikmati kegiatan yang memungkinkan saya bereksperimen atau berimajinasi.', group: 'Creative' },
  { id: 21, text: 'Saya sering menemukan solusi unik untuk masalah sehari-hari.', group: 'Creative' },
  { id: 22, text: 'Saya suka mengubah hal sederhana menjadi sesuatu yang menarik atau berbeda.', group: 'Creative' },
  { id: 23, text: 'Saya cepat bosan dengan rutinitas dan lebih suka hal-hal yang menantang kreativitas.', group: 'Creative' },
  { id: 24, text: 'Saya sering menjadi orang yang memulai ide atau kegiatan di kelompok saya.', group: 'Leadership' },
  { id: 25, text: 'Saya merasa nyaman mengambil keputusan ketika orang lain ragu.', group: 'Leadership' },
  { id: 26, text: 'Saya senang mengatur pekerjaan tim agar lebih terarah.', group: 'Leadership' },
  { id: 27, text: 'Saya terbiasa menjadi penanggung jawab dalam suatu kegiatan.', group: 'Leadership' },
  { id: 28, text: 'Saya bisa menjaga semangat orang lain agar tetap berfokus pada tujuan bersama.', group: 'Leadership' },
]

export const groupDescriptions = {
  Analytical: 'Anda cenderung analitis: menyukai data, penalaran, dan pemecahan masalah secara logis.',
  Communication: 'Anda kuat di komunikasi: mampu menyampaikan gagasan dan berinteraksi dengan baik.',
  Social: 'Anda empatik dan peduli: mahir membangun hubungan dan merawat orang lain.',
  Execution: 'Anda praktis dan dapat diandalkan: fokus menyelesaikan tugas dan mencapai hasil.',
  Creative: 'Anda kreatif dan inovatif: suka bereksperimen dan menemukan solusi baru.',
  Leadership: 'Anda memimpin dan mengorganisir: nyaman mengambil inisiatif dan memotivasi tim.',
}

export const groupColors = {
  Analytical: '#ffd400',
  Communication: '#7fc97f',
  Social: '#ff6b6b',
  Execution: '#fdae61',
  Creative: '#a6cee3',
  Leadership: '#b2df8a',
}

export const createEmptyAnswers = () => Object.fromEntries(questions.map(({ id }) => [id, null]))

export function calculateAnalysis(answers) {
  const totals = {}
  const counts = {}

  questions.forEach(({ id, group }) => {
    totals[group] = (totals[group] || 0) + answers[id]
    counts[group] = (counts[group] || 0) + 1
  })

  const averages = Object.fromEntries(
    Object.entries(totals).map(([group, total]) => [group, total / counts[group]]),
  )

  return { averages, ranked: Object.entries(averages).sort(([, a], [, b]) => b - a) }
}
