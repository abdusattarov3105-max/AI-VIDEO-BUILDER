function SceneEditorPage({ scenes, onSceneChange }) {
  return (
    <section className="card">
      <h2>2) Scene Editor</h2>
      {scenes.length === 0 ? (
        <p>No scenes yet. Generate from the form above.</p>
      ) : (
        <div className="scene-list">
          {scenes.map((scene, index) => (
            <article key={scene.id} className="scene-item">
              <h3>Scene {index + 1}</h3>
              <label>
                Text
                <textarea
                  value={scene.text}
                  onChange={(event) => onSceneChange(scene.id, 'text', event.target.value)}
                  rows={3}
                />
              </label>
              <label>
                Duration
                <input
                  type="number"
                  min="5"
                  max="10"
                  value={scene.duration}
                  onChange={(event) => onSceneChange(scene.id, 'duration', Number(event.target.value))}
                />
              </label>
              <p>Media Source: {scene.media.source}</p>
              <p>Media URL: {scene.media.url || '-'}</p>
              <p>Audio URL: {scene.audio.url || '-'}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default SceneEditorPage;
