import { useState } from 'react';
import InputFormPage from './pages/InputFormPage.jsx';
import SceneEditorPage from './pages/SceneEditorPage.jsx';
import PreviewPage from './pages/PreviewPage.jsx';
import { attachMedia, attachTts, createPreview, createScenes, createScript } from './api/client.js';

function App() {
  const [scenes, setScenes] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePipeline = async (form) => {
    setLoading(true);
    setError('');
    setPreview(null);

    try {
      const { script } = await createScript(form);
      const { scenes: rawScenes } = await createScenes({ script, niche: form.niche });
      const { scenes: mediaScenes } = await attachMedia({ scenes: rawScenes, niche: form.niche });
      const { scenes: voicedScenes } = await attachTts({ scenes: mediaScenes, voice: form.voice });
      const previewResult = await createPreview({ scenes: voicedScenes });

      setScenes(voicedScenes);
      setPreview(previewResult);
    } catch (pipelineError) {
      setError(pipelineError.message);
    } finally {
      setLoading(false);
    }
  };

  const onSceneChange = (sceneId, field, value) => {
    setScenes((previous) =>
      previous.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              [field]: value
            }
          : scene
      )
    );
  };

  return (
    <main className="app-shell">
      <header>
        <h1>AI Video Builder</h1>
        <p>Create short automated videos from topic inputs.</p>
      </header>

      {error && <p className="error-banner">{error}</p>}

      <InputFormPage onGenerate={generatePipeline} loading={loading} />
      <SceneEditorPage scenes={scenes} onSceneChange={onSceneChange} />
      <PreviewPage preview={preview} />
    </main>
  );
}

export default App;
