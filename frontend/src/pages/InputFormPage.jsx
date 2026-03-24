import { useState } from 'react';

const defaultForm = {
  topic: 'The biggest unsolved mystery',
  niche: 'crime',
  duration: 45,
  language: 'English',
  voice: 'deep'
};

function InputFormPage({ onGenerate, loading }) {
  const [form, setForm] = useState(defaultForm);

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    onGenerate(form);
  };

  return (
    <section className="card">
      <h2>1) Video Input</h2>
      <form className="form-grid" onSubmit={submit}>
        <label>
          Topic
          <input value={form.topic} onChange={(e) => updateField('topic', e.target.value)} required />
        </label>

        <label>
          Niche
          <select value={form.niche} onChange={(e) => updateField('niche', e.target.value)}>
            <option value="crime">crime</option>
            <option value="horror">horror</option>
            <option value="general">general</option>
          </select>
        </label>

        <label>
          Duration (seconds)
          <input
            type="number"
            min="10"
            max="180"
            value={form.duration}
            onChange={(e) => updateField('duration', Number(e.target.value))}
          />
        </label>

        <label>
          Language
          <input value={form.language} onChange={(e) => updateField('language', e.target.value)} />
        </label>

        <label>
          Voice
          <select value={form.voice} onChange={(e) => updateField('voice', e.target.value)}>
            <option value="neutral">neutral</option>
            <option value="deep">deep</option>
            <option value="female-soft">female-soft</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Video Plan'}
        </button>
      </form>
    </section>
  );
}

export default InputFormPage;
