export default function ParticipantForm({ participant, isSaving, onChange, onClear, onSubmit }) {
  return (
    <section className="talent-participant-section">
      <div className="tm-intro">Siap memulai asesmen ST30?</div>
      <p className="tm-invite">Isi nama, usia, dan lembaga Anda untuk memulai asesmen singkat. Hasilnya membantu mengenali kecenderungan potensi Anda.</p>
      <form onSubmit={onSubmit} className="tm-form-single">
        <label>
          <span className="tm-label">Nama lengkap*</span>
          <input className="tm-input" value={participant.name} onChange={(event) => onChange('name', event.target.value)} placeholder="Nama lengkap" required />
        </label>
        <label>
          <span className="tm-label">Usia</span>
          <input className="tm-input" value={participant.age} onChange={(event) => onChange('age', event.target.value)} placeholder="Usia (angka)" type="number" min="1" />
        </label>
        <label>
          <span className="tm-label">Lembaga (opsional)</span>
          <input className="tm-input" value={participant.institution} onChange={(event) => onChange('institution', event.target.value)} placeholder="Nama lembaga" />
        </label>
        <div className="tm-form-actions">
          <button className="tm-submit" type="submit" disabled={isSaving}>{isSaving ? 'MENYIMPAN...' : 'MULAI ASESMEN'}</button>
          <button type="button" className="tm-secondary" onClick={onClear} disabled={isSaving}>BERSIHKAN</button>
        </div>
      </form>
    </section>
  )
}
