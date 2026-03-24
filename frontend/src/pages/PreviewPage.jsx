function PreviewPage({ preview }) {
  return (
    <section className="card">
      <h2>3) Preview</h2>
      {!preview ? (
        <p>Preview not created yet.</p>
      ) : (
        <div>
          <p>Quality: {preview.quality}</p>
          <p>Total Duration: {preview.totalDuration}s</p>
          <p>Scene Count: {preview.sceneCount}</p>
          <video controls width="480" src={preview.previewUrl} />
          <p>
            Placeholder preview URL: <code>{preview.previewUrl}</code>
          </p>
        </div>
      )}
    </section>
  );
}

export default PreviewPage;
