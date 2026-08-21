const responseLabels = ['ST', 'TS', 'N', 'S', 'SS']

export default function Questionnaire({ question, questionNumber, totalQuestions, pageIndex, answers, answeredCount, onAnswer, onPrevious }) {
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  return (
    <form className="talent-questionnaire" onSubmit={(event) => event.preventDefault()}>
      <div className="talent-questionnaire-meta">
        <span>Pertanyaan {questionNumber} dari {totalQuestions}</span>
        <span>Terjawab: {answeredCount}/{totalQuestions}</span>
      </div>

      <article className="talent-question-card">
        <div className="talent-question-content">
          <h2>{question.text}</h2>
          <p>Pilih angka 1 (Sangat Tidak Setuju) sampai 5 (Sangat Setuju).</p>
          <div className="talent-response-options" role="radiogroup" aria-label={`Jawaban pertanyaan ${questionNumber}`}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="talent-response-option">
                <input type="radio" name={`question-${question.id}`} value={value} checked={answers[question.id] === value} onChange={() => onAnswer(question.id, value)} />
                <span className="talent-response-number">{value}</span>
                <small>{responseLabels[value - 1]}</small>
              </label>
            ))}
          </div>
        </div>

        <aside className="talent-progress" aria-label={`${progress}% selesai`}>
          <span>Progress</span>
          <div className="talent-progress-track"><div style={{ width: `${progress}%` }} /></div>
          <strong>{answeredCount}/{totalQuestions}</strong>
        </aside>
      </article>

      {pageIndex > 0 && <button type="button" className="secondary-button" onClick={onPrevious}>Sebelumnya</button>}
    </form>
  )
}
