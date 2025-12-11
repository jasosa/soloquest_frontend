type QuestIntroProps = {
  title: string;
  intro: string;
  imageUrl?: string;
  onBack: () => void;
  onStart: () => void;
};

export function QuestIntro({ title, intro, imageUrl, onBack, onStart }: QuestIntroProps) {
  return (
    <div className="quest-intro">
      <div className="quest-intro__card">
        <h2>{title}</h2>
        <p className="quest-intro__body">{intro}</p>
        {imageUrl && (
          <div className="quest-intro__image">
            <h3>Ubicación inicial de los héroes</h3>
            <img src={imageUrl} alt="Ubicación inicial de los héroes" />
          </div>
        )}
        <div className="quest-intro__actions">
          <button onClick={onBack}>Back</button>
          <button className="primary" onClick={onStart}>Start Quest</button>
        </div>
      </div>
    </div>
  );
}
