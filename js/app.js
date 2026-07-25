/* app.js — navigation, state, and progress orchestration */
(() => {
  let lang = localStorage.getItem('et-lang') || 'es';
  let currentView = 'levels';
  let state = { level: null, skill: null, queue: [], index: 0, correctCount: 0, mistakes: [], isReview: false, streak: 0 };

  const views = {
    levels:   document.getElementById('view-levels'),
    skills:   document.getElementById('view-skills'),
    session:  document.getElementById('view-session'),
    result:   document.getElementById('view-result'),
    insights: document.getElementById('view-insights'),
  };

  function showView(name) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    views[name].classList.remove('hidden');
    currentView = name;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function applyLangToStaticEls() {
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      el.textContent = el.dataset[lang];
    });
    document.title = lang === 'es'
      ? 'English Trainer A1–C2 · Entrenador de Inglés'
      : 'English Trainer A1–C2';
  }

  // ---------- Level view ----------
  async function renderLevels() {
    const grid = document.getElementById('level-grid');
    grid.innerHTML = '';
    for (const lv of LEVELS_META) {
      const skills = CURRICULUM[lv.code].skills;
      const card = document.createElement('button');
      card.className = 'level-card';
      const hasContent = skills.length > 0;

      let doneCount = 0;
      if (hasContent) {
        for (const s of skills) {
          const p = await TrainerDB.getProgress(lv.code, s.id);
          if (p && p.completed) doneCount++;
        }
      }
      const pct = hasContent ? Math.round((doneCount / skills.length) * 100) : 0;

      card.innerHTML = `
        <span class="lv-code">${lv.code}</span>
        <span class="lv-name">${lang === 'es' ? lv.name_es : lv.name_en}</span>
        <div class="lv-bar"><div class="lv-bar-fill" style="width:${pct}%"></div></div>
      `;
      if (!hasContent) {
        card.classList.add('locked');
        card.title = lang === 'es' ? 'Contenido en construcción' : 'Content coming soon';
      } else {
        card.addEventListener('click', () => openLevel(lv.code));
      }
      grid.appendChild(card);
    }
  }

  // ---------- Skills view ----------
  async function openLevel(levelCode) {
    state.level = levelCode;
    const lv = LEVELS_META.find(l => l.code === levelCode);
    document.getElementById('skills-title').textContent =
      `${levelCode} — ${lang === 'es' ? lv.name_es : lv.name_en}`;

    const grid = document.getElementById('skill-grid');
    grid.innerHTML = '';
    for (const skill of CURRICULUM[levelCode].skills) {
      const p = await TrainerDB.getProgress(levelCode, skill.id);
      const card = document.createElement('button');
      card.className = 'skill-card';
      card.innerHTML = `
        <h3>${lang === 'es' ? skill.title_es : skill.title_en}</h3>
        <p>${lang === 'es' ? skill.desc_es : skill.desc_en}</p>
        <span class="skill-tag">${p && p.completed
          ? (lang === 'es' ? '✓ Completado' : '✓ Completed')
          : (lang === 'es' ? `${skill.exercises.length} ejercicios` : `${skill.exercises.length} exercises`)}</span>
      `;
      card.addEventListener('click', () => startSession(levelCode, skill));
      grid.appendChild(card);
    }
    showView('skills');
  }

  // ---------- Session ----------
  function startSession(levelCode, skill) {
    state.level = levelCode;
    state.skill = skill;
    // Clone + shuffle so each attempt feels fresh, without mutating shared curriculum data
    state.queue = shuffle(skill.exercises).map(ex => {
      const clone = { ...ex };
      if (clone.type === 'mcq') clone.options = shuffle(clone.options);
      return clone;
    });
    state.index = 0;
    state.correctCount = 0;
    state.mistakes = [];
    state.isReview = false;
    state.streak = 0;
    document.getElementById('streak-badge').classList.add('hidden');
    showView('session');
    renderCurrentExercise();
  }

  function startMistakeReview() {
    if (!state.mistakes.length) return;
    state.queue = shuffle(state.mistakes.map(m => m.exercise));
    state.index = 0;
    state.correctCount = 0;
    state.mistakes = [];
    state.isReview = true;
    state.streak = 0;
    document.getElementById('streak-badge').classList.add('hidden');
    showView('session');
    renderCurrentExercise();
  }

  function renderCurrentExercise() {
    const total = state.queue.length;
    document.getElementById('session-counter').textContent = `${state.index + 1} / ${total}`;
    document.getElementById('progress-fill').style.width = `${(state.index / total) * 100}%`;

    const card = document.getElementById('exercise-card');
    const exercise = state.queue[state.index];
    const exerciseKey = `${exercise.type}:${exercise.prompt_en}`;
    const exerciseLabel = exercise.prompt_en;
    Exercises.render(card, exercise, lang, (isCorrect) => {
      TrainerDB.recordAttempt(state.level, state.skill.id, exerciseKey, exerciseLabel, isCorrect);
      const streakBadge = document.getElementById('streak-badge');
      const streakCount = document.getElementById('streak-count');
      if (isCorrect) {
        state.correctCount++;
        state.streak++;
        if (state.streak >= 2) {
          streakCount.textContent = state.streak;
          streakBadge.classList.remove('hidden');
        }
      } else {
        state.streak = 0;
        streakBadge.classList.add('hidden');
        state.mistakes.push({
          prompt: lang === 'es' ? exercise.prompt_es : exercise.prompt_en,
          answer: exercise.answer,
          exercise,
        });
      }
      const actions = document.createElement('div');
      actions.className = 'exercise-actions';
      const nextBtn = document.createElement('button');
      nextBtn.className = 'primary-btn';
      const isLast = state.index === total - 1;
      nextBtn.textContent = isLast
        ? (lang === 'es' ? 'Ver resultado' : 'See result')
        : (lang === 'es' ? 'Siguiente' : 'Next');
      nextBtn.addEventListener('click', () => {
        if (isLast) finishSession(); else { state.index++; renderCurrentExercise(); }
      });
      actions.appendChild(nextBtn);
      card.appendChild(actions);
    });
  }

  async function finishSession() {
    const total = state.queue.length;
    const pct = Math.round((state.correctCount / total) * 100);
    const passed = pct >= 70;

    if (!state.isReview) {
      const existing = await TrainerDB.getProgress(state.level, state.skill.id);
      const bestScore = Math.max(existing?.lastScore || 0, pct);
      const everCompleted = passed || !!existing?.completed;

      await TrainerDB.saveProgress(state.level, state.skill.id, {
        completed: everCompleted,
        lastScore: bestScore,
        updatedAt: Date.now(),
      });
    }

    document.getElementById('progress-fill').style.width = '100%';
    const resultCard = document.querySelector('.result-card');
    resultCard.classList.remove('celebrate');
    document.getElementById('result-title').textContent = pct === 100
      ? (lang === 'es' ? '¡Perfecto! 🎉' : 'Perfect! 🎉')
      : passed
        ? (lang === 'es' ? '¡Muy bien!' : 'Well done!')
        : (lang === 'es' ? 'Sigue practicando' : 'Keep practicing');
    if (pct === 100) {
      void resultCard.offsetWidth;
      resultCard.classList.add('celebrate');
    }

    const detail = document.getElementById('result-detail');
    detail.innerHTML = `${state.correctCount} / ${total} (${pct}%)`;

    const reviewBtn = document.getElementById('review-mistakes-btn');
    if (state.mistakes.length > 0) {
      reviewBtn.classList.remove('hidden');
      const list = document.createElement('ul');
      list.className = 'mistake-list';
      state.mistakes.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="mistake-q">${m.prompt}</span> → <span class="mistake-a">${m.answer}</span>`;
        list.appendChild(li);
      });
      detail.appendChild(list);
    } else {
      reviewBtn.classList.add('hidden');
    }
    showView('result');
  }

  // ---------- Insights / feedback ----------
  async function renderInsights() {
    const analytics = await TrainerDB.getAllAnalytics();
    const list = document.getElementById('insights-list');
    const empty = document.getElementById('insights-empty');
    list.innerHTML = '';

    if (!analytics.length) {
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');

    const bySkill = {};
    analytics.forEach(a => {
      const key = `${a.level}:${a.skillId}`;
      if (!bySkill[key]) bySkill[key] = { level: a.level, skillId: a.skillId, items: [] };
      bySkill[key].items.push(a);
    });

    const groups = Object.values(bySkill).map(g => {
      const totalAttempts = g.items.reduce((s, i) => s + i.attempts, 0);
      const totalErrors = g.items.reduce((s, i) => s + i.errors, 0);
      const skillMeta = (CURRICULUM[g.level]?.skills || []).find(s => s.id === g.skillId);
      return { ...g, totalAttempts, totalErrors, rate: totalErrors / totalAttempts, skillMeta };
    }).filter(g => g.totalAttempts > 0)
      .sort((a, b) => b.rate - a.rate);

    groups.forEach(g => {
      const pct = Math.round(g.rate * 100);
      const title = g.skillMeta ? (lang === 'es' ? g.skillMeta.title_es : g.skillMeta.title_en) : g.skillId;
      const worst = g.items.slice()
        .sort((a, b) => (b.errors / b.attempts) - (a.errors / a.attempts))
        .slice(0, 3);

      const card = document.createElement('div');
      card.className = 'insight-card';
      const header = document.createElement('div');
      header.className = 'insight-header';
      header.innerHTML = `
        <span class="insight-level">${g.level}</span>
        <span class="insight-title">${title}</span>
        <span class="insight-rate">${pct}% ${lang === 'es' ? 'de error' : 'error rate'}</span>
      `;
      card.appendChild(header);

      const ul = document.createElement('ul');
      ul.className = 'insight-detail';
      worst.forEach(w => {
        const li = document.createElement('li');
        li.textContent = `${w.exerciseLabel} — ${w.errors}/${w.attempts} ${lang === 'es' ? 'fallos' : 'wrong'}`;
        ul.appendChild(li);
      });
      card.appendChild(ul);
      list.appendChild(card);
    });
  }

  document.getElementById('insights-btn').addEventListener('click', () => {
    showView('insights');
    renderInsights();
  });

  document.getElementById('save-feedback-btn').addEventListener('click', async () => {
    const textarea = document.getElementById('feedback-text');
    const text = textarea.value.trim();
    if (!text) return;
    await TrainerDB.saveFeedbackNote(text);
    textarea.value = '';
    const msg = document.getElementById('feedback-saved-msg');
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2500);
  });

  document.getElementById('export-btn').addEventListener('click', async () => {
    const [analytics, feedback, progress] = await Promise.all([
      TrainerDB.getAllAnalytics(),
      TrainerDB.getAllFeedbackNotes(),
      TrainerDB.getAllProgress(),
    ]);
    const summary = {
      exportedAt: new Date().toISOString(),
      progress,
      analytics: analytics
        .map(a => ({ ...a, errorRate: a.attempts ? Math.round((a.errors / a.attempts) * 100) : 0 }))
        .sort((a, b) => b.errorRate - a.errorRate),
      feedbackNotes: feedback.map(f => ({ text: f.text, date: new Date(f.createdAt).toISOString() })),
    };
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english-trainer-feedback-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // ---------- Wiring ----------
  document.getElementById('lang-toggle').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('et-lang', lang);
    applyLangToStaticEls();
    if (currentView === 'skills' && state.level) {
      openLevel(state.level);
    } else if (currentView === 'session' && state.queue.length) {
      renderCurrentExercise();
    } else {
      renderLevels();
    }
  });

  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.back;
      if (target === 'levels') { renderLevels(); showView('levels'); }
      if (target === 'skills') { openLevel(state.level); }
    });
  });

  document.getElementById('retry-btn').addEventListener('click', () => {
    startSession(state.level, state.skill);
  });
  document.getElementById('review-mistakes-btn').addEventListener('click', () => {
    startMistakeReview();
  });
  document.getElementById('continue-btn').addEventListener('click', () => {
    openLevel(state.level);
  });

  // ---------- Init ----------
  applyLangToStaticEls();
  renderLevels();
  showView('levels');
})();
