import { useState } from 'react'
import ParticipantForm from './talentMapping/ParticipantForm'
import { trackFormSubmit } from '../../utils/analytics'
import Questionnaire from './talentMapping/Questionnaire'
import Results, { CompletionMessage } from './talentMapping/Results'
import TalentMappingHero from './talentMapping/TalentMappingHero'
import { calculateAnalysis, createEmptyAnswers, questions } from './talentMapping/data'

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
const INITIAL_PARTICIPANT = { name: '', age: '', institution: '' }

export default function TalentMappingPage() {
  const [answers, setAnswers] = useState(createEmptyAnswers)
  const [participant, setParticipant] = useState(INITIAL_PARTICIPANT)
  const [isParticipantSaved, setIsParticipantSaved] = useState(false)
  const [isSavingParticipant, setIsSavingParticipant] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)

  const answeredCount = Object.values(answers).filter((answer) => answer !== null).length
  const currentQuestion = questions[questionIndex]

  const saveParticipant = async (event) => {
    event.preventDefault()
    setIsSavingParticipant(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/talent-mapping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: participant.name.trim(),
          age: participant.age ? Number(participant.age) : null,
          institution: participant.institution.trim(),
        }),
      })

      if (!response.ok) throw new Error('Gagal menyimpan data peserta.')
      setIsParticipantSaved(true)
      trackFormSubmit('Talent Mapping', 'Mulai Kuesioner ST30')
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan data peserta. Coba lagi.')
    } finally {
      setIsSavingParticipant(false)
    }
  }

  const handleAnswer = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value }
    setAnswers(nextAnswers)

    if (questionIndex < questions.length - 1) {
      window.setTimeout(() => setQuestionIndex((index) => index + 1), 120)
      return
    }

    setAnalysis(calculateAnalysis(nextAnswers))
    setIsComplete(true)
    trackFormSubmit('Talent Mapping Selesai', 'Hasil Asesmen ST30 Berhasil')
  }

  const resetAssessment = () => {
    setAnswers(createEmptyAnswers())
    setIsComplete(false)
    setShowAnalysis(false)
    setAnalysis(null)
    setQuestionIndex(0)
  }

  return (
    <section className="page-content-shell talent-mapping-page">
      <style>{`
/* Talent Mapping Stylesheet */

.talent-participant-section,
.talent-questionnaire,
.talent-completion-message,
.talent-results {
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(92, 56, 16, 0.08);
  border-radius: 28px;
  box-shadow: 0 20px 40px rgba(92, 56, 16, 0.05);
}

.tm-intro {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.tm-invite {
  font-size: 15px;
  color: var(--color-brand-muted, #6e645e);
  line-height: 1.6;
  margin-bottom: 32px;
}

.tm-form-single {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tm-form-single label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tm-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-brand-dark, #231b18);
}

.tm-input {
  width: 100%;
  min-height: 56px;
  border: 1px solid rgba(92, 56, 16, 0.15);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  color: var(--color-brand-dark, #231b18);
  padding: 16px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.tm-input:focus {
  outline: none;
  border-color: var(--color-brand-brown, #5c3810);
  box-shadow: 0 0 0 4px rgba(92, 56, 16, 0.08);
  background: #ffffff;
}

.tm-form-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

.tm-submit {
  background-color: var(--color-brand-brown, #5c3810);
  color: #ffffff;
  border: none;
  border-radius: 99px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 12px rgba(92, 56, 16, 0.15);
}

.tm-submit:hover {
  background-color: var(--color-brand-yellow, #dca11d);
  color: var(--color-brand-dark, #231b18);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(220, 161, 29, 0.2);
}

.tm-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.tm-secondary {
  background: transparent;
  color: var(--color-brand-muted, #6e645e);
  border: 1px solid rgba(92, 56, 16, 0.2);
  border-radius: 99px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tm-secondary:hover {
  background-color: rgba(92, 56, 16, 0.05);
  color: var(--color-brand-brown, #5c3810);
  border-color: var(--color-brand-brown, #5c3810);
}

/* Questionnaire styles */
.talent-questionnaire {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.talent-questionnaire-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-brand-muted, #6e645e);
  border-bottom: 1px solid rgba(92, 56, 16, 0.08);
  padding-bottom: 12px;
}

.talent-question-card {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 32px;
  align-items: center;
}

@media (max-width: 768px) {
  .talent-question-card {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.talent-question-content h2 {
  font-size: 22px;
  line-height: 1.35;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 12px;
}

.talent-question-content p {
  font-size: 14px;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 24px;
}

.talent-response-options {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: rgba(92, 56, 16, 0.03);
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(92, 56, 16, 0.05);
}

.talent-response-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;
}

.talent-response-option input {
  display: none; /* Hide default radio check */
}

.talent-response-number {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(92, 56, 16, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-brand-muted, #6e645e);
  transition: all 0.2s ease;
  background: #ffffff;
}

.talent-response-option:hover .talent-response-number {
  border-color: var(--color-brand-brown, #5c3810);
  color: var(--color-brand-brown, #5c3810);
  transform: scale(1.05);
}

.talent-response-option input:checked + .talent-response-number {
  background-color: var(--color-brand-brown, #5c3810);
  border-color: var(--color-brand-brown, #5c3810);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(92, 56, 16, 0.2);
}

.talent-response-option small {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-brand-muted, #6e645e);
  text-transform: uppercase;
}

.talent-response-option input:checked ~ small {
  color: var(--color-brand-brown, #5c3810);
}

.talent-progress {
  background: rgba(92, 56, 16, 0.03);
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(92, 56, 16, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.talent-progress span {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--color-brand-muted, #6e645e);
}

.talent-progress-track {
  width: 100%;
  height: 8px;
  background: rgba(92, 56, 16, 0.1);
  border-radius: 99px;
  overflow: hidden;
}

.talent-progress-track div {
  height: 100%;
  background-color: var(--color-brand-green, #738a43);
  border-radius: 99px;
  transition: width 0.4s ease;
}

.talent-progress strong {
  font-size: 16px;
  color: var(--color-brand-brown, #5c3810);
}

.secondary-button {
  width: fit-content;
  align-self: flex-start;
  background: transparent;
  color: var(--color-brand-brown, #5c3810);
  border: 1px solid rgba(92, 56, 16, 0.3);
  border-radius: 99px;
  padding: 10px 22px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: rgba(92, 56, 16, 0.05);
  border-color: var(--color-brand-brown, #5c3810);
}

/* Completion Message */
.talent-completion-message {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.talent-completion-message h2 {
  font-size: 24px;
  color: var(--color-brand-brown, #5c3810);
  font-weight: 800;
}

.talent-completion-message p {
  font-size: 15px;
  color: var(--color-brand-muted, #6e645e);
  max-width: 520px;
  line-height: 1.6;
}

.talent-completion-message div {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.primary-button {
  background-color: var(--color-brand-brown, #5c3810);
  color: #ffffff;
  border: none;
  border-radius: 99px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(92, 56, 16, 0.15);
}

.primary-button:hover {
  background-color: var(--color-brand-yellow, #dca11d);
  color: var(--color-brand-dark, #231b18);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(220, 161, 29, 0.2);
}

/* Results styles */
.talent-results {
  max-width: 1000px !important;
}

.talent-results-overview {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  margin-top: 32px;
}

@media (max-width: 900px) {
  .talent-results-overview {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.talent-chart-card {
  background: rgba(92, 56, 16, 0.02);
  border: 1px solid rgba(92, 56, 16, 0.06);
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.talent-chart-card h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: var(--color-brand-brown, #5c3810);
  align-self: flex-start;
}

.talent-result-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.talent-result-list article {
  display: flex;
  gap: 16px;
  background: #ffffff;
  border: 1px solid rgba(92, 56, 16, 0.08);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

.talent-result-list article:hover {
  transform: translateY(-2px);
  border-color: var(--color-brand-yellow, #dca11d);
  box-shadow: 0 8px 20px rgba(92, 56, 16, 0.04);
}

.talent-result-list article i {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}

.talent-result-list article h3 {
  font-size: 16px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 4px;
}

.talent-result-list article p {
  font-size: 13px;
  color: var(--color-brand-muted, #6e645e);
  line-height: 1.5;
  margin-bottom: 8px;
}

.talent-result-list article strong {
  font-size: 12px;
  color: var(--color-brand-green, #738a43);
}

.talent-result-notes {
  margin-top: 40px;
  background: var(--color-brand-soft-yellow, #fdf6e2);
  border: 1px solid rgba(220, 161, 29, 0.18);
  border-radius: 20px;
  padding: 24px;
}

.talent-result-notes p {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 12px;
}

.talent-result-notes ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.talent-result-notes li {
  font-size: 14px;
  color: var(--color-brand-muted, #6e645e);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .talent-participant-section,
  .talent-questionnaire,
  .talent-completion-message,
  .talent-results {
    margin: 20px 12px;
    padding: 24px 16px;
    border-radius: 20px;
  }
  .talent-response-options {
    padding: 12px 8px;
    gap: 6px;
  }
  .talent-response-number {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  .tm-form-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .tm-submit, .tm-secondary {
    width: 100%;
  }
}
      `}</style>
      <TalentMappingHero />

      {!isParticipantSaved && (
        <ParticipantForm
          participant={participant}
          isSaving={isSavingParticipant}
          onChange={(field, value) => setParticipant((current) => ({ ...current, [field]: value }))}
          onClear={() => setParticipant(INITIAL_PARTICIPANT)}
          onSubmit={saveParticipant}
        />
      )}

      {isParticipantSaved && !isComplete && (
        <Questionnaire
          question={currentQuestion}
          questionNumber={questionIndex + 1}
          totalQuestions={questions.length}
          pageIndex={questionIndex}
          answers={answers}
          answeredCount={answeredCount}
          onAnswer={handleAnswer}
          onPrevious={() => setQuestionIndex((index) => Math.max(0, index - 1))}
        />
      )}

      {isComplete && !showAnalysis && <CompletionMessage onShowAnalysis={() => setShowAnalysis(true)} onReset={resetAssessment} />}
      {isComplete && showAnalysis && analysis && <Results analysis={analysis} />}
    </section>
  )
}
