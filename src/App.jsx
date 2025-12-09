
import React, { useState } from 'react';
import { useGame, GAME_STATES } from './hooks/useGame';
import { UNITS, CATEGORIES } from './logic/UnitConversion';
import './App.css';
import { Play, BookOpen, HelpCircle, CheckCircle, XCircle, Trophy, Zap, RefreshCw, ChevronRight } from 'lucide-react';

function App() {
  const game = useGame();

  return (
    <div className="app-container">
      {game.gameState === GAME_STATES.MENU && <MainMenu game={game} />}
      {game.gameState === GAME_STATES.PLAYING && <GameScreen game={game} />}
      {game.gameState === GAME_STATES.REFERENCE && <ReferenceScreen game={game} />}
    </div>
  );
}

function MainMenu({ game }) {
  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ background: '#EEF2FF', padding: 20, borderRadius: '50%', display: 'inline-flex', marginBottom: 20 }}>
          <Zap size={48} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>Physics Units</h1>
        <p style={{ color: 'var(--text-light)' }}>Master the art of SI conversions</p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button className="btn btn-primary" onClick={game.startGame}>
          <Play size={20} /> Start Practice
        </button>
        <button className="btn btn-outline" onClick={game.showReference}>
          <BookOpen size={20} /> Reference Guide
        </button>
      </div>
    </div>
  );
}

function GameScreen({ game }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() === '') return;
    game.checkAnswer(input);
  };

  const handleNext = () => {
    setInput('');
    game.nextQuestion();
  };

  const handleOptionSelect = (val) => {
    game.checkAnswer(val);
  }

  const { currentQuestion } = game;

  if (!currentQuestion) return null;

  return (
    <>
      <div className="header">
        <div className="stat-badge"><Trophy size={14} /> {game.score}</div>
        <div className="stat-badge" style={{ background: '#FCE7F3', color: '#BE185D' }}>Level {game.level}</div>
      </div>

      <div className="screen">
        {/* Progress Bar placeholder */}
        <div style={{ height: 4, background: '#E5E7EB', borderRadius: 2, marginBottom: 20 }}>
          <div style={{ height: '100%', width: `${(game.streak % 3) * 33.3}%`, background: 'var(--secondary)', borderRadius: 2, transition: 'width 0.3s' }}></div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: 1 }}>Convert</span>
          <div className="question-display">
            {currentQuestion.value} <span className="unit-tag">{currentQuestion.from.symbol}</span>
          </div>
          <div style={{ color: 'var(--text-light)', marginBottom: 10 }}>into</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>
            {currentQuestion.to.name}s ({currentQuestion.to.symbol})
          </div>
        </div>

        {!game.feedback ? (
          <div style={{ marginTop: 'auto' }}>
            {game.isMultipleChoice ? (
               <div className="options-grid">
                 {game.distractors.map((val, idx) => (
                   <button key={idx} className="btn btn-outline" style={{ justifyContent: 'center' }} onClick={() => handleOptionSelect(val)}>
                     {val.toPrecision(4)}
                   </button>
                 ))}
               </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Enter value..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>
                  Check Answer
                </button>
              </form>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button 
                className="btn btn-ghost" 
                style={{ flex: 1, fontSize: '0.9rem' }} 
                onClick={game.requestMultipleChoice}
                disabled={game.isMultipleChoice}
              >
                <RefreshCw size={16} /> Multiple Choice
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ flex: 1, fontSize: '0.9rem' }} 
                onClick={game.requestHint}
                disabled={game.hintShown}
              >
                <HelpCircle size={16} /> Hint
              </button>
            </div>
            
            {game.hintShown && (
               <div style={{ marginTop: 10, padding: 10, background: '#FEF3C7', color: '#92400E', borderRadius: 8, fontSize: '0.9rem', textAlign: 'center' }}>
                 <strong>Hint:</strong> 1 {currentQuestion.from.symbol} = { (currentQuestion.from.factor / currentQuestion.to.factor).toExponential(2) } {currentQuestion.to.symbol}
                 {currentQuestion.from.offset && <div>(Don't forget the offset!)</div>}
               </div>
            )}
          </div>
        ) : (
          <div className="feedback-overlay">
             {game.feedback.type === 'correct' ? (
               <CheckCircle size={64} color="var(--secondary)" />
             ) : (
               <XCircle size={64} color="var(--danger)" />
             )}
             <h2 style={{ margin: '20px 0 10px 0' }}>{game.feedback.type === 'correct' ? 'Excellent!' : 'Oops!'}</h2>
             <p style={{ textAlign: 'center', maxWidth: 300, color: 'var(--text-light)' }}>{game.feedback.message}</p>
             <button className="btn btn-primary" style={{ marginTop: 30, minWidth: 200 }} onClick={handleNext}>
               Next Question <ChevronRight size={20} />
             </button>
          </div>
        )}
      </div>
    </>
  );
}

function ReferenceScreen({ game }) {
  const [category, setCategory] = useState(CATEGORIES.LENGTH);

  return (
    <div className="screen">
      <div className="header">
        <button className="btn btn-ghost" onClick={game.returnToMenu} style={{ padding: 0 }}>
           ← Back
        </button>
        <div style={{ fontWeight: 800 }}>Reference</div>
        <div style={{ width: 24 }}></div>
      </div>

      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '10px 0' }}>
         {Object.values(CATEGORIES).map(c => (
           <button 
             key={c} 
             className={`btn ${category === c ? 'btn-primary' : 'btn-ghost'}`}
             onClick={() => setCategory(c)}
             style={{ padding: '6px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
           >
             {c}
           </button>
         ))}
      </div>

      <div className="card">
        <h3>{category} Units</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #F3F4F6' }}>
              <th style={{ padding: 8 }}>Unit</th>
              <th style={{ padding: 8 }}>Symbol</th>
              <th style={{ padding: 8 }}>Factor (Base)</th>
            </tr>
          </thead>
          <tbody>
            {UNITS.filter(u => u.category === category).map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: 8 }}>{u.name}</td>
                <td style={{ padding: 8, fontWeight: 600, color: 'var(--primary)' }}>{u.symbol}</td>
                <td style={{ padding: 8, fontFamily: 'monospace' }}>
                   {u.factor.toExponential(1)}
                   {u.offset ? ` (+${u.offset})` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
